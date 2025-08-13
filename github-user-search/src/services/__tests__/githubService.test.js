import { fetchUserData, fetchUserRepos } from '../githubService';
import axios from 'axios';

jest.mock('axios');

describe('GitHub API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchUserData successfully returns user data', async () => {
    const mockUser = {
      login: 'testuser',
      name: 'Test User',
      id: 123456
    };
    
    axios.get.mockResolvedValue({ data: mockUser, status: 200 });
    
    const result = await fetchUserData('testuser');
    expect(result.data).toEqual(mockUser);
    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/testuser');
  });

  test('fetchUserData handles 404 error', async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });
    
    await expect(fetchUserData('nonexistentuser'))
      .rejects
      .toThrow('User not found');
  });

  test('fetchUserRepos returns repository data', async () => {
    const mockRepos = [
      { id: 1, name: 'repo1' },
      { id: 2, name: 'repo2' }
    ];
    
    axios.get.mockResolvedValue({ data: mockRepos });
    
    const result = await fetchUserRepos('testuser');
    expect(result).toEqual(mockRepos);
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.github.com/users/testuser/repos?sort=updated'
    );
  });
});
