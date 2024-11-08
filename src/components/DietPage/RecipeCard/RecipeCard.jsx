import React from 'react';

const RecipeCard = ({ mealName, recipe }) => {
  // Replace `\r\n` with `<br />` to create line breaks for each step
  // Use regex to bold each step label (e.g., "STEP 1")
  const formattedRecipe = recipe
    .replace(/\r\n/g, '<br />') // Line breaks
    .replace(/(STEP \d+)/g, '<strong>$1</strong>'); // Bold steps

  return (
    <div className="recipe-card">
      <h2 className="recipe-title">Example Recipe for: {mealName}</h2>
      <p dangerouslySetInnerHTML={{ __html: formattedRecipe }}></p>
    </div>
  );
};

export default RecipeCard;
