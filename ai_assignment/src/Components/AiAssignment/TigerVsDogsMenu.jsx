
import React, { useState } from 'react';
import './MainMenu.css';
import TigerVsDogsAI from './TigerVsDogsAI';

export default function TigerVsDogsMenu({ onBack }) {
  const [inGame, setInGame] = useState(false);
  const [mode, setMode] = useState('hvh');
  const [aiPlayer, setAiPlayer] = useState('T');
  const [depthTiger, setDepthTiger] = useState(3);
  const [depthDogs, setDepthDogs] = useState(3);
  const [aiTypeTiger, setAiTypeTiger] = useState('alphabeta');
  const [aiTypeDogs, setAiTypeDogs] = useState('minimax');

  const startGame = () => setInGame(true);
  const resetGame = () => setInGame(false);

  if (inGame) {
    return (
      <div className="container">
        <button className="reset" onClick={resetGame}>Reset Game</button>
        <TigerVsDogsAI
          mode={mode}
          aiPlayer={aiPlayer}
          depthTiger={depthTiger}
          depthDogs={depthDogs}
          aiTypeTiger={aiTypeTiger}
          aiTypeDogs={aiTypeDogs}
          onBackToMenu={resetGame}
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
            <h3>AI Type:</h3>
            <select value={aiTypeTiger} onChange={e => setAiTypeTiger(e.target.value)}>
              <option value="minimax">Minimax</option>
              <option value="alphabeta">Alpha-Beta</option>
            </select>

            <h3>AI Plays:</h3>
            <select value={aiPlayer} onChange={e => setAiPlayer(e.target.value)}>
              <option value="T">Tiger</option>
              <option value="D">Dogs</option>
            </select>

            <h3>Depth:</h3>
            <input
              type="number" max="10"
              min="1"
              value={aiPlayer === 'T' ? depthTiger : depthDogs}
              onChange={e => {
                const value = parseInt(e.target.value) || 1;
                if (aiPlayer === 'T') setDepthTiger(value);
                else setDepthDogs(value);
              }}
            />
          </>
        )}

        {mode === 'aia' && (
          <>
            <h3>AI Type (Tiger):</h3>
            <select value={aiTypeTiger} onChange={e => setAiTypeTiger(e.target.value)}>
              <option value="minimax">Minimax</option>
              <option value="alphabeta">Alpha-Beta</option>
            </select>

            <h3>AI Type (Dogs):</h3>
            <select value={aiTypeDogs} onChange={e => setAiTypeDogs(e.target.value)}>
              <option value="minimax">Minimax</option>
              <option value="alphabeta">Alpha-Beta</option>
            </select>

            <h3>Depth (Tiger):</h3>
            <input type="number" max="10" min="1" value={depthTiger} onChange={e => setDepthTiger(parseInt(e.target.value) || 1)} />
            <h3>Depth (Dogs):</h3>
            <input type="number" max="10" min="1" value={depthDogs} onChange={e => setDepthDogs(parseInt(e.target.value) || 1)} />
          </>
        )}

        <button onClick={startGame}>Start Game</button>
        <button style={{ float: 'left' }} onClick={onBack}>←</button>
        <button style={{ float: 'right' }} disabled>→</button>
      </div>
    </div>
  );
}
