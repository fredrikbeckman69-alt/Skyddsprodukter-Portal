import React, { useState, useEffect, useRef } from 'react';
import AppCard from './components/AppCard';
import apps from './data/apps.json';

const PASSCODE = '6809136044';
const PIN_LENGTH = PASSCODE.length;

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [digits, setDigits] = useState(Array(PIN_LENGTH).fill(''));
  const [shaking, setShaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (localStorage.getItem('portal_auth') === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  // Focus first box on mount
  useEffect(() => {
    if (!isAuthorized && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isAuthorized]);

  const handleDigitChange = (index, value) => {
    // Accept only single digit
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setShowError(false);

    if (digit && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all digits filled
    if (digit && index === PIN_LENGTH - 1) {
      const code = next.join('');
      if (code === PASSCODE) {
        setIsAuthorized(true);
        localStorage.setItem('portal_auth', 'true');
      } else {
        setShaking(true);
        setShowError(true);
        setTimeout(() => {
          setShaking(false);
          setDigits(Array(PIN_LENGTH).fill(''));
          inputRefs.current[0]?.focus();
        }, 500);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, PIN_LENGTH);
    if (!pasted) return;
    const next = Array(PIN_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setDigits(next);
    if (pasted.length === PIN_LENGTH) {
      if (pasted === PASSCODE) {
        setIsAuthorized(true);
        localStorage.setItem('portal_auth', 'true');
      } else {
        setShaking(true);
        setShowError(true);
        setTimeout(() => {
          setShaking(false);
          setDigits(Array(PIN_LENGTH).fill(''));
          inputRefs.current[0]?.focus();
        }, 500);
      }
    } else {
      inputRefs.current[Math.min(pasted.length, PIN_LENGTH - 1)]?.focus();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portal_auth');
    setIsAuthorized(false);
    setDigits(Array(PIN_LENGTH).fill(''));
  };

  if (!isAuthorized) {
    return (
      <>
        <div className="bg-ambient" />
        <div className="lock-screen">
          <p className="lock-text">
            Enter J to embedd the bird for the sake of all humanity.
          </p>

          <div className={`pin-row ${shaking ? 'shake' : ''}`}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className={`pin-box ${d ? 'filled' : ''}`}
                autoComplete="off"
              />
            ))}
          </div>

          {showError && (
            <p className="lock-error">Incorrect code</p>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-ambient" />
      <button className="portal-logout" onClick={handleLogout}>
        Logga ut
      </button>
      <div className="portal">
        <header className="portal-header">
          <h1 className="portal-title">System Portal</h1>
          <p className="portal-subtitle">
            Centraliserad åtkomst till serverns webbapplikationer och tjänster.
          </p>
        </header>

        <main className="portal-grid">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
