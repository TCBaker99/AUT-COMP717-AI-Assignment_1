import React from 'react';
import './MainMenu.css'; 

const MinMaxSelection = ({ onSelect }) => {
  return (
    <div className="minmax-selection">
      <h2 style={{ color: 'white' }}>Select Your Player</h2>
      <div className="AIMenu">
        <button onClick={() => onSelect('x')}>Play as X</button>
        <button onClick={() => onSelect('o')}>Play as O</button>
      </div>
    </div>
  );
};

export default MinMaxSelection;
