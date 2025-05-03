
import React, { useState } from 'react';
import './MainMenu.css';
import ConnectFourAI from './ConnectFourAI';
import TigerVsDogsMenu from './TigerVsDogsMenu';

export default function ConnectFourMenu({ onBack }) {
  const [inGame, setInGame] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(5);
  const [mode, setMode] = useState('hvh');
  const [algorithm, setAlgorithm] = useState('minimax');
  const [depth, setDepth] = useState(3);
  const [depthMinimax, setDepthMinimax] = useState(3);
  const [depthAlphaBeta, setDepthAlphaBeta] = useState(3);
  const [aiPlayer, setAiPlayer] = useState('R');
  const [inTigerMenu, setInTigerMenu] = useState(false);

  const toggleSize = () => {
    setRows(prev => (prev === 4 ? 7 : 4));
    setCols(prev => (prev === 5 ? 8 : 5));
  };

  const startGame = () => setInGame(true);
  const resetGame = () => setGameKey(prev => prev + 1);
  const backToMenu = () => setInGame(false);

  if (inTigerMenu) return <TigerVsDogsMenu onBack={() => setInTigerMenu(false)} />;

  if (inGame) {
    return (
      <div className="container">
        <button className="reset" onClick={resetGame}>Reset Game</button>
        <ConnectFourAI
          key={gameKey}
          rows={rows}
          cols={cols}
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
      <h1 className="main-menu-title">Connect Four AI</h1>
      <div className="AIMenu">
        <button onClick={toggleSize}>{cols} x {rows}</button>
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
              type="number"
              min="1"
              value={depth}
              onChange={e => setDepth(parseInt(e.target.value) || 1)}
            />
            <h3>AI Plays:</h3>
            <select value={aiPlayer} onChange={e => setAiPlayer(e.target.value)}>
              <option value="R">Red</option>
              <option value="B">Blue</option>
            </select>
          </>
        )}
        {mode === 'ava' && (
          <>
            <h3>Minimax Depth:</h3>
            <input
              type="number"
              min="1"
              value={depthMinimax}
              onChange={e => setDepthMinimax(parseInt(e.target.value) || 1)}
            />
            <h3>Alpha-Beta Depth:</h3>
            <input
              type="number"
              min="1"
              value={depthAlphaBeta}
              onChange={e => setDepthAlphaBeta(parseInt(e.target.value) || 1)}
            />
          </>
        )}
        <button onClick={startGame}>Start Game</button>
        <button style={{ float: 'left' }} onClick={onBack}>←</button>
        <button style={{ float: 'right' }} onClick={() => setInTigerMenu(true)}>→</button>
      </div>
    </div>
  );
}
