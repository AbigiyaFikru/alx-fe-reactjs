import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  // Add recipe
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
  })),
  // Delete recipe (must be present)
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  // Update recipe (must be present)
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  // Get single recipe (helper function)
  getRecipeById: (id) => {
    return useRecipeStore.getState().recipes.find(r => r.id === id);
  }
}));

export default useRecipeStore;
