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

  const [errors, setErrors] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    servings: ''
  });

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
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
      isValid = false;
    }

    // Ingredients validation
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'At least one ingredient is required';
      isValid = false;
    } else if (formData.ingredients.split('\n').filter(line => line.trim()).length < 1) {
      newErrors.ingredients = 'Please enter at least one ingredient';
      isValid = false;
    }

    // Instructions validation
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'At least one instruction step is required';
      isValid = false;
    } else if (formData.instructions.split('\n').filter(line => line.trim()).length < 1) {
      newErrors.instructions = 'Please enter at least one instruction';
      isValid = false;
    }

    // Prep time validation
    if (!formData.prepTime || isNaN(formData.prepTime) || formData.prepTime < 1) {
      newErrors.prepTime = 'Please enter a valid preparation time';
      isValid = false;
    }

    // Servings validation
    if (!formData.servings || isNaN(formData.servings) || formData.servings < 1) {
      newErrors.servings = 'Please enter a valid number of servings';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Format the data for submission
        const recipeData = {
          ...formData,
          ingredients: formData.ingredients.split('\n').filter(line => line.trim()),
          instructions: formData.instructions.split('\n').filter(line => line.trim()),
          prepTime: parseInt(formData.prepTime),
          servings: parseInt(formData.servings)
        };

        // In a real app, you would send this to your backend API
        console.log('Submitting recipe:', recipeData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect after successful submission
        navigate('/');
      } catch (error) {
        console.error('Error submitting recipe:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add New Recipe</h2>
          <p className="text-gray-600 mt-1">Share your delicious recipe with the community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Recipe Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. Classic Margherita Pizza"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
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
              placeholder="https://example.com/recipe-image.jpg"
            />
          </div>

          {/* Prep Time and Servings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Time (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.prepTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.prepTime && (
                <p className="mt-1 text-sm text-red-600">{errors.prepTime}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
                Servings <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.servings ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.servings && (
                <p className="mt-1 text-sm text-red-600">{errors.servings}</p>
              )}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs ml-1">(one per line)</span>
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.ingredients ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1 cup flour\n2 eggs\n1 tsp salt"
            />
            {errors.ingredients && (
              <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
              Preparation Steps <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs ml-1">(one step per line)</span>
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={7}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.instructions ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Preheat oven to 350°F\nMix dry ingredients\n..."
            />
            {errors.instructions && (
              <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
