import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Simulate API call delay for testing
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await fetch('/data.json')
        const data = await response.json()
        setRecipes(data)
      } catch (error) {
        console.error('Error loading recipes:', error)
        navigate('/error') // Optional: Redirect to error page
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()
  }, [navigate])

  // Test navigation function
  const handleCardClick = (recipeId) => {
    console.log(`Navigating to recipe ${recipeId}`) // Verify navigation in console
    // Programmatic navigation alternative:
    // navigate(`/recipe/${recipeId}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Delicious Recipes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <div 
            key={recipe.id}
            onClick={() => handleCardClick(recipe.id)} // Navigation test
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.summary}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>⏱️ {recipe.cookingTime}</span>
                <span>🍽️ Serves {recipe.servings}</span>
              </div>
              <Link 
                to={`/recipe/${recipe.id}`}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                onClick={(e) => e.stopPropagation()} // Prevent double navigation
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
