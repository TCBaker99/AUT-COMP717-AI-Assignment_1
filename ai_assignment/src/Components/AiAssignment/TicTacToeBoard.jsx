import React, { useRef, useState } from 'react';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import './TicTacToe.css';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToeBoard = ({ onBack }) => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [startingPlayer, setStartingPlayer] = useState('x');
  let [aiMode, setAIMode] = useState("none");

  let titleRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);
  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
    box_array.map((e) => {
      e.current.innerHTML = "";
    });
    setCount(0);
  };

  const handleClick = (index) => {
    if (lock || data[index] !== "") return;

    const currentPlayer = (count + (startingPlayer === 'o' ? 1 : 0)) % 2 === 0 ? 'x' : 'o';
    data[index] = currentPlayer;
    box_array[index].current.innerHTML = `<img src=${currentPlayer === "x" ? cross_icon : circle_icon} />`;

    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        setLock(true);
        titleRef.current.innerHTML = `${data[a].toUpperCase()} Wins! 🎉`;
        return;
      }
    }

    if (!data.includes("")) {
      setLock(true);
      titleRef.current.innerHTML = "It's a Draw!";
    }
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className='board'>
        <div className='row1'>
          <div className='boxes' ref={box1} onClick={() => handleClick(0)}></div>
          <div className='boxes' ref={box2} onClick={() => handleClick(1)}></div>
          <div className='boxes' ref={box3} onClick={() => handleClick(2)}></div>
        </div>
        <div className='row2'>
          <div className='boxes' ref={box4} onClick={() => handleClick(3)}></div>
          <div className='boxes' ref={box5} onClick={() => handleClick(4)}></div>
          <div className='boxes' ref={box6} onClick={() => handleClick(5)}></div>
        </div>
        <div className='row3'>
          <div className='boxes' ref={box7} onClick={() => handleClick(6)}></div>
          <div className='boxes' ref={box8} onClick={() => handleClick(7)}></div>
          <div className='boxes' ref={box9} onClick={() => handleClick(8)}></div>
        </div>
      </div>
      <button className='reset' onClick={reset}>Reset</button>
      <button className='reset' onClick={onBack}>Back to Menu</button>
    </div>
  );
};

export default TicTacToeBoard;
