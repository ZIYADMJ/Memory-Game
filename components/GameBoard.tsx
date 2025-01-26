"use client";
import React, { useState, useEffect } from 'react';
import Card from './Card';

const initialCards: string[] = ['🐶', '🐱', '🐭', '🐹', '🐶', '🐱', '🐭', '🐹'];

export default function GameBoard() {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [message, setMessage] = useState<string>('Click Start to Begin');

  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameStatus('lost');
            setMessage('Time\'s Up! Game Over');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (matchedCards.length === cards.length && gameStatus === 'playing') {
      setGameStatus('won');
      setMessage('Congratulations! You Won!');
    }
  }, [matchedCards, cards.length, gameStatus]);

  const shuffleArray = (array: string[]): string[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    setCards(shuffleArray(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setTimeLeft(60);
    setAttempts(0);
    setGameStatus('playing');
    setMessage('Game is On!');
  };

  const handleFlip = (index: number) => {
    if (gameStatus !== 'playing') return;

    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards((prev) => [...prev, index]);
      setAttempts((prev) => prev + 1);

      if (flippedCards.length === 1) {
        const firstIndex = flippedCards[0];
        if (cards[firstIndex] === cards[index]) {
          setMatchedCards((prev) => [...prev, firstIndex, index]);
          setMessage('Great! Cards Matched');
        } else {
          setMessage('Oops! Cards Don\'t Match');
        }

        setTimeout(() => {
          setFlippedCards([]);
          setMessage('Keep Playing!');
        }, 1000);
      }
    }
  };

  // Determine timer color based on remaining time
  const getTimerColor = () => {
    if (timeLeft > 30) return 'text-green-600';
    if (timeLeft > 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Determine message color based on game status
  const getMessageColor = () => {
    switch (gameStatus) {
      case 'won': return 'text-green-700';
      case 'lost': return 'text-red-700';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Memory Game</h1>
        
        <div className="flex justify-between mb-4">
          <div className={`text-xl font-semibold ${getTimerColor()}`}>
            Time Left: {timeLeft}s
          </div>
          <div className="text-xl font-semibold text-purple-700">
            Attempts: {attempts}
          </div>
        </div>
        
        <div className={`text-xl font-bold text-center mb-4 ${getMessageColor()}`}>
          {message}
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              isFlipped={
                gameStatus === 'ready' || 
                flippedCards.includes(index) || 
                matchedCards.includes(index)
              }
              onClick={() => handleFlip(index)}
            />
          ))}
        </div>
        
        {(gameStatus === 'ready' || gameStatus === 'won' || gameStatus === 'lost') && (
          <div className="text-center">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md 
                         hover:bg-purple-700 transition duration-300 ease-in-out 
                         transform hover:-translate-y-1 hover:scale-110"
            >
              {gameStatus === 'ready' ? 'Start Game' : 'Play Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}