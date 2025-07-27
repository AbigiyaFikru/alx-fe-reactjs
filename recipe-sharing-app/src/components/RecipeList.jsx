import useRecipeStore from '../stores/recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one to get started!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipes/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description.substring(0, 100)}...</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
