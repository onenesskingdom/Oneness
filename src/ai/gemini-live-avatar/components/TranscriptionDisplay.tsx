
import React, { useEffect, useRef } from 'react';
import { TranscriptionEntry } from '../types';

interface TranscriptionDisplayProps {
  entries: TranscriptionEntry[];
}

export const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ entries }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div 
      ref={scrollRef}
      className="w-80 max-h-64 overflow-y-auto bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white space-y-3 shadow-2xl"
    >
      {entries.length === 0 && (
        <p className="text-center text-gray-400">Conversation will appear here...</p>
      )}
      {entries.map((entry) => (
        <div
          key={entry.timestamp}
          className={`flex flex-col animate-fade-in ${
            entry.speaker === 'user' ? 'items-end' : 'items-start'
          }`}
        >
          <div
            className={`max-w-[85%] px-3 py-2 rounded-xl ${
              entry.speaker === 'user'
                ? 'bg-blue-600 rounded-br-none'
                : 'bg-gray-700 rounded-bl-none'
            }`}
          >
            <p className="text-sm">{entry.text}</p>
          </div>
        </div>
      ))}
       <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
};
