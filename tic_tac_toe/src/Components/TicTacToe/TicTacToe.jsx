import React, { useRef, useState } from 'react';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import './TicTacToe.css';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
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

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className='board'>
        <div className='row1'>
          <div className='boxes' ref={box1}></div>
          <div className='boxes' ref={box2}></div>
          <div className='boxes' ref={box3}></div>
        </div>
        <div className='row2'>
          <div className='boxes' ref={box4}></div>
          <div className='boxes' ref={box5}></div>
          <div className='boxes' ref={box6}></div>
        </div>
        <div className='row3'>
          <div className='boxes' ref={box7}></div>
          <div className='boxes' ref={box8}></div>
          <div className='boxes' ref={box9}></div>
        </div>
      </div>
      <button className='reset' onClick={() => { reset() }}>Reset</button>
      <div className='RightMenu'>
        <button className='PlayO' onClick={() => { setStartingPlayer('o'); reset(); }}>Play as O</button>
        <button className='PlayX' onClick={() => { setStartingPlayer('x'); reset(); }}>Play as X</button>
      </div>
      <div className='AIMenu'>
        <h3>AI Mode</h3>
        <button onClick={() => setAIMode("none")}>2 Player</button>
        <button onClick={() => setAIMode("minimax")}>Play vs Minimax</button>
        <button onClick={() => setAIMode("alphabeta")}>Play vs Alpha-Beta</button>
      </div>
    </div>
  );
};

export default TicTacToe;
