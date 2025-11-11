import React from 'react';

interface AvatarProps {
  onClick: () => void;
  isListening: boolean;
}

const AVATAR_IMAGE_URL = 'https://i.imgur.com/8pZ5h9M.jpeg';

export const Avatar: React.FC<AvatarProps> = ({ onClick, isListening }) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-36 h-36 cursor-pointer group transition-transform duration-300 hover:scale-110 ${
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
        className="relative w-full h-full rounded-full object-cover border-4 border-white/80 shadow-lg"
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