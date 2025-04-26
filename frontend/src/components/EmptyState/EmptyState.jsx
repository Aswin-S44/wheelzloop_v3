import React from "react";
import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">🚫</div>
      <p className="empty-title">No Data Available</p>
      <p className="empty-description">
        There’s nothing to display here right now. Check back later or try a
        different option.
      </p>
    </div>
  );
}

export default EmptyState;
