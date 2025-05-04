
import React, { useState } from 'react';
import './MainMenu.css';
import TigerVsDogsAI from './TigerVsDogsAI';

export default function TigerVsDogsMenu({ onBack }) {
  const [inGame, setInGame] = useState(false);
  const [depth, setDepth] = useState(3);
  const [aiPlayer, setAiPlayer] = useState('T');
  const [mode, setMode] = useState('hvh');

  const startGame = () => setInGame(true);
  const resetGame = () => setInGame(false);

  if (inGame) {
    return (
      <div className="container">
        <button className="reset" onClick={resetGame}>Reset Game</button>
        <TigerVsDogsAI
          depth={depth}
          aiPlayer={aiPlayer}
          mode={mode}
          onBackToMenu={() => setInGame(false)}
        />
      </div>
    );
  }

  return (
    <div className="main-menu">
      <h1 className="main-menu-title">Tiger vs Dogs AI</h1>
      <div className="AIMenu">
        <h3>Mode:</h3>
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="hvh">Human vs Human</option>
          <option value="hva">Human vs AI</option>
<option value="aia">AI vs AI</option>
        </select>
        {mode === 'hva' && (
          <>
            <h3>Depth:</h3>
            <input
              type="number"
              min="1"
              value={depth}
              onChange={e => setDepth(parseInt(e.target.value) || 1)}
            />
            <h3>AI Plays:</h3>
            <select value={aiPlayer} onChange={e => setAiPlayer(e.target.value)}>
              <option value="T">Tiger</option>
              <option value="D">Dogs</option>
            </select>
          </>
        )}
        <button onClick={startGame}>Start Game</button>
        <button style={{ float: 'left' }} onClick={onBack}>←</button>
        {/* Right arrow (future extension placeholder) */}
        <button style={{ float: 'right' }} disabled>→</button>
      </div>
    </div>
  );
}
