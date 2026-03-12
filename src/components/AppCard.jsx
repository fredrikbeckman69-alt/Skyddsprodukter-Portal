import React from 'react';

// Using base path from Vite to ensure GH Pages relative links work
const BASE_PATH = import.meta.env.BASE_URL || '/';

const AppCard = ({ app }) => {
  return (
    <a href={app.url} className="card" target="_blank" rel="noopener noreferrer">
      
      <div className="card-image-wrapper">
        <img 
          src={`${app.image}`} 
          alt={`${app.name} preview`} 
          className="card-image" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.style.display = 'none';
            // Optional: fallback to an icon or solid color
          }}
        />
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
