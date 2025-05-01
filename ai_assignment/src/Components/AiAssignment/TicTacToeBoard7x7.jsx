
import React, { useRef, useState } from 'react';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import './TicTacToe.css';

const TicTacToeBoard7x7 = ({ onBack }) => {
  const initialData = Array(49).fill("");
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [startingPlayer, setStartingPlayer] = useState('x');

  const titleRef = useRef(null);
  const boxRefs = useRef([]);
  if (boxRefs.current.length !== 49) {
    boxRefs.current = Array.from({ length: 49 }, () => React.createRef());
  }

  const reset = () => {
    setLock(false);
    const newData = Array(49).fill("");
    setData(newData);
    titleRef.current.innerHTML = 'Tic Tac Toe 7x7 Game In <span>React</span>';
    boxRefs.current.forEach((ref) => {
      if (ref.current) ref.current.innerHTML = "";
    });
    setCount(0);
  };

  const handleClick = (index) => {
    if (lock || data[index] !== "") return;

    const currentPlayer = (count + (startingPlayer === 'o' ? 1 : 0)) % 2 === 0 ? 'x' : 'o';
    const newData = [...data];
    newData[index] = currentPlayer;
    setData(newData);
    if (boxRefs.current[index].current) {
      boxRefs.current[index].current.innerHTML = `<img src=${currentPlayer === "x" ? cross_icon : circle_icon} />`;
    }

    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (board) => {
    const size = 7;
    const winLength = 4;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const start = row * size + col;
        const player = board[start];
        if (!player) continue;

        // Horizontal
        if (col <= size - winLength &&
            board[start + 1] === player &&
            board[start + 2] === player &&
            board[start + 3] === player) {
          setLock(true);
          titleRef.current.innerHTML = `${player.toUpperCase()} Wins! 🎉`;
          return;
        }

        // Vertical
        if (row <= size - winLength &&
            board[start + size] === player &&
            board[start + 2 * size] === player &&
            board[start + 3 * size] === player) {
          setLock(true);
          titleRef.current.innerHTML = `${player.toUpperCase()} Wins! 🎉`;
          return;
        }

        // Diagonal Down-Right
        if (col <= size - winLength &&
            row <= size - winLength &&
            board[start + size + 1] === player &&
            board[start + 2 * (size + 1)] === player &&
            board[start + 3 * (size + 1)] === player) {
          setLock(true);
          titleRef.current.innerHTML = `${player.toUpperCase()} Wins! 🎉`;
          return;
        }

        // Diagonal Down-Left
        if (col >= winLength - 1 &&
            row <= size - winLength &&
            board[start + size - 1] === player &&
            board[start + 2 * (size - 1)] === player &&
            board[start + 3 * (size - 1)] === player) {
          setLock(true);
          titleRef.current.innerHTML = `${player.toUpperCase()} Wins! 🎉`;
          return;
        }
      }
    }

    if (!board.includes("")) {
      setLock(true);
      titleRef.current.innerHTML = "It's a Draw!";
    }
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe 7x7 Game In <span>React</span></h1>
      <div className='board-7x7'>
        {boxRefs.current.map((ref, index) => (
          <div key={index} className='boxes-7x7' ref={ref} onClick={() => handleClick(index)}></div>
        ))}
      </div>
      <button className='reset' onClick={reset}>Reset</button>
      <button className='reset' onClick={onBack}>Back to Menu</button>
    </div>
  );
};

export default TicTacToeBoard7x7;
