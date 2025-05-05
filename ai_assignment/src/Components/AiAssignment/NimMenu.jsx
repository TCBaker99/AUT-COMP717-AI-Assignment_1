
import React, { useState } from 'react';
import './MainMenu.css';
import NimAI from './NimAI';
import ConnectFourMenu from './ConnectFourMenu';

export default function NimMenu({ onBack }) {
  const [inGame, setInGame] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [heapConfig, setHeapConfig] = useState([1, 3, 5, 7]);
  const [mode, setMode] = useState('hvh');
  const [algorithm, setAlgorithm] = useState('minimax');
  const [depth, setDepth] = useState(3);
  const [depthMinimax, setDepthMinimax] = useState(3);
  const [depthAlphaBeta, setDepthAlphaBeta] = useState(3);
  const [aiPlayer, setAiPlayer] = useState('A');
  const [inConnectFourMenu, setInConnectFourMenu] = useState(false);

  const toggleHeapSize = () => {
    setHeapConfig(prev => prev.length === 4 ? [2, 4, 6, 8, 10] : [1, 3, 5, 7]);
  };

  const startGame = () => setInGame(true);
  const resetGame = () => setGameKey(prev => prev + 1);
  const backToMenu = () => setInGame(false);

  if (inConnectFourMenu) return <ConnectFourMenu onBack={() => setInConnectFourMenu(false)} />;

  if (inGame) {
    return (
      <div className="container">
        <button className="reset" onClick={resetGame}>Reset Game</button>
        <NimAI
          key={gameKey}
          heapConfig={heapConfig}
          mode={mode}
          algorithm={algorithm}
          depth={depth}
          depthMinimax={depthMinimax}
          depthAlphaBeta={depthAlphaBeta}
          aiPlayer={aiPlayer}
          onBackToMenu={backToMenu}
        />
      </div>
    );
  }

  return (
    <div className="main-menu">
      <h1 className="main-menu-title">Nim AI</h1>
      <div className="AIMenu">
        <button onClick={toggleHeapSize}>
          {heapConfig.length} Heaps [{heapConfig.join(', ')}]
        </button>
        <h3>Mode:</h3>
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="hvh">Human vs Human</option>
          <option value="hva">Human vs AI</option>
          <option value="ava">AI vs AI</option>
        </select>
        {mode === 'hva' && (
          <>
            <h3>Algorithm:</h3>
            <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
              <option value="minimax">Minimax</option>
              <option value="alphabeta">Alpha-Beta</option>
            </select>
            <h3>Depth:</h3>
            <input
              type="number" max="10"
              min="1"
              value={depth}
              onChange={e => setDepth(parseInt(e.target.value) || 1)}
            />
            <h3>AI Plays:</h3>
            <select value={aiPlayer} onChange={e => setAiPlayer(e.target.value)}>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </>
        )}
        {mode === 'ava' && (
          <>
            <h3>Minimax Depth:</h3>
            <input
              type="number" max="10"
              min="1"
              value={depthMinimax}
              onChange={e => setDepthMinimax(parseInt(e.target.value) || 1)}
            />
            <h3>Alpha-Beta Depth:</h3>
            <input
              type="number" max="10"
              min="1"
              value={depthAlphaBeta}
              onChange={e => setDepthAlphaBeta(parseInt(e.target.value) || 1)}
            />
          </>
        )}
        <button onClick={startGame}>Start Game</button>
        <button style={{ float: 'left' }} onClick={onBack}>←</button>
        <button style={{ float: 'right' }} onClick={() => setInConnectFourMenu(true)}>→</button>
      </div>
    </div>
  );
}
