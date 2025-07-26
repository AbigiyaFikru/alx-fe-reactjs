import useRecipeStore from '../stores/recipeStore';

export default function RecipeList() {
  const { recipes } = useRecipeStore();

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one to get started!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
