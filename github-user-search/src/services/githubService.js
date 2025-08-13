import axios from 'axios';

const API_URL = 'https://api.github.com';

// Main function to fetch user data
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`);
    return {
      data: response.data,
      status: response.status
    };
  } catch (error) {
    throw new Error(
      error.response?.status === 404 
        ? 'User not found' 
        : error.response?.data?.message || 'Failed to fetch user data'
    );
  }
};

// Additional API functions
export const fetchUserRepos = async (username) => {
  const response = await axios.get(`${API_URL}/users/${username}/repos?sort=updated`);
  return response.data;
};

export const fetchUserFollowers = async (username) => {
  const response = await axios.get(`${API_URL}/users/${username}/followers`);
  return response.data;
};
