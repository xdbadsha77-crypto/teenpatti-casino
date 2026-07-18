import React, { useState } from 'react';
import './Payment.css';

function Payment({ user, onBack }) {
  const [amount, setAmount] = useState('');
  const [easyPaisaNumber] = useState('03147231905');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (amount) {
        setSuccess(true);
        setLoading(false);
        
        setTimeout(() => {
          onBack();
        }, 3000);
      }
    }, 2000);
  };

  if (success) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="success-message">
            <h2>✅ ادائیگی کامیاب!</h2>
            <p>{amount} روپے آپ کے اکاؤنٹ میں شامل ہو گئے</p>
            <p>EasyPaisa: {easyPaisaNumber}</p>
            <p>ڈیش بورڈ پر واپس جا رہے ہیں...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>💳 رقم شامل کریں</h1>
        <p className="subtitle">موجودہ رقم: {user.balance} روپے</p>

        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>ادائیگی کا طریقہ</label>
            <select>
              <option value="easypaisa">EasyPaisa</option>
            </select>
          </div>

          <div className="form-group">
            <label>EasyPaisa نمبر</label>
            <input
              type="tel"
              value={easyPaisaNumber}
              disabled
              className="disabled-input"
            />
            <small>اس نمبر پر رقم بھیجیں</small>
          </div>

          <div className="form-group">
            <label>شامل کرنے والی رقم (روپے)</label>
            <input
              type="number"
              placeholder="رقم درج کریں"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100"
              max="100000"
              required
            />
            <small>کم سے کم: 100 روپے | زیادہ سے زیادہ: 100,000 روپے</small>
          </div>

          <div className="amount-presets">
            <button type="button" onClick={() => setAmount('100')} className="preset-btn">100</button>
            <button type="button" onClick={() => setAmount('500')} className="preset-btn">500</button>
            <button type="button" onClick={() => setAmount('1000')} className="preset-btn">1000</button>
            <button type="button" onClick={() => setAmount('5000')} className="preset-btn">5000</button>
          </div>

          <div className="fee-info">
            <p>کل: {amount} روپے + 0 روپے فیس = <strong>{amount} روپے</strong></p>
          </div>

          <button type="submit" className="pay-btn" disabled={loading}>
            {loading ? 'پروسیس ہو رہا ہے...' : `EasyPaisa سے ${amount} روپے ادا کریں`}
          </button>
        </form>

        <button onClick={onBack} className="cancel-btn">منسوخ کریں</button>

        <div className="security-info">
          <h4>🔒 سیکیورٹی کی معلومات</h4>
          <p>• آپ کی ادائیگی محفوظ اور encrypted ہے</p>
          <p>• EasyPaisa ادائیگی گیٹ وے PCI DSS کے مطابق ہے</p>
          <p>• اپنا EasyPaisa PIN کسی کو نہ بتائیں</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;