// Authentication utility functions

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authToken = localStorage.getItem('auth_token');
  
  return isLoggedIn && !!authToken;
};

export const login = (authToken: string, refreshToken: string, user: any): void => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('auth_token', authToken);
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

export const getCurrentUser = (): any => {
  if (typeof window === 'undefined') return null;
  
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
