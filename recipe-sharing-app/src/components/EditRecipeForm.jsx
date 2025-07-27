import { useState } from 'react';
import useRecipeStore from '../stores/recipeStore';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipeForm = ({ recipe }) => {
  const [formData, setFormData] = useState({
    title: recipe.title,
    description: recipe.description
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    setIsSubmitting(true);
    try {
      await updateRecipe(Number(id), formData);
      navigate(`/recipes/${id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
          minLength={3}
        />
      </label>
      
      <label>
        Description:
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </label>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default EditRecipeForm;
