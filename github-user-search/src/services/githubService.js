import axios from 'axios';

const API_URL = 'https://api.github.com';

export const searchUsers = async (params) => {
  try {
    // Construct query string based on parameters
    let query = params.username ? `${params.username} in:login` : '';
    if (params.location) query += ` location:${params.location}`;
    if (params.minRepos) query += ` repos:>${params.minRepos}`;
    if (params.language) query += ` language:${params.language}`;
    
    const response = await axios.get(`${API_URL}/search/users`, {
      params: {
        q: query,
        page: params.page || 1,
        per_page: 10,
        sort: 'followers',
        order: 'desc'
      }
    });
    
    // Enhanced data fetching for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async user => {
        try {
          const userDetails = await axios.get(user.url);
          return {
            ...user,
            ...userDetails.data
          };
        } catch {
          return user;
        }
      })
    );
    
    return {
      ...response.data,
      items: usersWithDetails
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to search users'
    );
  }
};
