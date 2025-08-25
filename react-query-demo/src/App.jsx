import { QueryClient, QueryClientProvider } from 'react-query';
import PostsComponent from './components/PostsComponent';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>React Query Demo - Posts from JSONPlaceholder</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;
