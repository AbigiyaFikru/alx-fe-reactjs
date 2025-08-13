import { useState } from 'react';
import { searchUsers } from '../services/githubService';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPage(1);
    
    try {
      const response = await searchUsers({ ...searchParams, page: 1 });
      setResults(response.items);
      setHasMore(response.total_count > response.items.length);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await searchUsers({ ...searchParams, page: nextPage });
      setResults(prev => [...prev, ...response.items]);
      setHasMore(response.total_count > results.length + response.items.length);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-github-dark rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white mb-8">GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-github-light rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              placeholder="octocat"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-github-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              placeholder="San Francisco"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-github-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Repositories</label>
            <input
              type="number"
              name="minRepos"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              placeholder="10"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-github-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Programming Language</label>
            <input
              type="text"
              name="language"
              value={searchParams.language}
              onChange={handleInputChange}
              placeholder="JavaScript"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-github-primary focus:border-transparent"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-github-primary hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Users'}
        </button>
      </form>

      {error && (
        <div className="p-4 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {results.map(user => (
          <div key={user.id} className="p-6 bg-github-light rounded-lg shadow flex items-start space-x-6">
            <img 
              src={user.avatar_url} 
              alt={user.login} 
              className="w-20 h-20 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  <a 
                    href={user.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-github-primary hover:underline"
                  >
                    {user.login}
                  </a>
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Score: {user.score.toFixed(2)}
                </span>
              </div>
              
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{user.type}</p>
                </div>
                {user.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{user.location}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Repositories</p>
                  <p className="font-medium">{user.repos_url ? 'View Repos' : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
