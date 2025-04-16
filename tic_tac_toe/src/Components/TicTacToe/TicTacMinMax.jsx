import React, { useCallback, useEffect, useRef, useState } from 'react';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import './TicTacToe.css';

const TicTacMinMax = ({ onBack, startingPlayer }) => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [currentData, setCurrentData] = useState(Array(9).fill(""));
  const [hasAIMoved, setHasAIMoved] = useState(false); // ✅ NEW

  const titleRef = useRef(null);

  const box0 = useRef(null), box1 = useRef(null), box2 = useRef(null);
  const box3 = useRef(null), box4 = useRef(null), box5 = useRef(null);
  const box6 = useRef(null), box7 = useRef(null), box8 = useRef(null);
  const box_array = [box0, box1, box2, box3, box4, box5, box6, box7, box8];

  const playerIcon = { x: cross_icon, o: circle_icon };
  const humanPlayer = startingPlayer;
  const aiPlayer = humanPlayer === 'x' ? 'o' : 'x';

  const getCurrentPlayer = () => (count % 2 === 0 ? 'x' : 'o');
  const isAITurn = () => getCurrentPlayer() === aiPlayer;

  const evaluateWinner = useCallback((board) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of winConditions) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];
    }
    return board.includes("") ? null : "draw";
  }, []);

  const minimax = useCallback((board, isMaximizing) => {
    const winner = evaluateWinner(board);
    if (winner === aiPlayer) return 10;
    if (winner === humanPlayer) return -10;
    if (winner === "draw") return 0;

    let bestScore = isMaximizing ? -Infinity : Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = isMaximizing ? aiPlayer : humanPlayer;
        const score = minimax(board, !isMaximizing);
        board[i] = "";
        bestScore = isMaximizing
          ? Math.max(score, bestScore)
          : Math.min(score, bestScore);
      }
    }
    return bestScore;
  }, [aiPlayer, humanPlayer, evaluateWinner]);

  const bestMove = useCallback((board) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = aiPlayer;
        const score = minimax(board, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }, [aiPlayer, minimax]);

  const makeMove = useCallback((index, player) => {
    if (lock || currentData[index] !== "") return;
    const updated = [...currentData];
    updated[index] = player;
    setCurrentData(updated);
    box_array[index].current.innerHTML = `<img src=${playerIcon[player]} />`;
    setCount((prev) => prev + 1);

    if (player === aiPlayer) {
      setHasAIMoved(true); // ✅ mark that AI has moved this turn
    } else {
      setHasAIMoved(false); // ✅ allow AI to move again after human's turn
    }
  }, [currentData, lock, aiPlayer]);

  const handleClick = (index) => {
    if (lock || currentData[index] !== "") return;
    if (getCurrentPlayer() !== humanPlayer) return;
    makeMove(index, humanPlayer);
  };

  const checkGameState = useCallback(() => {
    const winner = evaluateWinner(currentData);
    if (winner) {
      setLock(true);
      titleRef.current.innerHTML =
        winner === "draw" ? "It's a Draw!" : `${winner.toUpperCase()} Wins! 🎉`;
    }
  }, [currentData, evaluateWinner]);

  const reset = () => {
    setLock(false);
    setCount(0);
    setHasAIMoved(false); // ✅ reset AI move flag
    setCurrentData(Array(9).fill(""));
    titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
    box_array.forEach((ref) => {
      if (ref.current) ref.current.innerHTML = "";
    });
  };

  useEffect(() => {
    checkGameState();

    if (!lock && isAITurn() && !hasAIMoved) {
      const move = bestMove([...currentData]);
      if (move !== -1) {
        setTimeout(() => {
          makeMove(move, aiPlayer);
        }, 200);
      }
    }
  }, [currentData, count, lock, hasAIMoved, bestMove, makeMove, checkGameState]);

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className='board'>
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1}`}>
            {[0, 1, 2].map((col) => {
              const i = row * 3 + col;
              return (
                <div
                  key={i}
                  className='boxes'
                  ref={box_array[i]}
                  onClick={() => handleClick(i)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <button className='reset' onClick={reset}>Reset</button>
      <button className='back' onClick={onBack}>Back to Menu</button>
    </div>
  );
};

export default TicTacMinMax;
