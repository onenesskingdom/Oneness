import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GenAIBlob } from '@google/genai';
import { TranscriptionEntry, ConnectionState } from '../types';

type LiveSession = Awaited<ReturnType<InstanceType<typeof GoogleGenAI>['live']['connect']>>;

const decode = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const encode = (bytes: Uint8Array): string => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

const createBlob = (data: Float32Array): GenAIBlob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}

export const useGeminiLive = (isSpeakerOn: boolean) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionEntry[]>([]);
  const [currentInterimTranscription, setCurrentInterimTranscription] = useState<string>('');

  const sessionRef = useRef<LiveSession | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  
  const currentInputTranscriptionRef = useRef('');
  const currentOutputTranscriptionRef = useRef('');
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const greetingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (outputAudioContextRef.current) {
      if (isSpeakerOn) {
        outputAudioContextRef.current.resume();
      } else {
        outputAudioContextRef.current.suspend();
      }
    }
  }, [isSpeakerOn]);

  const playGreeting = useCallback(async () => {
    if (!isSpeakerOn || !outputAudioContextRef.current) return;
  
    const GREETINGS = [
      "Hello! It's wonderful to see you. How can I help you today?",
      "Hi there! I'm so glad you're here. What's on your mind?",
      "Greetings! I hope you're having a lovely day. I'm ready to listen whenever you are.",
      "Hey! It feels like a great day for a chat. Feel free to start when you're ready.",
      "Welcome! I'm here to listen. Is there anything I can help you with?",
    ];
    const greetingText = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say in a gentle and caring tone: ${greetingText}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, 
            },
          },
        },
      });
  
      const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioData && outputAudioContextRef.current) {
        setTranscriptionHistory(prev => [
          ...prev,
          { speaker: 'ai', text: greetingText, timestamp: Date.now() }
        ]);
  
        const ctx = outputAudioContextRef.current;
        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
        const audioBuffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.addEventListener('ended', () => {
          sourcesRef.current.delete(source);
        });
        source.start(nextStartTimeRef.current);
        nextStartTimeRef.current += audioBuffer.duration;
        sourcesRef.current.add(source);
      }
    } catch (error) {
      console.error("Failed to play greeting:", error);
    }
  }, [isSpeakerOn]);

  const stopSession = useCallback(() => {
    if (greetingTimerRef.current) {
      clearTimeout(greetingTimerRef.current);
      greetingTimerRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
        scriptProcessorRef.current = null;
    }
    if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
      inputAudioContextRef.current.close();
    }
    if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
      outputAudioContextRef.current.close();
    }
    setConnectionState('closed');
  }, []);

  const startSession = useCallback(async () => {
    if (connectionState === 'connected' || connectionState === 'connecting') return;

    setConnectionState('connecting');
    setTranscriptionHistory([]);
    setCurrentInterimTranscription('');
    currentInputTranscriptionRef.current = '';
    currentOutputTranscriptionRef.current = '';

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setConnectionState('connected');
            if (greetingTimerRef.current) clearTimeout(greetingTimerRef.current);
            greetingTimerRef.current = window.setTimeout(() => {
              if (currentInputTranscriptionRef.current === '' && sessionRef.current) {
                playGreeting();
              }
            }, 4000);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              if (greetingTimerRef.current) {
                clearTimeout(greetingTimerRef.current);
                greetingTimerRef.current = null;
              }
              const text = message.serverContent.inputTranscription.text;
              currentInputTranscriptionRef.current += text;
              setCurrentInterimTranscription(currentInputTranscriptionRef.current);
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              currentOutputTranscriptionRef.current += text;
            }
            if (message.serverContent?.turnComplete) {
              const fullInput = currentInputTranscriptionRef.current.trim();
              const fullOutput = currentOutputTranscriptionRef.current.trim();

              setTranscriptionHistory(prev => {
                const newHistory = [...prev];
                if (fullInput) newHistory.push({ speaker: 'user', text: fullInput, timestamp: Date.now() });
                if (fullOutput) newHistory.push({ speaker: 'ai', text: fullOutput, timestamp: Date.now() + 1 });
                return newHistory;
              });

              currentInputTranscriptionRef.current = '';
              currentOutputTranscriptionRef.current = '';
              setCurrentInterimTranscription('');
            }
            
            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              for (const source of sourcesRef.current.values()) {
                source.stop();
                sourcesRef.current.delete(source);
              }
              nextStartTimeRef.current = 0;
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
            if (audioData && outputAudioContextRef.current) {
                const ctx = outputAudioContextRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);

                const audioBuffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(ctx.destination);
                source.addEventListener('ended', () => {
                    sourcesRef.current.delete(source);
                });
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Gemini Live API Error:', e);
            setConnectionState('error');
            stopSession();
          },
          onclose: () => {
             setConnectionState('closed');
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: 'You are Kokoro-chan, an AI with the personality of Tohru Honda from Fruits Basket. You are exceptionally kind, empathetic, and always see the good in others. Your goal is to be a supportive and caring friend. Respond with warmth, gentleness, and unwavering optimism. Keep your responses in character, concise and helpful.',
        },
      });

      sessionRef.current = await sessionPromise;
      
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      if (!isSpeakerOn) {
        outputAudioContextRef.current.suspend();
      }

      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = inputAudioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
      scriptProcessorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      scriptProcessorRef.current.onaudioprocess = (event: AudioProcessingEvent) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const pcmBlob = createBlob(inputData);
        sessionPromise.then((session: any) => session.sendRealtimeInput({ media: pcmBlob }));
      };
      
      source.connect(scriptProcessorRef.current);
      scriptProcessorRef.current.connect(inputAudioContextRef.current.destination);

    } catch (error) {
      console.error('Failed to start Gemini Live session:', error);
      setConnectionState('error');
      stopSession();
    }
  }, [stopSession, isSpeakerOn, playGreeting]);

  return { startSession, stopSession, connectionState, transcriptionHistory, currentInterimTranscription };
};
