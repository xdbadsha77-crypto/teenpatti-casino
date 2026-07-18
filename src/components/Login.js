import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: isSignup ? name : email.split('@')[0],
        balance: 5000,
        phone: '',
        easyPaisaAccount: '03147231905'
      };
      onLogin(userData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🎰 ٹین پتی کیسینو</h1>
        <h2>{isSignup ? 'اکاؤنٹ بنائیں' : 'لاگ ان کریں'}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="مکمل نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="ای میل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="پاس ورڈ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'لوڈ ہو رہا ہے...' : isSignup ? 'سائن اپ' : 'لاگ ا��'}
          </button>
        </form>

        <p className="toggle-text">
          {isSignup ? 'پہلے سے اکاؤنٹ ہے؟ ' : 'اکاؤنٹ نہیں ہے؟ '}
          <span onClick={() => setIsSignup(!isSignup)} className="toggle-link">
            {isSignup ? 'لاگ ان' : 'سائن اپ'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;