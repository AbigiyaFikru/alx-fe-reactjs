import PostsComponent from './components/PostsComponent'

export default function App() {
  return (
    <div>
      <PostsComponent />
      <p style={{ marginTop: 24, fontSize: 12, opacity: 0.8 }}>
        Tip: Open React Query Devtools (bottom-right) to watch cache, freshness, and refetches.
      </p>
    </div>
  )
}
