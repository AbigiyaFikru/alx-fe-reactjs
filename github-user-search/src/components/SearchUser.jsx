import { useState, useEffect } from 'react';
import { fetchUserData, fetchUserRepos, fetchUserFollowers } from '../services/githubService';

const SearchUser = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('repos');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userResponse = await fetchUserData(username);
      setUserData(userResponse.data);
      
      // Fetch additional data in parallel
      const [reposData, followersData] = await Promise.all([
        fetchUserRepos(username),
        fetchUserFollowers(username)
      ]);
      
      setRepos(reposData);
      setFollowers(followersData);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setRepos([]);
      setFollowers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
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

      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {userData && (
        <div className="user-profile">
          <div className="user-header">
            <img src={userData.avatar_url} alt={userData.login} className="avatar" />
            <div className="user-info">
              <h2>{userData.name || userData.login}</h2>
              <p>{userData.bio || 'No bio available'}</p>
              <div className="stats">
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

          <div className="tabs">
            <button 
              className={activeTab === 'repos' ? 'active' : ''}
              onClick={() => setActiveTab('repos')}
            >
              Repositories ({repos.length})
            </button>
            <button 
              className={activeTab === 'followers' ? 'active' : ''}
              onClick={() => setActiveTab('followers')}
            >
              Followers ({followers.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'repos' ? (
              <div className="repos-list">
                {repos.slice(0, 10).map(repo => (
                  <div key={repo.id} className="repo-card">
                    <h3>
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </a>
                    </h3>
                    <p>{repo.description || 'No description'}</p>
                    <div className="repo-stats">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="followers-grid">
                {followers.slice(0, 12).map(follower => (
                  <a
                    key={follower.id}
                    href={follower.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="follower-card"
                  >
                    <img src={follower.avatar_url} alt={follower.login} />
                    <span>{follower.login}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
