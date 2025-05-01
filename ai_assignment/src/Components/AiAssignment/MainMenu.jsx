import React, { useState } from 'react';
import TicTacToeBoard from './TicTacToeBoard';
import TicTacToeBoard7x7 from './TicTacToeBoard7x7';
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
  const [depth, setDepth] = useState(9);
  const [aiConfig, setAIConfig] = useState({ x: 'minmax', o: 'alphabeta' });
  const [is7x7, setIs7x7] = useState(false);  // toggle state

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
          <button onClick={() => setIs7x7(!is7x7)}>
            Board Size: {is7x7 ? "7x7" : "3x3"}
          </button>
        </div>
      </div>
    );
  }

  if (mode === "2p") {
    return is7x7
      ? <TicTacToeBoard7x7 onBack={() => setMode(null)} />
      : <TicTacToeBoard onBack={() => setMode(null)} />;
  }

  if (mode === "minmax-select") {
    return (
      <MinMaxSelection
        onSelect={({ player, depth }) => {
          setStartingPlayer(player);
          setDepth(depth);
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
        depth={depth}
      />
    );
  }

  if (mode === "alphabeta-select") {
    return (
      <AlphaBetaSelection
        onSelect={({ player, depth }) => {
          setStartingPlayer(player);
          setDepth(depth);
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
        depth={depth}
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
