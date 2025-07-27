import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  // State
  recipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',
  filters: {
    ingredients: [],
    maxTime: null,
    minRating: null
  },

  // Recipe CRUD Actions
  setRecipes: (recipes) => set({ recipes }), // The required action
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe]
  })),
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),

  // Search and Filter Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilter: (filterName, value) => set((state) => ({
    filters: { ...state.filters, [filterName]: value }
  })),

  // Favorites Actions
  addFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.includes(recipeId)
      ? state.favorites
      : [...state.favorites, recipeId]
  })),
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  isFavorite: (recipeId) => get().favorites.includes(recipeId),

  // Computed Values
  getFilteredRecipes: () => {
    const { recipes, searchTerm, filters } = get()
    return recipes.filter(recipe => {
      const matchesSearch = searchTerm === ''  
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesIngredients = filters.ingredients.length === 0 
        (recipe.ingredients && filters.ingredients.every(ing => 
          recipe.ingredients.includes(ing)))
      
      const matchesTime = !filters.maxTime  
        (recipe.cookingTime && recipe.cookingTime <= filters.maxTime)
      
      const matchesRating = !filters.minRating  
        (recipe.rating && recipe.rating >= filters.minRating)
      
      return matchesSearch && matchesIngredients && matchesTime && matchesRating
    })
  },

  // Recommendations
  generateRecommendations: () => set(state => {
    const { recipes, favorites } = state
    if (recipes.length === 0) return { recommendations: [] }

    if (favorites.length === 0) {
      return { 
        recommendations: [...recipes]
          .sort((a, b) => (b.rating  0) - (a.rating  0))
          .slice(0, 3) 
      }
    }

    const favoriteTags = recipes
      .filter(recipe => favorites.includes(recipe.id))
      .flatMap(recipe => recipe.tags  [])

    return {
      recommendations: recipes
        .filter(recipe => 
          !favorites.includes(recipe.id) &&
          recipe.tags?.some(tag => favoriteTags.includes(tag))
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
    }
  })
}))

export default useRecipeStore
