import React, { useState } from 'react';
import WeightStatisticChart from './WeightStatisticChart';
import CreateProgressNote from './CreateProgressNote';
import ProgressHistory from './ProgressHistory';
import './Progress.css';

const ProgressNote = () => {
  const [progressNotes, setProgressNotes] = useState([
    { date: '2024-11-02', weight: 77, note: 'I am feeling very good' },
    { date: '2024-10-22', weight: 79, note: 'I feel the progress' },
    { date: '2024-10-15', weight: 80, note: 'The program works very well' },
    { date: '2024-10-01', weight: 81, note: 'Noticing more energy throughout the day' },
    { date: '2024-09-20', weight: 82, note: 'Sticking to the routine is paying off' },
    { date: '2024-09-10', weight: 83, note: 'Slight drop in weight, feeling stronger' },
    { date: '2024-09-01', weight: 85, note: 'Increased stamina and endurance' },
    { date: '2024-08-20', weight: 86, note: 'Good progress this week' },
    { date: '2024-08-10', weight: 88, note: 'Starting to see visible changes' },
    { date: '2024-08-01', weight: 90, note: 'Initial weigh-in, excited to start!' }
  ]);

  const addProgressNote = (newNote) => {
    setProgressNotes([newNote, ...progressNotes]);
  };

  return (
    <div className="progress-page">
      <WeightStatisticChart data={progressNotes} />
      <div className="progress-bottom">
        <CreateProgressNote onSubmit={addProgressNote} />
        <ProgressHistory notes={progressNotes} />
      </div>
    </div>
  );
};

export default ProgressNote;
