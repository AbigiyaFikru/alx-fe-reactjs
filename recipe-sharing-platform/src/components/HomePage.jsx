import { Link } from 'react-router-dom';
import recipes from '../data/recipes.json';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Popular Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <Link 
            to={`/recipe/${recipe.id}`} 
            key={recipe.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <div className="flex justify-between text-gray-600">
                <span>⏱️ {recipe.prepTime} mins</span>
                <span>⭐ {recipe.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
