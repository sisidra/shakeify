import React from 'react';
import './App.css';
import { Shakeify } from './Shakeify';

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <p>
          Shake the World!
        </p>
      </header>
      <div className="app-body">
        <Shakeify />
      </div>
    </div>
  );
}