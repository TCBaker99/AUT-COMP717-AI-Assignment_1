
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

function isInside(r, c) {
  return r >= 0 && r < 5 && c >= 0 && c < 5;
}

function cloneBoard(board) {
  return board.map(row => [...row]);
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
  for (let [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (isInside(nr, nc) && board[nr][nc] === null) {
      moves.push({ from: [r, c], to: [nr, nc], captures: [] });
    }
  }
  return moves;
}

function checkCaptures(board, r, c, player) {
  if (player !== 'T') return [];
  const captures = [];
  for (let [dr, dc] of directions) {
    const r1 = r + dr, c1 = c + dc;
    const r2 = r + 2 * dr, c2 = c + 2 * dc;
    if (!isInside(r2, c2)) continue;
    if (board[r1][c1] === 'D' && board[r2][c2] === 'D') {
      const r3 = r + 3 * dr, c3 = c + 3 * dc;
      if (!isInside(r3, c3) || board[r3][c3] !== 'D') {
        captures.push([r1, c1], [r2, c2]);
      }
    }
  }
  return captures;
}

function evaluate(board, killed, turn, aiPlayer) {
  if (killed >= 6) return aiPlayer === 'T' ? 100 : -100;
  const tigerPos = getTigerPosition(board);
  if (!tigerPos) return aiPlayer === 'T' ? -100 : 100;

  const [r, c] = tigerPos;
  const tigerMoves = getValidMoves(board, r, c).length;
  const dogMobility = board.flat().filter(cell => cell === 'D').length;
  return aiPlayer === 'T' ? (tigerMoves * 5 - killed * 10) : (dogMobility * 2 + killed * 5);
}

function alphabeta(board, killed, depth, alpha, beta, isMax, aiPlayer, useAlphaBeta = true) {
  const score = evaluate(board, killed, isMax ? aiPlayer : (aiPlayer === 'T' ? 'D' : 'T'), aiPlayer);
  if (depth === 0 || Math.abs(score) === 100) return score;

  if ((isMax && aiPlayer === 'T') || (!isMax && aiPlayer === 'D')) {
    let value = -Infinity;
    const [r, c] = getTigerPosition(board);
    for (let { to: [nr, nc] } of getValidMoves(board, r, c)) {
      const newBoard = cloneBoard(board);
      newBoard[r][c] = null;
      newBoard[nr][nc] = 'T';
      let newKilled = killed;
      for (let [cr, cc] of checkCaptures(newBoard, nr, nc, 'T')) {
        newBoard[cr][cc] = null;
        newKilled++;
      }
      const val = alphabeta(newBoard, newKilled, depth - 1, alpha, beta, !isMax, aiPlayer, useAlphaBeta);
      value = Math.max(value, val);
      if (useAlphaBeta) {
        alpha = Math.max(alpha, value);
        if (alpha >= beta) break;
      }
    }
    return value;
  } else {
    let value = Infinity;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c] === 'D') {
          for (let { to: [nr, nc] } of getValidMoves(board, r, c)) {
            const newBoard = cloneBoard(board);
            newBoard[r][c] = null;
            newBoard[nr][nc] = 'D';
            const val = alphabeta(newBoard, killed, depth - 1, alpha, beta, !isMax, aiPlayer, useAlphaBeta);
            value = Math.min(value, val);
            if (useAlphaBeta) {
              beta = Math.min(beta, value);
              if (beta <= alpha) break;
            }
          }
        }
      }
    }
    return value;
  }
}

function getBestMove(board, killed, depth, player, useAlphaBeta = true) {
  let best = player === 'T' ? -Infinity : Infinity;
  let bestMove = null;

  if (player === 'T') {
    const [r, c] = getTigerPosition(board);
    for (let { to: [nr, nc] } of getValidMoves(board, r, c)) {
      const newBoard = cloneBoard(board);
      newBoard[r][c] = null;
      newBoard[nr][nc] = 'T';
      let newKilled = killed;
      for (let [cr, cc] of checkCaptures(newBoard, nr, nc, 'T')) {
        newBoard[cr][cc] = null;
        newKilled++;
      }
      const val = alphabeta(newBoard, newKilled, depth - 1, -Infinity, Infinity, false, player, useAlphaBeta);
      if (val > best) {
        best = val;
        bestMove = { from: [r, c], to: [nr, nc] };
      }
    }
  } else {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c] === 'D') {
          for (let { to: [nr, nc] } of getValidMoves(board, r, c)) {
            const newBoard = cloneBoard(board);
            newBoard[r][c] = null;
            newBoard[nr][nc] = 'D';
            const val = alphabeta(newBoard, killed, depth - 1, -Infinity, Infinity, false, player, useAlphaBeta);
            if (val < best) {
              best = val;
              bestMove = { from: [r, c], to: [nr, nc] };
            }
          }
        }
      }
    }
  }

  return bestMove;
}

export default function TigerVsDogsAI({
  mode = 'hvh',
  aiPlayer = 'T',
  depthTiger = 3,
  depthDogs = 3,
  aiTypeTiger = 'alphabeta',
  aiTypeDogs = 'minimax',
  onBackToMenu
}) {
  const [board, setBoard] = useState(getInitialBoard());
  const [turn, setTurn] = useState('T');
  const [killed, setKilled] = useState(0);
  const [winner, setWinner] = useState(null);
  const [selected, setSelected] = useState(null);
  const [validSquares, setValidSquares] = useState([]);
  const movePending = useRef(false);

  const handleClick = (r, c) => {
    if (winner || (mode !== 'hvh' && turn === aiPlayer)) return;
    if (selected) {
      const [sr, sc] = selected;
      const moves = getValidMoves(board, sr, sc);
      for (const move of moves) {
        if (move.to[0] === r && move.to[1] === c) {
          const newBoard = board.map(row => [...row]);
          newBoard[sr][sc] = null;
          newBoard[r][c] = turn;
          let newKilled = killed;
          for (let [cr, cc] of checkCaptures(newBoard, r, c, turn)) {
            newBoard[cr][cc] = null;
            newKilled++;
          }
          setBoard(newBoard);
          setKilled(newKilled);
          setTurn(turn === 'T' ? 'D' : 'T');
          setSelected(null);
          setValidSquares([]);
          return;
        }
      }
      setSelected(null);
      setValidSquares([]);
    } else if (board[r][c] === turn) {
      setSelected([r, c]);
      setValidSquares(getValidMoves(board, r, c).map(m => m.to.join(',')));
    }
  };

  useEffect(() => {
    const tigerPos = getTigerPosition(board);
    if (killed >= 6) setWinner('Tiger');
    else if (!tigerPos || getValidMoves(board, ...getTigerPosition(board)).length === 0) setWinner('Dogs');

    const isAITurn = mode !== 'hvh' && turn === aiPlayer;
    const isAIvsAI = mode === 'aia';

    if ((isAITurn || isAIvsAI) && !winner && !movePending.current) {
      movePending.current = true;
      const useAlphaBeta = turn === 'T' ? aiTypeTiger === 'alphabeta' : aiTypeDogs === 'alphabeta';
      const currentDepth = turn === 'T' ? depthTiger : depthDogs;

      setTimeout(() => {
        const move = getBestMove(board, killed, currentDepth, turn, useAlphaBeta);
        if (move) {
          const newBoard = board.map(row => [...row]);
          const [fr, fc] = move.from;
          const [tr, tc] = move.to;
          newBoard[fr][fc] = null;
          newBoard[tr][tc] = turn;
          let newKilled = killed;
          for (let [cr, cc] of checkCaptures(newBoard, tr, tc, turn)) {
            newBoard[cr][cc] = null;
            newKilled++;
          }
          setBoard(newBoard);
          setKilled(newKilled);
          setTurn(turn === 'T' ? 'D' : 'T');
        }
        movePending.current = false;
      }, 500);
    }
  }, [board, turn, mode, aiPlayer, aiTypeTiger, aiTypeDogs, depthTiger, depthDogs]);

  return (
    <div>
      <button onClick={onBackToMenu} className="back">Back to Menu</button>
      <h3>Turn: {turn} | Killed: {killed}</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 60px)',
        gap: '5px',
        margin: '20px auto',
        width: 'max-content'
      }}>
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isSelected = selected && selected[0] === r && selected[1] === c;
            const isValid = validSquares.includes([r, c].join(','));
            return (
              <div key={`${r}-${c}`}
                onClick={() => handleClick(r, c)}
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: isSelected ? '#ccc' : isValid ? '#cfc' : '#eee',
                  border: '1px solid #333',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                {cell}
              </div>
            );
          })
        )}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
}

// Complete
const Minimaxcomplete = (board, killed, isMax, aiPlayer) =>
  alphabeta(board, killed, Infinity, -Infinity, Infinity, isMax, aiPlayer, false);

const ABcomplete = (board, killed, isMax, aiPlayer) =>
  alphabeta(board, killed, Infinity, -Infinity, Infinity, isMax, aiPlayer, true);

// Depth-limited
const Minimaxlimited = (board, killed, depth, isMax, aiPlayer) =>
  alphabeta(board, killed, depth, -Infinity, Infinity, isMax, aiPlayer, false);

const ABlimited = (board, killed, depth, isMax, aiPlayer) =>
  alphabeta(board, killed, depth, -Infinity, Infinity, isMax, aiPlayer, true);
