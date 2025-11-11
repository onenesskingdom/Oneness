
import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {children}
    </svg>
);

export const MicOnIcon = () => (
    <IconWrapper>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </IconWrapper>
);

export const MicOffIcon = () => (
    <IconWrapper>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.586 15.586a7 7 0 01-8.172 0l-5.414 5.414A1 1 0 01.172 19.586l19.228-19.228a1 1 0 011.414 1.414l-5.414 5.414zM9 9a3 3 0 015.121-2.121" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9v4m0 0H8m1 0h2m-2-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-.879 2.121M12 18.571V21m-4-1h8" />
    </IconWrapper>
);
