'use client';

import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { Avatar } from './Avatar';
import { Controls } from './Controls';
import { TranscriptionDisplay } from './TranscriptionDisplay';
import { ConnectionState } from './types';

interface FloatingAvatarProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
}

export const FloatingAvatar: React.FC<FloatingAvatarProps> = ({ 
  position = 'bottom-right',
  size = 'medium'
}) => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [isMicOn, setMicOn] = useState(false);
  const [isSpeakerOn, setSpeakerOn] = useState(true);
  const [isTextVisible, setTextVisible] = useState(false);

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

  const allTranscriptions = [
    ...transcriptionHistory,
    ...(currentInterimTranscription ? [{ speaker: 'user' as const, text: currentInterimTranscription, timestamp: Date.now() }] : [])
  ];

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-8 right-8';
      case 'bottom-left':
        return 'bottom-8 left-8';
      case 'top-right':
        return 'top-8 right-8';
      case 'top-left':
        return 'top-8 left-8';
      default:
        return 'bottom-8 right-8';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-16';
      case 'medium':
        return 'w-24 h-24';
      case 'large':
        return 'w-32 h-32';
      default:
        return 'w-24 h-24';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 flex flex-col items-end gap-4`}>
      {isPanelOpen && (
        <div className="flex flex-col items-end gap-2 mb-4">
          {isTextVisible && (
            <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-3 shadow-lg max-w-sm max-h-48 overflow-y-auto">
              <TranscriptionDisplay entries={allTranscriptions} />
            </div>
          )}
          <Controls
            isMicOn={isMicOn}
            isSpeakerOn={isSpeakerOn}
            isTextVisible={isTextVisible}
            onMicToggle={handleMicToggle}
            onSpeakerToggle={() => setSpeakerOn(prev => !prev)}
            onTextToggle={() => setTextVisible(prev => !prev)}
            connectionStatus={status}
          />
        </div>
      )}

      <Avatar 
        onClick={() => setPanelOpen(prev => !prev)} 
        isListening={connectionState === 'connected'}
        size={size}
      />
    </div>
  );
};
