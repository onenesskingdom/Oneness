
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { Avatar } from './components/Avatar';
import { Controls } from './components/Controls';
import { TranscriptionDisplay } from './components/TranscriptionDisplay';
import { ConnectionState, TranscriptionEntry } from './types';

const App: React.FC = () => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [isMicOn, setMicOn] = useState(false);
  const [isSpeakerOn, setSpeakerOn] = useState(true);
  const [isTextVisible, setTextVisible] = useState(true);

  const {
    startSession,
    stopSession,
    connectionState,
    transcriptionHistory,
    currentInterimTranscription,
  } = useGeminiLive(isSpeakerOn);

  useEffect(() => {
    if (isMicOn && connectionState !== 'connected') {
      startSession();
    } else if (!isMicOn && connectionState === 'connected') {
      stopSession();
    }
  }, [isMicOn, connectionState, startSession, stopSession]);
  
  const handleMicToggle = () => {
    setMicOn(prev => !prev);
    // Open panel automatically when mic is turned on for the first time
    if (!isPanelOpen) {
        setPanelOpen(true);
    }
  };

  const getStatusIndicator = (state: ConnectionState) => {
    switch (state) {
      case 'connecting':
        return { color: 'bg-yellow-500', text: 'Connecting...' };
      case 'connected':
        return { color: 'bg-green-500', text: 'Listening...' };
      case 'error':
        return { color: 'bg-red-500', text: 'Error' };
      case 'closed':
      case 'idle':
      default:
        return { color: 'bg-gray-500', text: 'Offline' };
    }
  };

  const status = getStatusIndicator(connectionState);

  const allTranscriptions: TranscriptionEntry[] = [
    ...transcriptionHistory,
    ...(currentInterimTranscription ? [{ speaker: 'user' as const, text: currentInterimTranscription, timestamp: Date.now() }] : [])
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none bg-transparent">
      <div className="relative flex flex-col items-center gap-4 pointer-events-auto">
        {isPanelOpen && (
          <Controls
            isMicOn={isMicOn}
            isSpeakerOn={isSpeakerOn}
            isTextVisible={isTextVisible}
            onMicToggle={handleMicToggle}
            onSpeakerToggle={() => setSpeakerOn(prev => !prev)}
            onTextToggle={() => setTextVisible(prev => !prev)}
            connectionStatus={status}
          />
        )}

        <Avatar onClick={() => setPanelOpen(prev => !prev)} isListening={connectionState === 'connected'} />
        
        {isTextVisible && <TranscriptionDisplay entries={allTranscriptions} />}
      </div>
    </div>
  );
};

export default App;
