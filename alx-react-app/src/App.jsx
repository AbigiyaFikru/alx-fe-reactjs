import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';  // Fixed path
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <UserProfile
        name= "Alice"
        Age={25}
        bio="Loves hiking and photography"
        />
      <WelcomeMessage />
      <MainContent />
      
      {/* Original Vite template content */}
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <Footer />
    </>
  );
}

export default App;
