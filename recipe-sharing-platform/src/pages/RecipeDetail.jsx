import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import recipes from '../data/recipes.json'; // Sample data

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = recipes.find(recipe => recipe.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Recipe Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <span>⏱️ {recipe.prepTime} mins</span>
          <span>🍽️ {recipe.servings} servings</span>
          <span>⭐ {recipe.rating}/5</span>
        </div>
      </div>

      {/* Recipe Image */}
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-96 object-cover rounded-lg mb-8"
      />

      {/* Ingredients & Instructions */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
