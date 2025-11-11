
import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {children}
    </svg>
);

export const SpeakerOnIcon = () => (
    <IconWrapper>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </IconWrapper>
);

export const SpeakerOffIcon = () => (
    <IconWrapper>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5.586l-4.707-4.707C3.663.253 3 1.109 3 2v13.586l9-9zM15 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l9.707-9.707a1 1 0 011.414 0l-12 12a1 1 0 01-1.414 0L1 1m22 22L1 1" />
    </IconWrapper>
);
