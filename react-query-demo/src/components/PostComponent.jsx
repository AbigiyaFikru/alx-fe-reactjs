import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

async function fetchPosts() {
  const { data } = await axios.get(POSTS_URL)
  return data
}

export default function PostsComponent() {
  const [show, setShow] = useState(true)
  const queryClient = useQueryClient()

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,    // true during background refetch
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // per-query overrides (optional)
    staleTime: 60 * 1000, // 1 minute
    select: (posts) => posts.slice(0, 10), // keep UI small: first 10
  })

  // Prefetch to demonstrate seamless UX if user "navigates"
  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts'],
      queryFn: fetchPosts,
      staleTime: 60 * 1000,
    })
  }

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <h1>Posts (React Query)</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={() => setShow((s) => !s)}>
          {show ? 'Unmount component' : 'Mount component'}
        </button>
        <button onClick={refetch}>Refetch now</button>
        <button onMouseEnter={prefetch}>Prefetch (hover me)</button>
        {isFetching && <span style={{ marginLeft: 8 }}>⏳ background fetch…</span>}
      </div>

      {!show ? (
        <p>Component unmounted. Mount again to see cached data load instantly.</p>
      ) : isLoading ? (
        <ul>
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} style={{ opacity: 0.5 }}>Loading…</li>
          ))}
        </ul>
      ) : isError ? (
        <p style={{ color: 'crimson' }}>Error: {error.message}</p>
      ) : (
        <ul>
          {data.map((p) => (
            <li key={p.id}>
              <strong>#{p.id}</strong> {p.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
