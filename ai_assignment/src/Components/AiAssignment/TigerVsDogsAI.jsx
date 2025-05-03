
import React, { useState, useEffect, useRef } from 'react';

const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
  [-1, -1], [-1, 1], [1, -1], [1, 1]
];

function getInitialBoard() {
  const board = Array.from({ length: 5 }, () => Array(5).fill(null));
  board[2][2] = 'T';
  for (let i = 0; i < 5; i++) {
    if (i !== 2) {
      board[0][i] = 'D';
      board[4][i] = 'D';
      board[i][0] = 'D';
      board[i][4] = 'D';
    }
  }
  return board;
}

function isInsideBoard(r, c) {
  return r >= 0 && r < 5 && c >= 0 && c < 5;
}

function getTigerPosition(board) {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (board[r][c] === 'T') return [r, c];
    }
  }
  return null;
}

function getValidMoves(board, r, c) {
  const moves = [];
  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (isInsideBoard(nr, nc) && board[nr][nc] === null) {
      moves.push([nr, nc]);
    }
  }
  return moves;
}

function getAllDogPositions(board) {
  const dogs = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (board[r][c] === 'D') dogs.push([r, c]);
    }
  }
  return dogs;
}

function evaluate(board, killed, turn, aiPlayer) {
  if (killed >= 6) return aiPlayer === 'T' ? 10 : -10;
  const tigerPos = getTigerPosition(board);
  if (!tigerPos) return aiPlayer === 'T' ? -10 : 10;
  const [r, c] = tigerPos;
  if (getValidMoves(board, r, c).length === 0) return aiPlayer === 'T' ? -10 : 10;
  return 0;
}

function cloneBoard(board) {
  return board.map(row => [...row]);
}

function minimax(board, killed, depth, isMax, aiPlayer) {
  const score = evaluate(board, killed, isMax ? aiPlayer : (aiPlayer === 'T' ? 'D' : 'T'), aiPlayer);
  if (depth === 0 || Math.abs(score) === 10) return score;

  let best = isMax ? -Infinity : Infinity;
  if (isMax && aiPlayer === 'T') {
    const [r, c] = getTigerPosition(board);
    for (const [nr, nc] of getValidMoves(board, r, c)) {
      const newBoard = cloneBoard(board);
      newBoard[r][c] = null;
      newBoard[nr][nc] = 'T';
      best = Math.max(best, minimax(newBoard, killed, depth - 1, false, aiPlayer));
    }
  } else {
    const dogs = getAllDogPositions(board);
    for (const [dr, dc] of dogs) {
      for (const [nr, nc] of getValidMoves(board, dr, dc)) {
        const newBoard = cloneBoard(board);
        newBoard[dr][dc] = null;
        newBoard[nr][nc] = 'D';
        best = isMax
          ? Math.max(best, minimax(newBoard, killed, depth - 1, false, aiPlayer))
          : Math.min(best, minimax(newBoard, killed, depth - 1, true, aiPlayer));
      }
    }
  }
  return best;
}

function getBestMove(board, killed, depth, aiPlayer) {
  let best = -Infinity;
  let bestMove = null;
  if (aiPlayer === 'T') {
    const [r, c] = getTigerPosition(board);
    for (const [nr, nc] of getValidMoves(board, r, c)) {
      const newBoard = cloneBoard(board);
      newBoard[r][c] = null;
      newBoard[nr][nc] = 'T';
      const val = minimax(newBoard, killed, depth - 1, false, aiPlayer);
      if (val > best) {
        best = val;
        bestMove = { from: [r, c], to: [nr, nc] };
      }
    }
  }
  return bestMove;
}

export default function TigerVsDogsAI({ depth = 3, aiPlayer = 'T', mode = 'hvh', onBackToMenu }) {
  const [board, setBoard] = useState(getInitialBoard());
  const [turn, setTurn] = useState('T');
  const [winner, setWinner] = useState(null);
  const [killed, setKilled] = useState(0);
  const initialMoveMade = useRef(false);

  const handleMove = (from, to) => {
    const newBoard = cloneBoard(board);
    const [fr, fc] = from;
    const [tr, tc] = to;
    newBoard[fr][fc] = null;
    newBoard[tr][tc] = turn;
    setBoard(newBoard);
    setTurn(prev => (prev === 'T' ? 'D' : 'T'));
    initialMoveMade.current = false;
  };

  useEffect(() => {
    const tigerPos = getTigerPosition(board);
    if (killed >= 6) setWinner('Tiger');
    else if (tigerPos && getValidMoves(board, ...tigerPos).length === 0) setWinner('Dogs');

    if (mode === 'hva' && turn === aiPlayer && !initialMoveMade.current) {
      initialMoveMade.current = true;
      const move = getBestMove(board, killed, depth, aiPlayer);
      if (move) setTimeout(() => handleMove(move.from, move.to), 300);
    }
  }, [board, turn]);

  return (
    <div>
      <button onClick={onBackToMenu} className="back">Back to Menu</button>
      <h3>Turn: {turn}</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 60px)',
        gap: '5px',
        margin: '20px auto',
        width: 'max-content'
      }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div key={`${r}-${c}`} style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#eee',
              border: '1px solid #333',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              {cell}
            </div>
          ))
        )}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
}
