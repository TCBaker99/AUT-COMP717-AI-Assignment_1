
import React, { useState } from 'react';
import './MainMenu.css';
import './TicTacToe.css';
import TicTacToeAI from './TicTacToeAI';
import NimMenu from './NimMenu';
import ConnectFourAI from './ConnectFourAI';
import ConnectFourMenu from './ConnectFourMenu';

export default function MainMenu() {
  const [inGame, setInGame] = useState(false);
  const [inNimMenu, setInNimMenu] = useState(false);
  const [inConnectFourMenu, setInConnectFourMenu] = useState(false);
  const [game, setGame] = useState('tictactoe');
  const [size, setSize] = useState(3);
  const [mode, setMode] = useState('hvh');
  const [algorithm, setAlgorithm] = useState('minimax');
  const [depth, setDepth] = useState(3);
  const [depthMinimax, setDepthMinimax] = useState(3);
  const [depthAlphaBeta, setDepthAlphaBeta] = useState(3);
  const [aiPlayer, setAiPlayer] = useState('X');
  const [gameKey, setGameKey] = useState(0);

  const toggleSize = () => setSize(prev => game === 'connect4' ? (prev === 5 ? 8 : 5) : (prev === 3 ? 7 : 3));
  const resetGame = () => setGameKey(prev => prev + 1);
  const startGame = () => setInGame(true);
  const backToMenu = () => setInGame(false);

  if (inNimMenu) return <NimMenu onBack={() => setInNimMenu(false)} />;
  if (inConnectFourMenu) return <ConnectFourMenu onBack={() => setInConnectFourMenu(false)} />;

  if (!inGame) {
    return (
      <div className="main-menu">
        <h1 className="main-menu-title">
          {game === 'connect4' ? 'Connect Four AI' : 'Tic Tac Toe AI'}
        </h1>
        <div className="AIMenu">
          <button onClick={toggleSize} style={{ backgroundColor: size > 5 ? 'red' : undefined }}>
            {size} x {game === 'connect4' ? (size === 5 ? 4 : 7) : size}
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
                type="number"
                min="1"
                value={depth}
                onChange={e => setDepth(parseInt(e.target.value) || 1)}
              />
              <h3>AI Plays:</h3>
              <select value={aiPlayer} onChange={e => setAiPlayer(e.target.value)}>
                <option value={game === 'connect4' ? 'R' : 'X'}>{game === 'connect4' ? 'Red' : 'X'}</option>
                <option value={game === 'connect4' ? 'B' : 'O'}>{game === 'connect4' ? 'Blue' : 'O'}</option>
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
          <button style={{ float: 'left' }} onClick={() => setInNimMenu(true)}>←</button>
          <button style={{ float: 'right' }} onClick={() => {
            setGame(game === 'tictactoe' ? 'connect4' : 'tictactoe');
            setSize(game === 'tictactoe' ? 5 : 3);
            setAiPlayer(game === 'tictactoe' ? 'R' : 'X');
          }}>→</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="reset" onClick={resetGame}>Reset Game</button>
      {game === 'connect4' ? (
        <ConnectFourAI
          key={gameKey}
          rows={size === 5 ? 4 : 7}
          cols={size}
          mode={mode}
          algorithm={algorithm}
          depth={depth}
          depthMinimax={depthMinimax}
          depthAlphaBeta={depthAlphaBeta}
          aiPlayer={aiPlayer}
          onBackToMenu={backToMenu}
        />
      ) : (
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
      )}
    </div>
  );
}
