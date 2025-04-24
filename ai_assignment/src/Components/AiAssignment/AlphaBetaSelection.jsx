
import React, { useState } from 'react';
import './TicTacToe.css';

const AlphaBetaSelection = ({ onSelect }) => {
  const [depth, setDepth] = useState(9);
  const handleSelect = (player) => {
    onSelect({ player, depth });
  };

  return (
    <div className='container'>
      <h1 className='title'>Choose Your Side</h1>
      <button className='PlayX' onClick={() => handleSelect('x')}>Play as X</button>
      <button className='PlayO' onClick={() => handleSelect('o')}>Play as O</button>
      <div style={{ marginTop: '20px', color: 'white' }}>
        <label>
          Depth Limit: 
          <input type="number" value={depth} onChange={(e) => setDepth(parseInt(e.target.value))} min="1" max="9" />
        </label>
      </div>
    </div>
  );
};

export default AlphaBetaSelection;
