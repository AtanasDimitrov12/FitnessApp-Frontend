import React, { useState } from 'react';
import './Progress.css';
import { createProgressNote } from '../../../repositories/ProgressNoteRepo';

const CreateProgressNote = ({ userId, onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('User ID is required to create a progress note.');
      return;
    }

    console.log("User Id: " + userId);

    const progressNote = {
      userId,
      weight: parseFloat(weight),
      note,
      date: new Date().toISOString().split('T')[0],
    };

    setLoading(true);
    setError(null);

    try {
      const createdNote = await createProgressNote(progressNote);
      if (createdNote) {
        onSubmit(createdNote); // Pass the new note back to the parent
        setWeight('');
        setNote('');
      } else {
        setError('Failed to create progress note. Please try again.');
      }
    } catch (err) {
      console.error('Error creating progress note:', err);
      setError('An error occurred while creating the progress note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-progress-note">
      <h3>Create New Progress Note</h3>
      {error && <p className="error">{error}</p>}
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
            disabled={loading}
          />
          <span className="weight-unit">kg</span>
        </div>
        <label>Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateProgressNote;
