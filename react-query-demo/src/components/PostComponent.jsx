import { useQuery } from 'react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery(
    'posts',
    fetchPosts,
    {
      staleTime: 5 * 60 * 1000, // Data becomes stale after 5 minutes
      cacheTime: 10 * 60 * 1000, // Cache persists for 10 minutes
    }
  );

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading posts...</h2>
        <p>Please wait while we fetch the data</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error">
        <h2>Error occurred!</h2>
        <p>{error.message}</p>
        <button onClick={handleRefetch} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts ({data?.length || 0})</h2>
        <div className="controls">
          <button 
            onClick={handleRefetch} 
            className="refetch-btn"
            disabled={isFetching}
          >
            {isFetching ? 'Refreshing...' : 'Refresh Data'}
          </button>
          {isFetching && <span className="fetching-indicator">Updating...</span>}
        </div>
      </div>

      <div className="posts-list">
        {data?.slice(0, 10).map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-meta">
              <span>Post ID: {post.id}</span>
              <span>User ID: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="cache-info">
        <p>
          <strong>React Query Caching Demo:</strong>
        </p>
        <ul>
          <li>✅ Data is automatically cached</li>
          <li>✅ Navigate away and back to see cached data load instantly</li>
          <li>✅ Click "Refresh Data" to force a refetch</li>
          <li>✅ Cache persists for 10 minutes</li>
        </ul>
      </div>
    </div>
  );
};

export default PostsComponent;
