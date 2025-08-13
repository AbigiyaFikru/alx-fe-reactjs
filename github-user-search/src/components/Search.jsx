import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const SearchBar = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUserData(searchTerm);
      setUserData(response.data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(username);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !username.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && <div className="loading-message">Loading...</div>}
      
      {error && (
        <div className="error-message">
          Looks like we can't find the user
        </div>
      )}
      
      {userData && (
        <div className="user-profile">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            className="user-avatar"
          />
          <div className="user-details">
            <h2>{userData.name || userData.login}</h2>
            {userData.bio && <p className="user-bio">{userData.bio}</p>}
            <div className="user-stats">
              <span>Followers: {userData.followers}</span>
              <span>Following: {userData.following}</span>
              <span>Repos: {userData.public_repos}</span>
            </div>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
