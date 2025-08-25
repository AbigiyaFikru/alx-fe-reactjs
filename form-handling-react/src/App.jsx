import React from 'react';
import ControlledForm from './components/ControlledForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          React Form Handling Comparison
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ControlledForm />
          <FormikForm />
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Both forms submit to: https://jsonplaceholder.typicode.com/users</p>
          <p className="text-sm">(Mock API - data won't actually be saved)</p>
        </div>
      </div>
    </div>
  );
}

export default App;
