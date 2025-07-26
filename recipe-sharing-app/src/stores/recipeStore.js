import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  // Add/edit/delete actions
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
  })),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  // Search functionality
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  get filteredRecipes() {
    return this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}));

export default useRecipeStore;
