// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams(); // ✅ Use updated param name

  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* ✅ Render edit and delete components */}
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
