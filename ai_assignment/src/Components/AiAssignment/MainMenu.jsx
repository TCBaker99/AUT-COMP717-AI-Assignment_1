import React, { useState } from 'react';
import TicTacToeBoard from './TicTacToeBoard';
import TicTacMinMax from './TicTacMinMax';
import MinMaxSelection from './MinMaxSelection';
import AlphaBetaSelection from './AlphaBetaSelection';
import TicTacAlphaBeta from './TicTacAlphaBeta';
import AIvsAISelection from './AIvsAISelection';
import TicTacAIBattle from './TicTacAIBattle';
import './MainMenu.css';

const MainMenu = () => {
  const [mode, setMode] = useState(null);
  const [startingPlayer, setStartingPlayer] = useState('x');
  const [aiConfig, setAIConfig] = useState({ x: 'minmax', o: 'alphabeta' });

  if (mode === null) {
    return (
      <div className='main-menu'>
        <h1 className="main-menu-title">Tic Tac Toe Game</h1>
        <h3 className="main-menu-subtitle">Select a Game Mode</h3>
        <div className="AIMenu">
          <button onClick={() => setMode("2p")}>1: 2 Player Mode</button>
          <button onClick={() => setMode("minmax-select")}>2: Vs Minmax AI</button>
          <button onClick={() => setMode("alphabeta-select")}>3: Vs Alpha Beta AI</button>
          <button onClick={() => setMode("ai-battle-select")}>4: AI vs AI Mode</button>
        </div>

        <h3 className="main-menu-subtitle">Nim (Coming Soon)</h3>
        <div className="AIMenu">
          <button disabled>1: 2 Player Mode</button>
          <button disabled>2: Vs Minmax AI</button>
          <button disabled>3: Vs Alpha Beta AI</button>
          <button disabled>4: AI vs AI Mode</button>
        </div>

        <h3 className="main-menu-subtitle">Connect Four (Coming Soon)</h3>
        <div className="AIMenu">
          <button disabled>1: 2 Player Mode</button>
          <button disabled>2: Vs Minmax AI</button>
          <button disabled>3: Vs Alpha Beta AI</button>
          <button disabled>4: AI vs AI Mode</button>
        </div>

        <h3 className="main-menu-subtitle">Tiger vs Dogs (Coming Soon)</h3>
        <div className="AIMenu">
          <button disabled>1: 2 Player Mode</button>
          <button disabled>2: Vs Minmax AI</button>
          <button disabled>3: Vs Alpha Beta AI</button>
          <button disabled>4: AI vs AI Mode</button>
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
        startingPlayer={startingPlayer}
      />
    );
  }

  if (mode === "alphabeta-select") {
    return (
      <AlphaBetaSelection
        onSelect={(player) => {
          setStartingPlayer(player);
          setMode("alphabeta");
        }}
      />
    );
  }

  if (mode === "alphabeta") {
    return (
      <TicTacAlphaBeta
        onBack={() => setMode(null)}
        startingPlayer={startingPlayer}
      />
    );
  }

  if (mode === "ai-battle-select") {
    return (
      <AIvsAISelection
        onSelect={(config) => {
          setAIConfig(config);
          setMode("ai-battle");
        }}
      />
    );
  }

  if (mode === "ai-battle") {
    return (
      <TicTacAIBattle
        aiTypes={aiConfig}
        onBack={() => setMode(null)}
      />
    );
  }

  return null;
};

export default MainMenu;
