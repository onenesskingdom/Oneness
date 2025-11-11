import React from 'react';

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

const MicOnIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
  </svg>
);

const MicOffIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 01-5.517 1.658l-1.483 1.483A5.001 5.001 0 0015 8a1 1 0 10-2 0A3 3 0 017 8V4zm3 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0 5 5 0 01-5 5 1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
    <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14z" />
  </svg>
);

const SpeakerOnIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
  </svg>
);

const SpeakerOffIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const TextOnIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const TextOffIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14z" />
  </svg>
);

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
