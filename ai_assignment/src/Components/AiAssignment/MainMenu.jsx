import React, { useState } from 'react';
import './MainMenu.css';
import './TicTacToe.css';
import TicTacToeAI from './TicTacToeAI';

export default function MainMenu() {
  const [inGame, setInGame] = useState(false);
  const [size, setSize] = useState(3);
  const [mode, setMode] = useState('hvh');
  const [algorithm, setAlgorithm] = useState('minimax');
  const [depth, setDepth] = useState(3);
  const [depthMinimax, setDepthMinimax] = useState(3);
  const [depthAlphaBeta, setDepthAlphaBeta] = useState(3);
  const [aiPlayer, setAiPlayer] = useState('X');
  const [gameKey, setGameKey] = useState(0);

  const toggleSize = () => setSize(prev => (prev === 3 ? 7 : 3));
  const resetGame = () => setGameKey(prev => prev + 1);
  const startGame = () => setInGame(true);
  const backToMenu = () => setInGame(false);

  if (!inGame) {
    return (
      <div className="main-menu">
        <h1 className="main-menu-title">Tic Tac Toe AI</h1>
        <div className="AIMenu">
          <button
            onClick={toggleSize}
            style={{ backgroundColor: size === 7 ? 'red' : undefined }}
          >
            {size} x {size}
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
              <select
                value={algorithm}
                onChange={e => setAlgorithm(e.target.value)}
              >
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
                <option value="X">X</option>
                <option value="O">O</option>
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
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="reset" onClick={resetGame}>Reset Game</button>
      <TicTacToeAI
        key={gameKey}
        size={size}
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
