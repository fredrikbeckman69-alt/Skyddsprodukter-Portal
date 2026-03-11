import React, { useState, useEffect } from 'react';
import AppCard from './components/AppCard';
import apps from './data/apps.json';

const PASSCODE = '6809265926';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [errorAnimation, setErrorAnimation] = useState(false);

  // Check if user is already authenticated on initial load
  useEffect(() => {
    const savedAuth = localStorage.getItem('portal_auth');
    if (savedAuth === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCode === PASSCODE) {
      setIsAuthorized(true);
      localStorage.setItem('portal_auth', 'true');
    } else {
      setErrorAnimation(true);
      setTimeout(() => setErrorAnimation(false), 500);
      setInputCode('');
    }
  };

  if (!isAuthorized) {
    return (
      <>
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        
        <div className="auth-container">
          <div className={`auth-card ${errorAnimation ? 'shake' : ''}`}>
            <p className="auth-text">Lenita is embedding the bird for the sake of all humanity.</p>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="password"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="auth-input"
                autoFocus
              />
              <button type="submit" className="auth-button">Unlock</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="app-container">
        <header className="header">
          <h1 className="title">System Portal</h1>
          <p className="subtitle">
            Centraliserad åtkomst till serverns webbapplikationer och tjänster.
          </p>
        </header>

        <main className="grid">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
