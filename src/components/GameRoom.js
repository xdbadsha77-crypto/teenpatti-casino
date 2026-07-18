import React, { useState, useEffect } from 'react';
import './GameRoom.css';

function GameRoom({ user, room, onBack }) {
  const [gameState, setGameState] = useState('betting');
  const [pot, setPot] = useState(0);
  const [playerBet, setPlayerBet] = useState(0);
  const [cards, setCards] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newPlayers = [
      { id: 1, name: 'آپ', balance: user.balance, bet: 0, folded: false },
      { id: 2, name: 'کھلاڑی 2', balance: 5000, bet: 0, folded: false },
      { id: 3, name: 'کھلاڑی 3', balance: 7000, bet: 0, folded: false },
    ];
    setPlayers(newPlayers);
    dealCards();
  };

  const dealCards = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    const getRandomCard = () => {
      return ranks[Math.floor(Math.random() * ranks.length)] + 
             suits[Math.floor(Math.random() * suits.length)];
    };

    setCards([getRandomCard(), getRandomCard(), getRandomCard()]);
    setGameState('betting');
  };

  const handleBet = (amount) => {
    if (amount > user.balance - playerBet) {
      alert('ناکافی رقم!');
      return;
    }
    setPlayerBet(playerBet + amount);
    setPot(pot + amount);
    
    setTimeout(() => {
      const aiPlayers = players.slice(1);
      aiPlayers.forEach((player) => {
        const aiBet = Math.floor(Math.random() * 500) + 100;
        setPot(prev => prev + aiBet);
      });
    }, 500);
  };

  const handleCall = () => {
    const maxBet = Math.max(...players.map(p => p.bet || 0));
    const callAmount = maxBet - playerBet;
    handleBet(callAmount);
  };

  const handleRaise = () => {
    const raiseAmount = 500;
    handleBet(raiseAmount);
  };

  const handleFold = () => {
    const updatedPlayers = [...players];
    updatedPlayers[0].folded = true;
    setPlayers(updatedPlayers);
    setGameState('folded');
  };

  const handleShowCards = () => {
    setGameState('result');
  };

  const handleNextRound = () => {
    setCurrentRound(currentRound + 1);
    setPlayerBet(0);
    setPot(0);
    dealCards();
  };

  return (
    <div className="game-room">
      <div className="game-header">
        <h2>{room.name}</h2>
        <div className="game-info">
          <span className="your-balance">رقم: {user.balance - playerBet}</span>
          <span className="pot">پوٹ: {pot}</span>
          <span className="round">R{currentRound}</span>
        </div>
        <button onClick={onBack} className="back-btn">← وापس</button>
      </div>

      <div className="game-table">
        <div className="players-section">
          {players.map((player, index) => (
            <div key={player.id} className={`player ${index === 0 ? 'current-player' : ''}`}>
              <div className="player-name">{player.name}</div>
              <div className="player-balance">{player.balance} روپے</div>
              {player.bet > 0 && <div className="player-bet">د: {player.bet}</div>}
              {player.folded && <div className="player-folded">ہار</div>}
            </div>
          ))}
        </div>

        <div className="cards-section">
          {gameState !== 'folded' && cards && (
            <div className="your-cards">
              <h3>آپ کے کارڈ</h3>
              <div className="cards">
                {cards.map((card, index) => (
                  <div key={index} className="card">
                    {card}
                  </div>
                ))}
              </div>
            </div>
          )}

          {gameState === 'result' && (
            <div className="result">
              <h3>نتیجہ</h3>
              <p>آپ نے {pot} روپے جیتے! 🎉</p>
            </div>
          )}
        </div>

        <div className="betting-section">
          {gameState === 'betting' && (
            <div className="betting-buttons">
              <button onClick={() => handleBet(100)} className="bet-btn">100 داؤ</button>
              <button onClick={() => handleBet(500)} className="bet-btn">500 داؤ</button>
              <button onClick={handleCall} className="call-btn">کال</button>
              <button onClick={handleRaise} className="raise-btn">بڑھائیں</button>
              <button onClick={handleFold} className="fold-btn">ہار</button>
              <button onClick={handleShowCards} className="show-btn">دیکھیں</button>
            </div>
          )}

          {gameState === 'result' && (
            <button onClick={handleNextRound} className="next-round-btn">اگلا</button>
          )}

          {gameState === 'folded' && (
            <div className="folded-message">
              <p>آپ نے ہار مان لی! 😞</p>
              <button onClick={handleNextRound} className="next-round-btn">اگلا</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameRoom;