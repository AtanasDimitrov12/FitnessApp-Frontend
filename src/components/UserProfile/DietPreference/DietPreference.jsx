import React, { useState } from 'react';
import ExistingDietPreference from './ExistingDietPreference';
import CreateDietPreference from './CreateDietPreference';
import './DietPreference.css';

const DietPreference = () => {
  const [hasPreference, setHasPreference] = useState(true); // Toggle to show if a diet preference exists

  return (
    <div className="diet-preference">
      {hasPreference ? (
        <ExistingDietPreference onCreateNew={() => setHasPreference(false)} />
      ) : (
        <CreateDietPreference onSubmit={() => setHasPreference(true)} />
      )}
    </div>
  );
};

export default DietPreference;
