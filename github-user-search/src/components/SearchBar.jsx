import { useState } from 'react'

const SearchBar = ({ setUsers }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Search functionality will be added later
    console.log('Searching for:', query)
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users..."
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
