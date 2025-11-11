import React from 'react';

interface AvatarProps {
  onClick: () => void;
  isListening: boolean;
  size?: 'small' | 'medium' | 'large';
}

const AVATAR_IMAGE_URL = 'https://i.imgur.com/8pZ5h9M.jpeg';

export const Avatar: React.FC<AvatarProps> = ({ onClick, isListening, size = 'medium' }) => {
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
    <div
      onClick={onClick}
      className={`relative ${getSizeClasses()} cursor-pointer group transition-transform duration-300 hover:scale-110 ${
        !isListening ? 'animate-breathe' : ''
      }`}
      aria-label="AI Avatar"
    >
      {isListening && (
        <div className="absolute inset-0 rounded-full bg-pink-300 opacity-75 animate-ping"></div>
      )}
      <img
        src={AVATAR_IMAGE_URL}
        alt="AI Avatar of Kokoro-chan"
        className={`relative ${getSizeClasses()} rounded-full object-cover border-4 border-white/80 shadow-lg`}
      />
       <style>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
