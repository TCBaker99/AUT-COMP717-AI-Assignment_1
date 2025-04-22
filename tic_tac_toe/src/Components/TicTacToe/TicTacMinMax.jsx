import React, { useEffect, useRef, useState } from 'react';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import './TicTacToe.css';

const TicTacMinMax = ({ onBack, startingPlayer }) => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [boardData, setBoardData] = useState(Array(9).fill(""));

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
    setBoardData(Array(9).fill(""));
    setLock(false);
    setCount(0);
    titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
    box_array.current.forEach(ref => {
      if (ref) ref.innerHTML = "";
    });
  };

  useEffect(() => {
    const aiTurn = getCurrentPlayer() === aiPlayer;

    const getAIMove = async () => {
      const response = await fetch("http://localhost:5000/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board: boardData, ai: aiPlayer })
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
  }, [boardData, count, lock, aiPlayer]);

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <p style={{ color: '#26ffcb', fontSize: '18px', marginBottom: '20px' }}>
        Note: If the human is playing as O, please click reset before playing
      </p>
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

export default TicTacMinMax;
