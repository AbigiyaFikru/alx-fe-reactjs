// App.jsx
import React from 'react';
import SearchBar from './components/SearchBar';
import AdvancedFilters from './components/AdvancedFilters';
import RecipeList from './components/RecipeList';
import './styles.css';

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Recipe Finder</h1>
        <SearchBar />
      </header>
      
      <div className="main-content">
        <aside className="sidebar">
          <AdvancedFilters />
        </aside>
        
        <main className="recipe-container">
          <RecipeList />
        </main>
      </div>
    </div>
  );
};

export default App;
