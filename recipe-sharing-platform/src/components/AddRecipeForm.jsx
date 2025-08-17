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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Add at least one ingredient';
    if (!formData.instructions.trim()) newErrors.instructions = 'Add preparation steps';
    if (!formData.prepTime || isNaN(formData.prepTime)) newErrors.prepTime = 'Enter valid time';
    if (!formData.servings || isNaN(formData.servings)) newErrors.servings = 'Enter valid servings';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', {
        ...formData,
        ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
        instructions: formData.instructions.split('\n').filter(i => i.trim()),
        prepTime: parseInt(formData.prepTime),
        servings: parseInt(formData.servings)
      });
      setIsSubmitting(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Recipe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. Spaghetti Carbonara"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Prep Time & Servings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prep Time (mins) *
            </label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.prepTime ? 'border-red-500' : 'border-gray-300'}`}
              min="1"
            />
            {errors.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Servings *
            </label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.servings ? 'border-red-500' : 'border-gray-300'}`}
              min="1"
            />
            {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingredients * (one per line)
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows={4}
            className={`w-full p-2 border rounded ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="2 cups flour\n1 tsp salt\n..."
          />
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions * (one step per line)
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={6}
            className={`w-full p-2 border rounded ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="1. Preheat oven to 350°F\n2. Mix dry ingredients\n..."
          />
          {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${isSubmitting ? 'opacity-70' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Add Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
}
