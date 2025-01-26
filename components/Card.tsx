"use client";
import React from 'react';

interface CardProps {
  card: string;
  isFlipped: boolean;
  onClick: () => void;
}

export default function Card({ card, isFlipped, onClick }: CardProps) {
  return (
    <div
      className={`w-24 h-32 flex items-center justify-center border-2 rounded-lg cursor-pointer shadow-lg transition-transform transform ${
        isFlipped ? 'bg-primary text-white' : 'bg-secondary text-black'
      }`}
      onClick={onClick}
    >
      {isFlipped && <span className="text-2xl font-bold">{card}</span>}
    </div>
  );
}
