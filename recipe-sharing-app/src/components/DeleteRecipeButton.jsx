import { useState } from 'react';
import useRecipeStore from '../stores/recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    setIsDeleting(true);
    try {
      await deleteRecipe(Number(recipeId));
      navigate('/');
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="delete-button"
    >
      {isDeleting ? 'Deleting...' : 'Delete Recipe'}
    </button>
  );
};

export default DeleteRecipeButton;
