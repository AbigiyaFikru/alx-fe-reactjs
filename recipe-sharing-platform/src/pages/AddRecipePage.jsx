import { useNavigate } from 'react-router-dom';
import AddRecipeForm from '../components/AddRecipeForm';

export default function AddRecipePage() {
  const navigate = useNavigate();

  const handleSubmit = async (recipeData) => {
    // In a real app, you would send this to your backend API
    console.log('Submitting recipe:', recipeData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to home after submission
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AddRecipeForm onSubmit={handleSubmit} />
    </div>
  );
}
