import React, { FC } from 'react';

interface Props {
  size: number;
}

export const NotFoundIcon: FC<Props> = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={`${size}px`} height={`${size}px`}>
    <g data-name="Iconos">
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M24 79.87c8.74 0 9.81-11.26 0-28C14.15 68.63 15.25 79.88 24 79.87zM23.4 40.42c5.55-.25 9.5-1.87 12.93-5.78" />
      <ellipse cx="39.34" cy="53.82" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" rx="3.97" ry="5" />
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M76.6,40.42c-5.55-.25-9.5-1.87-12.93-5.78" />
      <ellipse cx="60.66" cy="53.82" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" rx="3.97" ry="5" />
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M41.62 74.4q8.39-7.35 16.76 0M17.35 68.13a37.34 37.34 0 1 1 9.56 11.22" />
    </g>
  </svg>
);
