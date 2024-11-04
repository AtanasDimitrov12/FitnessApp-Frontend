import React from 'react';
import './Progress.css';

const ProgressHistory = ({ notes }) => {
  return (
    <div className="progress-history">
      <h3>History</h3>
      <div className="history-list">
        {notes.map((note, index) => (
          <p key={index}>
            <strong>{index + 1}. {note.date} - {note.weight}kg -</strong> {note.note}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProgressHistory;