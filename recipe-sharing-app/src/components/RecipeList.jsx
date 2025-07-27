// components/RecipeList.jsx
import React from 'react';
import { useRecipeStore } from '../stores/recipeStore';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes());
  
  return (
    <div className="recipe-list">
      {filteredRecipes.length === 0 ? (
        <div className="no-results">
          <p>No recipes match your search criteria.</p>
        </div>
      ) : (
        filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default RecipeList;
