import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [
    { id: 1, title: "Pasta Carbonara", description: "Classic Italian pasta with eggs, cheese, and pancetta" }
  ],
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
    })),
  removeRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    }))
}))

export default useRecipeStore
