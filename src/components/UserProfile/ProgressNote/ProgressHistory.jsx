import React from 'react';
import './Progress.css';

const ProgressHistory = ({ notes, handleDelete }) => {
  return (
    <div className="progress-history">
      <h3>History</h3>
      <div className="history-list">
        {notes.map((note, index) => (
          <div key={index} className="history-item">
            <p>
              <strong>{index + 1}. {note.date} - {note.weight}kg -</strong> {note.note}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressHistory;
