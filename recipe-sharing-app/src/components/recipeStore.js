// recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [], // Initialized when fetching data
  searchTerm: '',
  filters: {
    ingredients: [],
    maxPrepTime: null,
    difficulty: null,
    dietaryRestrictions: []
  },
  
  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilters: (newFilters) => set({ filters: { ...get().filters, ...newFilters } }),
  resetFilters: () => set({ 
    searchTerm: '',
    filters: {
      ingredients: [],
      maxPrepTime: null,
      difficulty: null,
      dietaryRestrictions: []
    }
  }),
  
  // Computed filtered recipes
  filteredRecipes: () => {
    const { recipes, searchTerm, filters } = get();
    
    return recipes.filter(recipe => {
      // Search term matching (title or description)
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Ingredient filter
      const matchesIngredients = filters.ingredients.length === 0 ||
        filters.ingredients.every(ingredient => 
          recipe.ingredients.some(recipeIngredient => 
            recipeIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        );
      
      // Preparation time filter
      const matchesPrepTime = !filters.maxPrepTime || 
        recipe.prepTime <= filters.maxPrepTime;
      
      // Difficulty filter
      const matchesDifficulty = !filters.difficulty ||
        recipe.difficulty === filters.difficulty;
      
      // Dietary restrictions filter
      const matchesDietary = filters.dietaryRestrictions.length === 0 ||
        filters.dietaryRestrictions.every(restriction => 
          recipe.dietaryInfo.includes(restriction)
        );
      
      return matchesSearch && matchesIngredients && matchesPrepTime && 
             matchesDifficulty && matchesDietary;
    });
  }
}));
