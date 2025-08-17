import { useState } from 'react';

export default function AddRecipeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    servings: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';
    if (!formData.prepTime || isNaN(formData.prepTime)) newErrors.prepTime = 'Valid prep time is required';
    if (!formData.servings || isNaN(formData.servings)) newErrors.servings = 'Valid serving number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      // Format ingredients and instructions as arrays
      const recipeData = {
        ...formData,
        ingredients: formData.ingredients.split('\n').filter(line => line.trim()),
        instructions: formData.instructions.split('\n').filter(line => line.trim()),
        prepTime: parseInt(formData.prepTime),
        servings: parseInt(formData.servings)
      };
      
      onSubmit(recipeData)
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Recipe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipe Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. Classic Margherita Pizza"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Prep Time and Servings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
              Preparation Time (minutes) *
            </label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.prepTime ? 'border-red-500' : 'border-gray-300'}`}
              min="1"
            />
            {errors.prepTime && <p className="mt-1 text-sm text-red-600">{errors.prepTime}</p>}
          </div>
          
          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
              Servings *
            </label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.servings ? 'border-red-500' : 'border-gray-300'}`}
              min="1"
            />
            {errors.servings && <p className="mt-1 text-sm text-red-600">{errors.servings}</p>}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
            Ingredients * (one per line)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="1 cup flour\n2 eggs\n1 tsp salt"
          />
          {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
        </div>

        {/* Instructions */}
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
            Preparation Steps * (one step per line)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={7}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Preheat oven to 350°F\nMix dry ingredients\n..."
          />
          {errors.instructions && <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Add Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
}
