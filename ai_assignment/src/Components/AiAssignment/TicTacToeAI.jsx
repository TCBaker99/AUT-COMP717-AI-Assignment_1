import React, { useState, useEffect, useRef } from 'react';

function checkWinner(board, size) {
  const target = size === 3 ? 3 : 4;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - target; c++) {
      const seq = board[r].slice(c, c + target);
      if (seq[0] && seq.every(cell => cell === seq[0])) return seq[0];
    }
  }
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - target; r++) {
      const seq = Array.from({ length: target }, (_, i) => board[r + i][c]);
      if (seq[0] && seq.every(cell => cell === seq[0])) return seq[0];
    }
  }
  for (let r = 0; r <= size - target; r++) {
    for (let c = 0; c <= size - target; c++) {
      const seq = Array.from({ length: target }, (_, i) => board[r + i][c + i]);
      if (seq[0] && seq.every(cell => cell === seq[0])) return seq[0];
    }
  }
  for (let r = 0; r <= size - target; r++) {
    for (let c = target - 1; c < size; c++) {
      const seq = Array.from({ length: target }, (_, i) => board[r + i][c - i]);
      if (seq[0] && seq.every(cell => cell === seq[0])) return seq[0];
    }
  }
  return null;
}

function isFull(board) {
  return board.every(row => row.every(cell => cell));
}

function evaluate(board, size, aiPlayer) {
  const winner = checkWinner(board, size);
  if (winner === aiPlayer) return 10;
  if (winner && winner !== aiPlayer) return -10;
  if (isFull(board)) return 0;
  return null;
}

function minimax(board, depth, isMax, size, ai) {
  const score = evaluate(board, size, ai);
  if (score !== null || depth === 0) return score || 0;
  const current = isMax ? ai : ai === 'X' ? 'O' : 'X';
  let best = isMax ? -Infinity : Infinity;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!board[r][c]) {
        board[r][c] = current;
        const val = minimax(board, depth - 1, !isMax, size, ai);
        board[r][c] = '';
        best = isMax ? Math.max(best, val) : Math.min(best, val);
      }
    }
  }
  return best;
}

export function getMinimaxMove(board, depth, size, ai) {
  let bestVal = -Infinity;
  let move = [0, 0];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!board[r][c]) {
        board[r][c] = ai;
        const val = minimax(board, depth - 1, false, size, ai);
        board[r][c] = '';
        if (val > bestVal) {
          bestVal = val;
          move = [r, c];
        }
      }
    }
  }
  return { row: move[0], col: move[1] };
}

function alphabeta(board, depth, alpha, beta, isMax, size, ai) {
  const score = evaluate(board, size, ai);
  if (score !== null || depth === 0) return score || 0;
  const current = isMax ? ai : ai === 'X' ? 'O' : 'X';
  if (isMax) {
    let value = -Infinity;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!board[r][c]) {
          board[r][c] = current;
          value = Math.max(value, alphabeta(board, depth - 1, alpha, beta, false, size, ai));
          board[r][c] = '';
          alpha = Math.max(alpha, value);
          if (alpha >= beta) break;
        }
      }
    }
    return value;
  } else {
    let value = Infinity;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!board[r][c]) {
          board[r][c] = current;
          value = Math.min(value, alphabeta(board, depth - 1, alpha, beta, true, size, ai));
          board[r][c] = '';
          beta = Math.min(beta, value);
          if (alpha >= beta) break;
        }
      }
    }
    return value;
  }
}

export function getAlphaBetaMove(board, depth, size, ai) {
  let best = -Infinity;
  let move = [0, 0];
  let alpha = -Infinity;
  let beta = Infinity;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!board[r][c]) {
        board[r][c] = ai;
        const val = alphabeta(board, depth - 1, alpha, beta, false, size, ai);
        board[r][c] = '';
        if (val > best) {
          best = val;
          move = [r, c];
        }
        alpha = Math.max(alpha, best);
      }
    }
  }
  return { row: move[0], col: move[1] };
}

export default function TicTacToeGame({
  size = 3,
  depth = 3,
  aiPlayer = 'X',
  algorithm = 'minimax',
  mode = 'hvh',
  depthMinimax = 3,
  depthAlphaBeta = 3,
  onBackToMenu
}) {
  const emptyRow = Array(size).fill('');
  const [board, setBoard] = useState(Array.from({ length: size }, () => [...emptyRow]));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const initialMoveMade = useRef(false);

  function handleMove(r, c) {
    if (board[r][c] || winner) return;
    const next = turn;
    setBoard(prev => {
      const copy = prev.map(row => [...row]);
      copy[r][c] = next;
      return copy;
    });
    setTurn(t => (t === 'X' ? 'O' : 'X'));
    initialMoveMade.current = false;
  }

  useEffect(() => {
    const result = checkWinner(board, size);
    if (result || isFull(board)) {
      setWinner(result || 'Draw');
      return;
    }

    if (mode === 'hva' && turn === aiPlayer && !initialMoveMade.current) {
      initialMoveMade.current = true;
      const move =
        algorithm === 'alphabeta'
          ? getAlphaBetaMove(board.map(r => [...r]), depth, size, aiPlayer)
          : getMinimaxMove(board.map(r => [...r]), depth, size, aiPlayer);
      setTimeout(() => handleMove(move.row, move.col), 300);
    }

    if (mode === 'ava') {
      const currentAlgorithm = turn === 'X' ? 'minimax' : 'alphabeta';
      const currentDepth = turn === 'X' ? depthMinimax : depthAlphaBeta;
      const move =
        currentAlgorithm === 'alphabeta'
          ? getAlphaBetaMove(board.map(r => [...r]), currentDepth, size, turn)
          : getMinimaxMove(board.map(r => [...r]), currentDepth, size, turn);
      setTimeout(() => handleMove(move.row, move.col), 300);
    }
  }, [board, turn]);

  return (
    <div>
      <button onClick={onBackToMenu} className="back">Back to Menu</button>
      <h3>Turn: {turn}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gap: '4px',
          maxWidth: '400px',
          margin: 'auto',
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => mode === 'hvh' || (mode === 'hva' && turn !== aiPlayer) ? handleMove(r, c) : null}
              style={{ height: '40px', fontSize: '1.2rem' }}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
}
