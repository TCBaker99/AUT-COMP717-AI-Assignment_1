import React from 'react';
import './MainMenu.css';

const AIvsAISelection = ({ onSelect }) => {
  return (
    <div className="main-menu">
      <h1 className="main-menu-title">AI vs AI Setup</h1>
      <h3 className="main-menu-subtitle">Select which AI plays X and which plays O</h3>
      <div className="AIMenu">
        <button onClick={() => onSelect({ x: 'minmax', o: 'alphabeta' })}>
          Minimax (X) vs Alpha-Beta (O)
        </button>
        <button onClick={() => onSelect({ x: 'alphabeta', o: 'minmax' })}>
          Alpha-Beta (X) vs Minimax (O)
        </button>
      </div>
    </div>
  );
};

export default AIvsAISelection;
