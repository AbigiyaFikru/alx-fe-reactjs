// components/AdvancedFilters.jsx
import React, { useState } from 'react';
import { useRecipeStore } from '../stores/recipeStore';

const AdvancedFilters = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const setFilters = useRecipeStore(state => state.setFilters);
  const filters = useRecipeStore(state => state.filters);
  const resetFilters = useRecipeStore(state => state.resetFilters);

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFilters({
        ingredients: [...filters.ingredients, ingredientInput.trim()]
      });
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setFilters({
      ingredients: filters.ingredients.filter(ing => ing !== ingredientToRemove)
    });
  };

  return (
    <div className="advanced-filters">
      <h3>Advanced Filters</h3>
      
      {/* Ingredients Filter */}
      <div className="filter-group">
        <label>Ingredients:</label>
        <div className="ingredient-input">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="Add ingredient to filter"
          />
          <button onClick={handleAddIngredient}>Add</button>
        </div>
        <div className="ingredient-tags">
          {filters.ingredients.map((ingredient, index) => (
            <span key={index} className="tag">
              {ingredient}
              <button onClick={() => handleRemoveIngredient(ingredient)}>×</button>
            </span>
          ))}
        </div>
      </div>
      
      {/* Preparation Time Filter */}
      <div className="filter-group">
        <label>Max Preparation Time (mins):</label>
        <input
          type="number"
          min="0"
          value={filters.maxPrepTime || ''}
          onChange={(e) => setFilters({ maxPrepTime: e.target.value ? parseInt(e.target.value) : null })}
        />
      </div>
      
      {/* Difficulty Filter */}
      <div className="filter-group">
        <label>Difficulty:</label>
        <select
          value={filters.difficulty || ''}
          onChange={(e) => setFilters({ difficulty: e.target.value || null })}
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      
      {/* Dietary Restrictions Filter */}
      <div className="filter-group">
        <label>Dietary Restrictions:</label>
        <div className="checkbox-group">
          {['vegetarian', 'vegan', 'gluten-free', 'dairy-free'].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={filters.dietaryRestrictions.includes(option)}
                onChange={(e) => {
                  const newRestrictions = e.target.checked
                    ? [...filters.dietaryRestrictions, option]
                    : filters.dietaryRestrictions.filter(r => r !== option);
                  setFilters({ dietaryRestrictions: newRestrictions });
                }}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      
      <button onClick={resetFilters} className="reset-btn">
        Reset All Filters
      </button>
    </div>
  );
};

export default AdvancedFilters;
