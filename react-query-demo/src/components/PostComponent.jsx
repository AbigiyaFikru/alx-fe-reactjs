import { useQuery } from 'react-query';
import { useState } from 'react';

const fetchPosts = async () => {
  console.log('Fetching posts from API...');
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const [showPosts, setShowPosts] = useState(true);
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery(
    'posts',
    fetchPosts,
    {
      staleTime: 5000, // 5 seconds - easier to demonstrate caching
      cacheTime: 30000, // 30 seconds cache
      refetchOnWindowFocus: false,
    }
  );

  const handleRefetch = () => {
    console.log('Manual refetch triggered');
    refetch();
  };

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  // Function to simulate navigating away and back
  const simulateNavigation = () => {
    setShowPosts(false);
    setTimeout(() => setShowPosts(true), 1000);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h2>⏳ Loading posts...</h2>
        <p>Fetching data from JSONPlaceholder API</p>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error">
        <h2>❌ Error occurred!</h2>
        <p>{error.message}</p>
        <button onClick={handleRefetch} className="retry-btn">
          Retry Fetch
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>📝 Posts ({data?.length || 0})</h2>
        <div className="controls">
          <button 
            onClick={handleRefetch} 
            className="refetch-btn"
            disabled={isFetching}
          >
            {isFetching ? '🔄 Refreshing...' : '🔄 Refresh Data'}
          </button>
          <button onClick={togglePosts} className="toggle-btn">
            {showPosts ? '❌ Hide Posts' : '👁️ Show Posts'}
          </button>
          <button onClick={simulateNavigation} className="nav-btn">
            🔄 Simulate Navigation
          </button>
        </div>
      </div>

      {isFetching && (
        <div className="fetching-indicator">
          <p>🔄 Background update in progress...</p>
        </div>
      )}

      {showPosts && (
        <div className="posts-list">
          <h3>First 5 Posts (showing cached data):</h3>
          {data?.slice(0, 5).map((post) => (
            <div key={post.id} className="post-card">
              <h4>📌 {post.title}</h4>
              <p>{post.body}</p>
              <div className="post-meta">
                <span>ID: {post.id}</span>
                <span>User: {post.userId}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="demo-instructions">
        <h3>🎯 React Query Demo Features:</h3>
        
        <div className="feature">
          <h4>✅ Data Fetching Component</h4>
          <p>This component uses React Query's useQuery hook to fetch data from JSONPlaceholder API.</p>
        </div>

        <div className="feature">
          <h4>✅ React Query Caching Demonstrated</h4>
          <p>Try these actions to see caching in action:</p>
          <ul>
            <li>Click "Simulate Navigation" - component unmounts/remounts but data loads instantly from cache</li>
            <li>Click "Hide Posts" and then "Show Posts" - data is served from cache without API call</li>
            <li>Check browser console to see when API calls actually happen</li>
          </ul>
        </div>

        <div className="feature">
          <h4>✅ Data Refetch Interaction</h4>
          <p>Click "Refresh Data" to:</p>
          <ul>
            <li>Force a new API call regardless of cache state</li>
            <li>See loading states during refetch</li>
            <li>Observe how React Query handles background updates</li>
          </ul>
        </div>

        <div className="cache-status">
          <h4>📊 Current Cache Status:</h4>
          <p>Stale Time: 5 seconds | Cache Time: 30 seconds</p>
          <p>Data is {isFetching ? 'currently being updated' : 'served from cache'}</p>
        </div>
      </div>

      <div className="console-tip">
        <p>💡 <strong>Pro Tip:</strong> Open browser DevTools → Network tab to see API calls and Console to see fetch logs!</p>
      </div>
    </div>
  );
};

export default PostsComponent;
