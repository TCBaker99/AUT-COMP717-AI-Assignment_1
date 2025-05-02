import React, { useEffect, useRef, useState } from 'react';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import './TicTacToe.css';

const TicTacMinMax7x7 = ({ onBack, startingPlayer, depth }) => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [boardData, setBoardData] = useState(Array(49).fill(""));

  const box_array = useRef([]);
  const titleRef = useRef(null);

  const playerIcon = { x: cross_icon, o: circle_icon };
  const humanPlayer = startingPlayer;
  const aiPlayer = humanPlayer === 'x' ? 'o' : 'x';

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
        winner === "draw" ? "It's a Draw!" : `${winner.toUpperCase()} Wins! 🎉`;
    }
  };

  const makeMove = (index, player) => {
    if (lock || boardData[index] !== "") return;
    const updated = [...boardData];
    updated[index] = player;
    setBoardData(updated);
    box_array.current[index].innerHTML = `<img src=${playerIcon[player]} />`;
    setCount(prev => prev + 1);
  };

  const handleClick = (index) => {
    if (lock || boardData[index] !== "") return;
    if (getCurrentPlayer() !== humanPlayer) return;
    makeMove(index, humanPlayer);
  };

  const reset = () => {
    setBoardData(Array(49).fill(""));
    setLock(false);
    setCount(0);
    titleRef.current.innerHTML = 'Tic Tac Toe 7x7 Mode';
    box_array.current.forEach(ref => {
      if (ref) ref.innerHTML = "";
    });
  };

  useEffect(() => {
    const aiTurn = getCurrentPlayer() === aiPlayer;

    const getAIMove = async () => {
      const response = await fetch("http://localhost:5000/move-ab-limited-7x7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board: boardData, ai: aiPlayer, depth: depth })
      });

      const result = await response.json();
      setBoardData(result.board);
      renderBoard(result.board);
      setCount(prev => prev + 1);
      checkWinner(result.winner);
    };

    if (!lock && aiTurn) {
      getAIMove();
    }
  }, [boardData, count, lock, aiPlayer, depth]);

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe 7x7 Mode</h1>
      <div className='board board7x7'>
        {[...Array(7)].map((_, row) => (
          <div key={row} className={`row7x7`}>
            {[...Array(7)].map((_, col) => {
              const i = row * 7 + col;
              return (
                <div
                  key={i}
                  className='boxes'
                  ref={(el) => (box_array.current[i] = el)}
                  onClick={() => handleClick(i)}
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

export default TicTacMinMax7x7;
