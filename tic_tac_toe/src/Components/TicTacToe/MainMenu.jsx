import React, { useState } from 'react';
import TicTacToeBoard from './TicTacToeBoard';
import TicTacMinMax from './TicTacMinMax';
import MinMaxSelection from './MinMaxSelection'; // NEW
import './MainMenu.css';

const MainMenu = () => {
  const [mode, setMode] = useState(null); // null = Main Menu, "2p", "minmax-select", "minmax", etc.
  const [startingPlayer, setStartingPlayer] = useState('x'); // NEW

  if (mode === null) {
    return (
      <div className='main-menu'>
        <h1 className="main-menu-title">Tic Tac Toe Game</h1>
        <h3 className="main-menu-subtitle">Select a Game Mode</h3>
        <div className="AIMenu">
          <button onClick={() => setMode("2p")}>1: 2 Player Mode</button>
          <button onClick={() => setMode("minmax-select")}>2: Vs Minmax AI</button>
          <button onClick={() => alert("Alpha Beta AI coming soon!")}>3: Vs Alpha Beta AI</button>
        </div>
      </div>
    );
  }

  if (mode === "2p") {
    return <TicTacToeBoard onBack={() => setMode(null)} />;
  }

  if (mode === "minmax-select") {
    return (
      <MinMaxSelection
        onSelect={(player) => {
          setStartingPlayer(player);
          setMode("minmax");
        }}
      />
    );
  }

  if (mode === "minmax") {
    return (
      <TicTacMinMax
        onBack={() => setMode(null)}
        startingPlayer={startingPlayer} // NEW
      />
    );
  }

  return null;
};

export default MainMenu;
