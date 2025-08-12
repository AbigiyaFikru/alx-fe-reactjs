import axios from 'axios'

const API_URL = 'https://api.github.com'

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search/users`, {
      params: {
        q: query,
      },
      // headers: {
      //   Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      // },
    })
    return response.data.items
  } catch (error) {
    console.error('Error searching users:', error)
    return []
  }
}
