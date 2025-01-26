import GameBoard from '@/components/GameBoard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center px-4 py-8">
      <GameBoard />
    </div>
  );
}