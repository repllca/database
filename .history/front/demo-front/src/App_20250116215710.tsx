import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage  from './pages/LoginPage';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <LoginPage></LoginPage>

      </header>
    </div>
  );
}

export default App;
