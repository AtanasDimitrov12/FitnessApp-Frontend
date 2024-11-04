import React, { useState } from 'react';
import './Progress.css';

const CreateProgressNote = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString(); // Auto-generate date
    onSubmit({ date, weight, note });
    setWeight('');
    setNote('');
  };

  return (
    <div className="create-progress-note">
      <h3>Create New Progress Note</h3>
      <form onSubmit={handleSubmit}>
        <label>Weight:</label>
        <div className="weight-input-container">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="40"
            max="200"
            required
          />
          <span className="weight-unit">kg</span>
        </div>
        <label>Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProgressNote;
