import React from 'react';

interface TranscriptionEntry {
  speaker: 'user' | 'ai';
  text: string;
  timestamp: number;
}

interface TranscriptionDisplayProps {
  entries: TranscriptionEntry[];
}

export const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ entries }) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-2 max-h-40 overflow-y-auto">
      {entries.length === 0 ? (
        <p className="text-gray-400 text-sm">No conversation yet...</p>
      ) : (
        entries.map((entry, index) => (
          <div key={index} className="flex gap-2 text-sm">
            <span className={`font-medium ${
              entry.speaker === 'user' ? 'text-blue-400' : 'text-green-400'
            }`}>
              {entry.speaker === 'user' ? 'You:' : 'AI:'}
            </span>
            <span className="text-gray-300 flex-1">{entry.text}</span>
            <span className="text-gray-500 text-xs">{formatTime(entry.timestamp)}</span>
          </div>
        ))
      )}
    </div>
  );
};
