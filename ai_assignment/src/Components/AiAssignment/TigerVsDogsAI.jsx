
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

function getTigerPosition(board) {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (board[r][c] === 'T') return [r, c];
    }
  }
  return null;
}

function cloneBoard(board) {
  return board.map(row => [...row]);
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

function checkCaptures(board, r, c) {
  let captured = [];
  for (let [dr, dc] of directions) {
    const r1 = r + dr;
    const c1 = c + dc;
    const r2 = r + 2 * dr;
    const c2 = c + 2 * dc;
    if (
      isInside(r2, c2) &&
      board[r1][c1] === 'D' &&
      board[r2][c2] === 'D'
    ) {
      const r3 = r + 3 * dr;
      const c3 = c + 3 * dc;
      if (!isInside(r3, c3) || board[r3][c3] !== 'D') {
        captured.push([r1, c1]);
        captured.push([r2, c2]);
      }
    }
  }
  return captured;
}

function evaluate(board, killed, turn, aiPlayer) {
  if (killed >= 6) return aiPlayer === 'T' ? 100 : -100;
  const tigerPos = getTigerPosition(board);
  if (!tigerPos) return aiPlayer === 'T' ? -100 : 100;
  const [r, c] = tigerPos;
  const tigerMoves = getValidMoves(board, r, c);
  if (tigerMoves.length === 0) return aiPlayer === 'T' ? -100 : 100;
  return (aiPlayer === 'T' ? 10 : -10) + tigerMoves.length;
}

function alphabeta(board, killed, depth, alpha, beta, isMax, aiPlayer) {
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
      for (let [cr, cc] of checkCaptures(newBoard, nr, nc)) {
        newBoard[cr][cc] = null;
        newKilled++;
      }
      value = Math.max(value, alphabeta(newBoard, newKilled, depth - 1, alpha, beta, !isMax, aiPlayer));
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
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
            value = Math.min(value, alphabeta(newBoard, killed, depth - 1, alpha, beta, !isMax, aiPlayer));
            beta = Math.min(beta, value);
            if (beta <= alpha) break;
          }
        }
      }
    }
    return value;
  }
}

function getBestMove(board, killed, depth, aiPlayer) {
  let best = -Infinity;
  let bestMove = null;
  if (aiPlayer === 'T') {
    const [r, c] = getTigerPosition(board);
    for (let { to: [nr, nc] } of getValidMoves(board, r, c)) {
      const newBoard = cloneBoard(board);
      newBoard[r][c] = null;
      newBoard[nr][nc] = 'T';
      let newKilled = killed;
      for (let [cr, cc] of checkCaptures(newBoard, nr, nc)) {
        newBoard[cr][cc] = null;
        newKilled++;
      }
      const val = alphabeta(newBoard, newKilled, depth - 1, -Infinity, Infinity, false, aiPlayer);
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
  const [killed, setKilled] = useState(0);
  const [winner, setWinner] = useState(null);
  const [selected, setSelected] = useState(null);
  const [validSquares, setValidSquares] = useState([]);
  const initialMoveMade = useRef(false);

  const handleClick = (r, c) => {
    if (winner || (mode !== 'hvh' && turn === aiPlayer)) return;
    if (selected) {
      const [sr, sc] = selected;
      const moves = getValidMoves(board, sr, sc);
      for (const move of moves) {
        if (move.to[0] === r && move.to[1] === c) {
          const newBoard = cloneBoard(board);
          newBoard[sr][sc] = null;
          newBoard[r][c] = turn;
          let newKilled = killed;
          for (let [cr, cc] of checkCaptures(newBoard, r, c)) {
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
    else if (tigerPos && getValidMoves(board, ...tigerPos).length === 0) setWinner('Dogs');

    const isAITurn = mode !== 'hvh' && turn === aiPlayer;
    const isAIvsAI = mode === 'aia';

    if ((isAITurn || isAIvsAI) && !winner && !initialMoveMade.current) {
      initialMoveMade.current = true;
      const move = getBestMove(board, killed, depth, turn);
      if (move) {
        setTimeout(() => {
          const newBoard = cloneBoard(board);
          const [fr, fc] = move.from;
          const [tr, tc] = move.to;
          newBoard[fr][fc] = null;
          newBoard[tr][tc] = turn;
          let newKilled = killed;
          for (let [cr, cc] of checkCaptures(newBoard, tr, tc)) {
            newBoard[cr][cc] = null;
            newKilled++;
          }
          setBoard(newBoard);
          setKilled(newKilled);
          setTurn(turn === 'T' ? 'D' : 'T');
          initialMoveMade.current = false;
        }, 500);
      }
    }
  }, [board, turn]);

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
