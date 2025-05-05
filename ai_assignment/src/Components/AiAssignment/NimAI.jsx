import React, { useState, useEffect, useRef } from 'react';

function isGameOver(heaps) {
  return heaps.every(h => h === 0);
}

function evaluate(heaps, aiPlayer, isMax) {
  if (isGameOver(heaps)) return isMax ? -10 : 10;
  return null;
}

function generateMoves(heaps) {
  const moves = [];
  for (let i = 0; i < heaps.length; i++) {
    for (let j = 1; j <= heaps[i]; j++) {
      const newHeaps = [...heaps];
      newHeaps[i] -= j;
      moves.push(newHeaps);
    }
  }
  return moves;
}

function minimax(heaps, depth, isMax, aiPlayer) {
  const score = evaluate(heaps, aiPlayer, isMax);
  if (score !== null || depth === 0) return score || 0;
  const moves = generateMoves(heaps);
  let best = isMax ? -Infinity : Infinity;
  for (const move of moves) {
    const val = minimax(move, depth - 1, !isMax, aiPlayer);
    best = isMax ? Math.max(best, val) : Math.min(best, val);
  }
  return best;
}

function alphabeta(heaps, depth, alpha, beta, isMax, aiPlayer) {
  const score = evaluate(heaps, aiPlayer, isMax);
  if (score !== null || depth === 0) return score || 0;
  const moves = generateMoves(heaps);
  if (isMax) {
    let value = -Infinity;
    for (const move of moves) {
      value = Math.max(value, alphabeta(move, depth - 1, alpha, beta, false, aiPlayer));
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
    }
    return value;
  } else {
    let value = Infinity;
    for (const move of moves) {
      value = Math.min(value, alphabeta(move, depth - 1, alpha, beta, true, aiPlayer));
      beta = Math.min(beta, value);
      if (alpha >= beta) break;
    }
    return value;
  }
}

function getBestMove(heaps, depth, aiPlayer, useAlphaBeta) {
  const moves = generateMoves(heaps);
  let best = -Infinity;
  let bestMove = heaps;
  let alpha = -Infinity, beta = Infinity;

  for (const move of moves) {
    const val = useAlphaBeta
      ? alphabeta(move, depth - 1, alpha, beta, false, aiPlayer)
      : minimax(move, depth - 1, false, aiPlayer);
    if (val > best) {
      best = val;
      bestMove = move;
    }
    alpha = Math.max(alpha, best);
  }
  return bestMove;
}

export default function NimAI({
  heapConfig = [1, 3, 5, 7],
  depth = 3,
  aiPlayer = 'A',
  algorithm = 'minimax',
  mode = 'hvh',
  depthMinimax = 3,
  depthAlphaBeta = 3,
  onBackToMenu
}) {
  const [heaps, setHeaps] = useState(heapConfig);
  const [turn, setTurn] = useState('A');
  const [winner, setWinner] = useState(null);
  const initialMoveMade = useRef(false);

  const handleMove = (heapIndex, amount) => {
    if (heaps[heapIndex] < amount || amount <= 0 || winner) return;
    const newHeaps = [...heaps];
    newHeaps[heapIndex] -= amount;
    setHeaps(newHeaps);
    setTurn(prev => (prev === 'A' ? 'B' : 'A'));
    initialMoveMade.current = false;
  };

  useEffect(() => {
    if (isGameOver(heaps)) {
      setWinner(turn === 'A' ? 'B' : 'A');
      return;
    }

    if (mode === 'hva' && turn === aiPlayer && !initialMoveMade.current) {
      initialMoveMade.current = true;
      const move = getBestMove(heaps, depth, aiPlayer, algorithm === 'alphabeta');
      setTimeout(() => {
        setHeaps(move);
        setTurn(prev => (prev === 'A' ? 'B' : 'A'));
        initialMoveMade.current = false;
      }, 300);
    }

    if (mode === 'ava' && !winner && !initialMoveMade.current) {
      initialMoveMade.current = true;
      const currentAlgo = turn === 'A' ? 'minimax' : 'alphabeta';
      const currentDepth = turn === 'A' ? depthMinimax : depthAlphaBeta;
      const move = getBestMove(heaps, currentDepth, turn, currentAlgo === 'alphabeta');
      setTimeout(() => {
        setHeaps(move);
        setTurn(prev => (prev === 'A' ? 'B' : 'A'));
        initialMoveMade.current = false;
      }, 300);
    }
  }, [heaps, turn]);

  return (
    <div>
      <button onClick={onBackToMenu} className="back">Back to Menu</button>
      <h3>Turn: {turn}</h3>
      {heaps.map((count, i) => (
        <div key={i}>
          <span>Heap {i + 1}: {count}</span>
          {mode !== 'ava' && Array.from({ length: count }, (_, j) => {
            const isHumanTurn =
              (mode === 'hvh') ||
              (mode === 'hva' && turn !== aiPlayer);

            return (
              <button
                key={j}
                onClick={() => isHumanTurn && handleMove(i, j + 1)}
                disabled={!isHumanTurn}
              >
                Remove {j + 1}
              </button>
            );
          })}
        </div>
      ))}
      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
}
// Complete versions (no eval used explicitly here, just depth or game over)
const Minimaxcomplete = (heaps, isMax, aiPlayer) => minimax(heaps, Infinity, isMax, aiPlayer);
const ABcomplete = (heaps, isMax, aiPlayer) => alphabeta(heaps, Infinity, -Infinity, Infinity, isMax, aiPlayer);

// Depth-limited versions (depth-limited + evaluate used)
const Minimaxlimited = (heaps, depth, isMax, aiPlayer) => minimax(heaps, depth, isMax, aiPlayer);
const ABlimited = (heaps, depth, isMax, aiPlayer) => alphabeta(heaps, depth, -Infinity, Infinity, isMax, aiPlayer);
