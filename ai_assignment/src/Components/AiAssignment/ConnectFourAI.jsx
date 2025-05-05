
import React, { useState, useEffect, useRef } from 'react';

function checkWinner(board, rows, cols, target = 4) {
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const player = board[r][c];
      if (!player) continue;
      for (const [dr, dc] of directions) {
        let count = 1;
        for (let i = 1; i < target; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) break;
          if (board[nr][nc] !== player) break;
          count++;
        }
        if (count === target) return player;
      }
    }
  }
  return null;
}

function isFull(board) {
  return board[0].every(cell => cell);
}

function evaluate(board, rows, cols, aiPlayer) {
  const winner = checkWinner(board, rows, cols);
  if (winner === aiPlayer) return 10;
  if (winner && winner !== aiPlayer) return -10;
  if (isFull(board)) return 0;
  return null;
}

function getAvailableRow(board, col) {
  for (let r = board.length - 1; r >= 0; r--) {
    if (!board[r][col]) return r;
  }
  return null;
}

function minimax(board, depth, isMax, rows, cols, ai) {
  const score = evaluate(board, rows, cols, ai);
  if (score !== null || depth === 0) return score || 0;
  const current = isMax ? ai : (ai === 'R' ? 'B' : 'R');
  let best = isMax ? -Infinity : Infinity;
  for (let c = 0; c < cols; c++) {
    const r = getAvailableRow(board, c);
    if (r !== null) {
      board[r][c] = current;
      const val = minimax(board, depth - 1, !isMax, rows, cols, ai);
      board[r][c] = '';
      best = isMax ? Math.max(best, val) : Math.min(best, val);
    }
  }
  return best;
}

function alphabeta(board, depth, alpha, beta, isMax, rows, cols, ai) {
  const score = evaluate(board, rows, cols, ai);
  if (score !== null || depth === 0) return score || 0;
  const current = isMax ? ai : (ai === 'R' ? 'B' : 'R');

  if (isMax) {
    let value = -Infinity;
    for (let c = 0; c < cols; c++) {
      const r = getAvailableRow(board, c);
      if (r !== null) {
        board[r][c] = current;
        value = Math.max(value, alphabeta(board, depth - 1, alpha, beta, false, rows, cols, ai));
        board[r][c] = '';
        alpha = Math.max(alpha, value);
        if (alpha >= beta) break;
      }
    }
    return value;
  } else {
    let value = Infinity;
    for (let c = 0; c < cols; c++) {
      const r = getAvailableRow(board, c);
      if (r !== null) {
        board[r][c] = current;
        value = Math.min(value, alphabeta(board, depth - 1, alpha, beta, true, rows, cols, ai));
        board[r][c] = '';
        beta = Math.min(beta, value);
        if (alpha >= beta) break;
      }
    }
    return value;
  }
}

function getBestMove(board, depth, rows, cols, ai, useAlphaBeta) {
  let best = -Infinity;
  let move = 0;
  let alpha = -Infinity;
  let beta = Infinity;

  for (let c = 0; c < cols; c++) {
    const r = getAvailableRow(board, c);
    if (r !== null) {
      board[r][c] = ai;
      const val = useAlphaBeta
        ? alphabeta(board, depth - 1, alpha, beta, false, rows, cols, ai)
        : minimax(board, depth - 1, false, rows, cols, ai);
      board[r][c] = '';
      if (val > best) {
        best = val;
        move = c;
      }
      alpha = Math.max(alpha, best);
    }
  }
  const row = getAvailableRow(board, move);
  return { row, col: move };
}

export default function ConnectFourAI({
  rows = 4,
  cols = 5,
  depth = 3,
  aiPlayer = 'R',
  algorithm = 'minimax',
  mode = 'hvh',
  depthMinimax = 3,
  depthAlphaBeta = 3,
  onBackToMenu
}) {
  const [board, setBoard] = useState(Array.from({ length: rows }, () => Array(cols).fill('')));
  const [turn, setTurn] = useState('R');
  const [winner, setWinner] = useState(null);
  const initialMoveMade = useRef(false);

  function handleMove(col) {
    const row = getAvailableRow(board, col);
    if (row === null || winner) return;
    const next = turn;
    setBoard(prev => {
      const copy = prev.map(row => [...row]);
      copy[row][col] = next;
      return copy;
    });
    setTurn(t => (t === 'R' ? 'B' : 'R'));
    initialMoveMade.current = false;
  }

  useEffect(() => {
    const result = checkWinner(board, rows, cols);
    if (result || isFull(board)) {
      setWinner(result || 'Draw');
      return;
    }

    if (mode === 'hva' && turn === aiPlayer && !initialMoveMade.current) {
      initialMoveMade.current = true;
      const move = getBestMove(board.map(r => [...r]), depth, rows, cols, aiPlayer, algorithm === 'alphabeta');
      setTimeout(() => handleMove(move.col), 300);
    }

    if (mode === 'ava' && !winner && !initialMoveMade.current) {
      initialMoveMade.current = true;
      const currentAlgo = turn === 'R' ? 'minimax' : 'alphabeta';
      const currentDepth = turn === 'R' ? depthMinimax : depthAlphaBeta;
      const move = getBestMove(board.map(r => [...r]), currentDepth, rows, cols, turn, currentAlgo === 'alphabeta');
      setTimeout(() => {
        handleMove(move.col);
        initialMoveMade.current = false;
      }, 300);
    }
  }, [board, turn]);

  return (
    <div>
      <button onClick={onBackToMenu} className="back">Back to Menu</button>
      {mode === 'ava' && (
        <h4>R (Minimax) vs B (Alpha-Beta)</h4>
      )}
      <h3>Turn: {turn}</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '4px',
        maxWidth: '400px',
        margin: 'auto',
      }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => mode === 'hvh' || (mode === 'hva' && turn !== aiPlayer) ? handleMove(c) : null}
              style={{
                height: '40px',
                fontSize: '1.2rem',
                color: cell === 'R' ? 'red' : cell === 'B' ? 'blue' : 'black'
              }}
            >
              {cell ? 'O' : ''}
            </button>
          ))
        )}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
}

// Complete
const Minimaxcomplete = (board, rows, cols, ai) => minimax(board, Infinity, true, rows, cols, ai);
const ABcomplete = (board, rows, cols, ai) => alphabeta(board, Infinity, -Infinity, Infinity, true, rows, cols, ai);

// Depth-limited
const Minimaxlimited = (board, depth, rows, cols, ai) => minimax(board, depth, true, rows, cols, ai);
const ABlimited = (board, depth, rows, cols, ai) => alphabeta(board, depth, -Infinity, Infinity, true, rows, cols, ai);
