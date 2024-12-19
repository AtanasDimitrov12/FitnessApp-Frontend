import React, { useState } from 'react';
import './AddTags.css';

// Enums for Fitness Goals, Levels, and Styles
const FITNESS_GOALS = ['WEIGHT_LOSS', 'MUSCLE_GAIN', 'MAINTENANCE'];
const FITNESS_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const TRAINING_STYLES = ['STRENGTH', 'ENDURANCE'];

const AddTags = ({ onSave }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);

  // Toggle selection logic for tags
  const handleToggleTag = (tag, selectedTags, setSelectedTags) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDone = () => {
    onSave({
      fitnessGoals: selectedGoals,
      fitnessLevels: selectedLevels,
      trainingStyles: selectedStyles,
    });
  };

  // Render Buttons for Tags
  const renderTagButtons = (tags, selectedTags, setSelectedTags) => (
    <div className="tag-buttons">
      {tags.map((tag) => (
        <button
          key={tag}
          className={selectedTags.includes(tag) ? 'tag-button selected' : 'tag-button'}
          onClick={() => handleToggleTag(tag, selectedTags, setSelectedTags)}
        >
          {tag}
        </button>
      ))}
    </div>
  );

  return (
    <div className="add-tags-page">
      <h2>Add Tags to Workout</h2>
      
      <div className="tag-section">
        <h3>Fitness Goals</h3>
        {renderTagButtons(FITNESS_GOALS, selectedGoals, setSelectedGoals)}
      </div>

      <div className="tag-section">
        <h3>Fitness Levels</h3>
        {renderTagButtons(FITNESS_LEVELS, selectedLevels, setSelectedLevels)}
      </div>

      <div className="tag-section">
        <h3>Training Styles</h3>
        {renderTagButtons(TRAINING_STYLES, selectedStyles, setSelectedStyles)}
      </div>

      <button onClick={handleDone} className="done-button">
        Done
      </button>
    </div>
  );
};

export default AddTags;