import { useParams } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state => 
    state.getRecipeById(Number(id))
  );

  if (!recipe) {
    return (
      <div className="error">
        <h2>Recipe not found</h2>
        <p>No recipe exists with ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <div className="action-buttons">
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;
