import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddRecipeForm() {
  const navigate = useNavigate();
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
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Enhanced validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    
    // Require at least 2 ingredients
    const ingredients = formData.ingredients.split('\n').filter(i => i.trim());
    if (ingredients.length < 2) newErrors.ingredients = 'Add at least 2 ingredients';
    
    // Require at least 2 steps
    const instructions = formData.instructions.split('\n').filter(i => i.trim());
    if (instructions.length < 2) newErrors.instructions = 'Add at least 2 steps';
    
    // Validate prep time
    if (!formData.prepTime || isNaN(formData.prepTime) || formData.prepTime < 1) {
      newErrors.prepTime = 'Enter valid preparation time (minimum 1 minute)';
    }
    
    // Validate servings
    if (!formData.servings || isNaN(formData.servings) || formData.servings < 1) {
      newErrors.servings = 'Enter valid number of servings (minimum 1)';
    }
    
    // Validate image URL format when provided
    if (formData.image && !/^https?:\/\/.+\..+/.test(formData.image)) {
      newErrors.image = 'Enter a valid URL starting with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Format the data before submission
      const recipeData = {
        ...formData,
        ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
        instructions: formData.instructions.split('\n').filter(i => i.trim()),
        prepTime: parseInt(formData.prepTime),
        servings: parseInt(formData.servings),
        id: Date.now() // Temporary ID for frontend
      };
      
      console.log('Recipe submitted:', recipeData);
      setSubmitSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Recipe</h2>
        
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            Recipe submitted successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipe Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                errors.title 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="e.g. Classic Margherita Pizza"
            />
            {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                errors.image 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="https://example.com/recipe-image.jpg"
            />
            {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
          </div>

          {/* Prep Time and Servings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Time (minutes) *
              </label>
              <input
                type="number"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                  errors.prepTime 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              {errors.prepTime && <p className="mt-2 text-sm text-red-600">{errors.prepTime}</p>}
            </div>
            
            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                Servings *
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                  errors.servings 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              {errors.servings && <p className="mt-2 text-sm text-red-600">{errors.servings}</p>}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients * (one per line, at least 2 required)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                errors.ingredients 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="2 cups flour\n1 tsp salt\n1 tbsp olive oil"
            />
            {errors.ingredients && <p className="mt-2 text-sm text-red-600">{errors.ingredients}</p>}
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Steps * (one step per line, at least 2 required)
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={7}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                errors.instructions 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="1. Preheat oven to 350°F\n2. Mix dry ingredients\n3. Add wet ingredients"
            />
            {errors.instructions && <p className="mt-2 text-sm text-red-600">{errors.instructions}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                isSubmitting
                  ? 'bg-blue-400 focus:ring-blue-200 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Recipe'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
