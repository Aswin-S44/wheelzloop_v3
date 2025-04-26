import React from "react";
import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <div className="pulse-circle">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <h2 className="empty-title">Whoops! Nothing Here</h2>
      <p className="empty-description">
        The data you're looking for has ghosted us. Try refreshing or come back
        later.
      </p>
      <button className="empty-action">
        <span>Try Again</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM4.93 12c0-3.96 3.22-7.18 7.18-7.18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 4.93V1l4.24 4.24L12 9.41V5.7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default EmptyState;
