import React from 'react';
import './TicTacToe.css';

const AlphaBetaSelection = ({ onSelect }) => {
  return (
    <div className='container'>
      <h1 className='title'>Choose Your Side</h1>
      <button className='PlayX' onClick={() => onSelect('x')}>Play as X</button>
      <button className='PlayO' onClick={() => onSelect('o')}>Play as O</button>
    </div>
  );
};

export default AlphaBetaSelection;
