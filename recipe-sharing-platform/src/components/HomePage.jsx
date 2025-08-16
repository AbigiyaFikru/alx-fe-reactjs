import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verify React Router installation
  useEffect(() => {
    if (!useNavigate || !Link) {
      console.error('React Router components not found!');
    }
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Navigation check: Error occurred -', error.message);
        navigate('/error', { state: { error: error.message } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [navigate]);

  const handleCardClick = (recipeId) => {
    console.log(`Navigation check: Attempting to navigate to recipe ${recipeId}`);
    // Programmatic navigation test
    navigate(`/recipe/${recipeId}`, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Recipe Collection</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <div 
            key={recipe.id}
            onClick={() => handleCardClick(recipe.id)}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            data-testid="recipe-card"
          >
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{recipe.summary}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>⏱️ {recipe.cookingTime}</span>
                <span>🍽️ Serves {recipe.servings}</span>
              </div>
              <Link 
                to={`/recipe/${recipe.id}`}
                className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Link navigation check: Working properly');
                }}
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
