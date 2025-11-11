
import React from 'react';
import { MicOnIcon, MicOffIcon } from './icons/MicIcons';
import { SpeakerOnIcon, SpeakerOffIcon } from './icons/SpeakerIcons';
import { TextOnIcon, TextOffIcon } from './icons/TextIcons';

interface ControlsProps {
  isMicOn: boolean;
  isSpeakerOn: boolean;
  isTextVisible: boolean;
  onMicToggle: () => void;
  onSpeakerToggle: () => void;
  onTextToggle: () => void;
  connectionStatus: { color: string; text: string };
}

interface ToggleButtonProps {
    isOn: boolean;
    onToggle: () => void;
    onIcon: React.ReactNode;
    offIcon: React.ReactNode;
    label: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOn, onToggle, onIcon, offIcon, label }) => (
    <button
        onClick={onToggle}
        className={`p-3 rounded-full transition-colors duration-200 ${
        isOn ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
        }`}
        aria-label={label}
    >
        {isOn ? onIcon : offIcon}
    </button>
);


export const Controls: React.FC<ControlsProps> = ({
  isMicOn,
  isSpeakerOn,
  isTextVisible,
  onMicToggle,
  onSpeakerToggle,
  onTextToggle,
  connectionStatus
}) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-3 shadow-lg flex items-center gap-4">
       <div className="flex items-center gap-2 text-white text-sm pr-2">
        <span className={`w-3 h-3 rounded-full ${connectionStatus.color} transition-colors`}></span>
        <span>{connectionStatus.text}</span>
      </div>
      <div className="w-px h-8 bg-gray-500/50"></div>
      <div className="flex items-center gap-3">
        <ToggleButton 
            isOn={isMicOn} 
            onToggle={onMicToggle}
            onIcon={<MicOnIcon />}
            offIcon={<MicOffIcon />}
            label={isMicOn ? 'Turn Microphone Off' : 'Turn Microphone On'}
        />
        <ToggleButton 
            isOn={isSpeakerOn} 
            onToggle={onSpeakerToggle}
            onIcon={<SpeakerOnIcon />}
            offIcon={<SpeakerOffIcon />}
            label={isSpeakerOn ? 'Mute Speaker' : 'Unmute Speaker'}
        />
        <ToggleButton 
            isOn={isTextVisible} 
            onToggle={onTextToggle}
            onIcon={<TextOnIcon />}
            offIcon={<TextOffIcon />}
            label={isTextVisible ? 'Hide Text' : 'Show Text'}
        />
      </div>
    </div>
  );
};
