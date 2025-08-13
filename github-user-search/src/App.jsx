import { useState } from 'react';
import SearchUser from './components/SearchUser';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>GitHub User Search</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
        </button>
      </header>
      <main>
        <SearchUser />
      </main>
      <footer>
        <p>Search for any GitHub user profile</p>
      </footer>
    </div>
  );
}

export default App;
