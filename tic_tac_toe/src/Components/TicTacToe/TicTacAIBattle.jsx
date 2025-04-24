import React, { useEffect, useRef, useState } from 'react';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import './TicTacToe.css';

const TicTacAIBattle = ({ onBack, aiTypes }) => {
  const [boardData, setBoardData] = useState(Array(9).fill(""));
  const [lock, setLock] = useState(false);
  const [count, setCount] = useState(0);
  const box_array = useRef([]);
  const titleRef = useRef(null);

  const playerIcon = { x: cross_icon, o: circle_icon };
  const getCurrentPlayer = () => (count % 2 === 0 ? 'x' : 'o');

  const renderBoard = (updatedBoard) => {
    updatedBoard.forEach((val, i) => {
      if (val !== "" && box_array.current[i]?.innerHTML === "") {
        box_array.current[i].innerHTML = `<img src=${playerIcon[val]} />`;
      }
    });
  };

  const checkWinner = (winner) => {
    if (winner) {
      setLock(true);
      titleRef.current.innerHTML =
        winner === "draw" ? "It's a Draw!" : `${winner.toUpperCase()} Wins! 🤖`;
    }
  };

  const reset = () => {
    setBoardData(Array(9).fill(""));
    setLock(false);
    setCount(0);
    titleRef.current.innerHTML = 'AI vs AI Battle';
    box_array.current.forEach(ref => ref && (ref.innerHTML = ""));
  };

  useEffect(() => {
    const playAITurn = async () => {
      const currentPlayer = getCurrentPlayer();
      const endpoint = aiTypes[currentPlayer] === 'minmax' ? '/move' : '/move-ab';

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board: boardData, ai: currentPlayer })
      });

      const result = await response.json();
      setBoardData(result.board);
      renderBoard(result.board);
      setCount(prev => prev + 1);
      checkWinner(result.winner);
    };

    if (!lock) {
      const delay = setTimeout(playAITurn, 500);
      return () => clearTimeout(delay);
    }
  }, [boardData, count, lock]);

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>AI vs AI Battle</h1>
      <div className='board'>
        {[0, 1, 2].map(row => (
          <div key={row} className={`row${row + 1}`}>
            {[0, 1, 2].map(col => {
              const i = row * 3 + col;
              return (
                <div
                  key={i}
                  className='boxes'
                  ref={(el) => (box_array.current[i] = el)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <button className='reset' onClick={reset}>Reset</button>
      <button className='reset' onClick={onBack}>Back to Menu</button>
    </div>
  );
};

export default TicTacAIBattle;