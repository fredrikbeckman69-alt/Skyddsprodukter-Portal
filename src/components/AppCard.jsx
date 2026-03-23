import React from 'react';

const AppCard = ({ app }) => {
  // Extract hostname and dynamically update link based on current domain
  let finalUrl = app.url;
  let displayUrl = '';

  try {
    const u = new URL(app.url);
    const host = window.location.hostname;
    
    // If not on local IPs or localhost, and not on github.io, we assume it's a custom domain
    if (host !== 'localhost' && !host.includes('192.168.19.13') && !host.includes('github.io')) {
      // Extract base domain (e.g., portal.domain.com -> domain.com)
      const hostParts = host.split('.');
      const baseDomain = hostParts.length > 2 ? hostParts.slice(-2).join('.') : host;
      
      // Update the hardcoded nip.io URL to use the dynamic base domain
      u.hostname = u.hostname.replace('192.168.19.13.nip.io', baseDomain);
      
      // Force HTTPS for external domains
      u.protocol = 'https:';
    }
    
    finalUrl = u.toString();
    displayUrl = u.hostname + (u.pathname !== '/' ? u.pathname : '');
  } catch {
    displayUrl = app.url;
  }

  return (
    <a href={finalUrl} className="card" target="_blank" rel="noopener noreferrer">
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
