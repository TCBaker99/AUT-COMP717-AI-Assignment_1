
import React from 'react';
import './MainMenu.css';

export default function ConnectFourMenu({ onBack }) {
  return (
    <div className="main-menu">
      <h1 className="main-menu-title">Connect Four (WIP)</h1>
      <div className="AIMenu">
        <button style={{ float: 'left' }} onClick={onBack}>←</button>
        <button style={{ float: 'right' }} onClick={() => alert("More games coming soon!")}>→</button>
      </div>
    </div>
  );
}
