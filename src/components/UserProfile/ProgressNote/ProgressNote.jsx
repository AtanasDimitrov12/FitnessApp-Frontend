import React, { useState, useEffect } from 'react';
import WeightStatisticChart from './WeightStatisticChart';
import CreateProgressNote from './CreateProgressNote';
import ProgressHistory from './ProgressHistory';
import { getProgressNotesByUserId, deleteProgressNote } from '../../../repositories/ProgressNoteRepo'; // Import the delete method
import './Progress.css';

const ProgressNote = ({ userId }) => {
  const [progressNotes, setProgressNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('User ID is required to fetch progress notes.');
      setLoading(false);
      return;
    }

    const fetchProgressNotes = async () => {
      setLoading(true);
      try {
        const notes = await getProgressNotesByUserId(userId);
        setProgressNotes(notes || []);
      } catch (err) {
        setError('Failed to fetch progress notes.');
        console.error('Error fetching progress notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressNotes();
  }, [userId]);

  const addProgressNote = (newNote) => {
    setProgressNotes([newNote, ...progressNotes]);
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteProgressNote(noteId); // Call the backend to delete the note
      setProgressNotes(progressNotes.filter((note) => note.id !== noteId)); // Update state to remove the deleted note
    } catch (err) {
      console.error('Failed to delete progress note:', err);
      setError('Failed to delete progress note.');
    }
  };

  if (loading) {
    return <p>Loading your progress notes...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="progress-page">
      <WeightStatisticChart data={progressNotes} />
      <div className="progress-bottom">
        <CreateProgressNote userId={userId} onSubmit={addProgressNote} />
        <ProgressHistory notes={progressNotes} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ProgressNote;
