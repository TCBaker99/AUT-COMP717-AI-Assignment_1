import React, { useState } from 'react';
import TicTacToeGame from './TicTacToeAI';

export default function MainMenu() {
  const [started, setStarted] = useState(false);
  const [settings, setSettings] = useState({
    size: 3,
    depth: 3,
    algorithm: 'minimax',
    aiPlayer: 'X',
  });

  function handleStart() {
    setStarted(true);
  }

  if (!started) {
    return (
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
        <h1>Tic Tac Toe AI</h1>
        <div>
          <label>
            Board Size:
            <select
              value={settings.size}
              onChange={e => setSettings({ ...settings, size: parseInt(e.target.value) })}
            >
              <option value={3}>3x3</option>
              <option value={7}>7x7</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Algorithm:
            <select
              value={settings.algorithm}
              onChange={e => setSettings({ ...settings, algorithm: e.target.value })}
            >
              <option value="minimax">Minimax</option>
              <option value="alphabeta">Alpha-Beta</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Depth:
            <input
              type="number"
              min="1"
              value={settings.depth}
              onChange={e => setSettings({ ...settings, depth: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <div>
          <label>
            AI plays:
            <select
              value={settings.aiPlayer}
              onChange={e => setSettings({ ...settings, aiPlayer: e.target.value })}
            >
              <option value="X">X</option>
              <option value="O">O</option>
            </select>
          </label>
        </div>
        <button onClick={handleStart} style={{ marginTop: '1rem' }}>
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => setStarted(false)}>Back to Menu</button>
      <TicTacToeGame
        size={settings.size}
        depth={settings.depth}
        algorithm={settings.algorithm}
        aiPlayer={settings.aiPlayer}
      />
    </div>
  );
}
