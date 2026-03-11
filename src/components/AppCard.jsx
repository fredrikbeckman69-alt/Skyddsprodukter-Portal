import React from 'react';

// Simple SVG icon mapper to keep dependencies low
const IconMap = ({ name }) => {
  switch (name) {
    case 'terminal':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      );
    case 'activity':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      );
    case 'user':
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
  }
};

const AppCard = ({ app }) => {
  return (
    <a href={app.url} className="card" target="_blank" rel="noopener noreferrer">
      <div className="card-icon">
        <IconMap name={app.icon} />
      </div>
      
      <div className="card-title">
        {app.name}
        <span className="card-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
      
      <div className="card-desc">
        {app.description}
      </div>
      
      <div className="card-footer">
        <div className="card-url" title={app.url}>
          {app.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    </a>
  );
};

export default AppCard;
