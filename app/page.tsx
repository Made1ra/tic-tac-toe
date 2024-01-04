'use client';

import { useState } from 'react';
import Board from '@/app/ui/board';

export default function Home() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), index: -1 }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(i: number, nextSquares: Array<'X' | 'O' | null>) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1), {
        squares: nextSquares,
        index: i
      }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function sortMoves() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((moveInfo, move) => {
    let description;
    let moveDetails = '';
    if (move > 0) {
      const row = Math.floor(moveInfo.index / 3);
      const col = moveInfo.index % 3;
      moveDetails = `(${row}, ${col})`;
      description = `Go to move #${move} (${row}, ${col})`;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <p>You are at move #{move} {moveDetails}</p>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
        <br />
        <button onClick={() => sortMoves()}>Toggle the sort order</button>
      </div>
      <div className="game-info">
        <ol>{isAscending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}
