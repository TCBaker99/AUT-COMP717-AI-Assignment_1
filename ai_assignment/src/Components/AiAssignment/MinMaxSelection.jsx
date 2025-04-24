
import React, { useState } from 'react';
import './MainMenu.css'; 

const MinMaxSelection = ({ onSelect }) => {
  const [depth, setDepth] = useState(9);
  const handleSelect = (player) => {
    onSelect({ player, depth });
  };

  return (
    <div className="minmax-selection">
      <h2 style={{ color: 'white' }}>Select Your Player</h2>
      <div className="AIMenu">
        <button onClick={() => handleSelect('x')}>Play as X</button>
        <button onClick={() => handleSelect('o')}>Play as O</button>
      </div>
      <div style={{ marginTop: '20px', color: 'white' }}>
        <label>
          Depth Limit: 
          <input type="number" value={depth} onChange={(e) => setDepth(parseInt(e.target.value))} min="1" max="9" />
        </label>
      </div>
    </div>
  );
};

export default MinMaxSelection;
