import React from 'react';

const MinMaxSelection = ({ onSelect }) => {
  return (
    <div className="minmax-selection">
      <h2>Select Your Player</h2>
      <button onClick={() => onSelect('x')}>Play as X</button>
      <button onClick={() => onSelect('o')}>Play as O</button>
    </div>
  );
};

export default MinMaxSelection;
