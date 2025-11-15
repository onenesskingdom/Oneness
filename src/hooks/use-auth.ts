'use client';

import { useEffect, useState } from 'react';
import { isAuthenticated, getCurrentUser } from '@/lib/auth';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        const currentUser = getCurrentUser();

        setIsLoggedIn(authenticated);
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for storage changes (in case another tab logs out)
    const handleStorageChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      // For login status, we might need to re-check API
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { isLoggedIn, user, loading };
};
