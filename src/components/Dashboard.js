import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard({ user, onLogout, onJoinGame, onAddMoney }) {
  const [gameRooms] = useState([
    { id: 1, name: 'شروعاتوں والا کمرہ', minBet: 100, maxBet: 1000, players: 2 },
    { id: 2, name: 'معیاری کمرہ', minBet: 500, maxBet: 5000, players: 1 },
    { id: 3, name: 'اعلیٰ داؤ', minBet: 1000, maxBet: 10000, players: 3 },
    { id: 4, name: 'VIP کمرہ', minBet: 5000, maxBet: 50000, players: 0 },
  ]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🎰 ٹین پتی</h1>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="balance">💰 {user.balance} روپے</span>
          <button onClick={onAddMoney} className="add-money-btn">+ رقم</button>
          <button onClick={onLogout} className="logout-btn">لاگ آؤٹ</button>
        </div>
      </header>

      <div className="dashboard-content">
        <h2>دستیاب گیم کمرے</h2>
        <div className="rooms-grid">
          {gameRooms.map((room) => (
            <div key={room.id} className="room-card">
              <h3>{room.name}</h3>
              <div className="room-info">
                <p>کم: <span>{room.minBet} روپے</span></p>
                <p>زیادہ: <span>{room.maxBet} روپے</span></p>
                <p>کھلاڑی: <span>{room.players}/6</span></p>
              </div>
              <button 
                onClick={() => onJoinGame(room)}
                className="join-btn"
              >
                شامل ہوں
              </button>
            </div>
          ))}
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>ذمہ داری سے کھیلیں! لطف اٹھائیں!</p>
      </footer>
    </div>
  );
}

export default Dashboard;