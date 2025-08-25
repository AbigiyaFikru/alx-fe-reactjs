import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// Fetch function
const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export default function PostsComponent() {
  // Toggle for mount/unmount demo
  const [show, setShow] = useState(true)

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 60 * 1000, // keep fresh for 1 minute
  })

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Posts (React Query)</h2>

      {/* Buttons for caching/refetch demo */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setShow((s) => !s)}>
          {show ? 'Unmount Component' : 'Mount Component'}
        </button>
        <button onClick={() => refetch()} style={{ marginLeft: '10px' }}>
          Refetch Now
        </button>
        {isFetching && <span style={{ marginLeft: '10px' }}>⏳ Fetching…</span>}
      </div>

      {/* Conditional rendering with caching demonstration */}
      {!show ? (
        <p>Component unmounted. Mount again to see cached data instantly.</p>
      ) : isLoading ? (
        <p>Loading posts...</p>
      ) : isError ? (
        <p style={{ color: 'red' }}>Error: {error.message}</p>
      ) : (
        <ul>
          {data.slice(0, 5).map((post) => (
            <li key={post.id}>
              <strong>#{post.id}</strong> {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
