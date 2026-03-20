import React from 'react';

const AppCard = ({ app }) => {
  // Extract hostname for display
  let displayUrl = '';
  try {
    const u = new URL(app.url);
    displayUrl = u.hostname + (u.pathname !== '/' ? u.pathname : '');
  } catch {
    displayUrl = app.url;
  }

  return (
    <a href={app.url} className="card" target="_blank" rel="noopener noreferrer">
      <div className="card-image-wrapper">
        <img
          src={app.image}
          alt={`${app.name} preview`}
          className="card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      </div>

      <div className="card-body">
        <div className="card-title">
          {app.name}
          <span className="card-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
        <div className="card-desc">{app.description}</div>
      </div>

      <div className="card-footer">
        <span className="card-url">{displayUrl}</span>
      </div>
    </a>
  );
};

export default AppCard;
