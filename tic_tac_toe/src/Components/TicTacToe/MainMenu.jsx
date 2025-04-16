import React, { useState } from 'react';
import TicTacToeBoard from './TicTacToeBoard';
import './MainMenu.css';

const MainMenu = () => {
  const [mode, setMode] = useState(null); // null = Main Menu, "2p", "minimax", "alphabeta"

  if (mode === null) {
    return (
      <div className='main-menu'>
        <h1 className="main-menu-title">Tic Tac Toe Game</h1>
        <h3 className="main-menu-subtitle">Select a Game Mode</h3>
        <div className="AIMenu">
          <button onClick={() => setMode("2p")}>1: 2 Player Mode</button>
          <button onClick={() => alert("Minimax AI coming soon!")}>2: Vs Minimax AI</button>
          <button onClick={() => alert("Alpha Beta AI coming soon!")}>3: Vs Alpha Beta AI</button>
        </div>
      </div>
    );
  }

  if (mode === "2p") {
    return <TicTacToeBoard onBack={() => setMode(null)} />;
  }

  return null;
};

export default MainMenu; 
