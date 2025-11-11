
export interface TranscriptionEntry {
  speaker: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export type ConnectionState = 'idle' | 'connecting' | 'connected' | 'error' | 'closed';
