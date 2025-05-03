import React, { useState } from 'react';
import './MainMenu.css';
import ConnectFourMenu from './ConnectFourMenu';
import MainMenu from './MainMenu';

export default function NimMenu({ onBack }) {
  const [inConnectFourMenu, setInConnectFourMenu] = useState(false);

  if (inConnectFourMenu) return <ConnectFourMenu onBack={() => setInConnectFourMenu(false)} />;

  return (
    <div className="main-menu">
      <h1 className="main-menu-title">Nim (WIP)</h1>
      <div className="AIMenu">
        <button style={{ float: 'left' }} onClick={onBack}>←</button>
        <button style={{ float: 'right' }} onClick={() => setInConnectFourMenu(true)}>→</button>
      </div>
    </div>
  );
}
