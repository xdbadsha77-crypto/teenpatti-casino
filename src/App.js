import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GameRoom from './components/GameRoom';
import Payment from './components/Payment';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [gameRoom, setGameRoom] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('login');
  };

  const handleJoinGame = (room) => {
    setGameRoom(room);
    setCurrentPage('game');
  };

  const handleAddMoney = () => {
    setCurrentPage('payment');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setGameRoom(null);
  };

  return (
    <div className="app">
      {currentPage === 'login' && <Login onLogin={handleLogin} />}
      {currentPage === 'dashboard' && (
        <Dashboard 
          user={user} 
          onLogout={handleLogout}
          onJoinGame={handleJoinGame}
          onAddMoney={handleAddMoney}
        />
      )}
      {currentPage === 'game' && (
        <GameRoom 
          user={user} 
          room={gameRoom}
          onBack={handleBackToDashboard}
        />
      )}
      {currentPage === 'payment' && (
        <Payment 
          user={user}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;