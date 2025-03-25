
import { useState, useEffect } from 'react';

// Simulated auth state for demo (would use Clerk or Supabase in production)
export const useAuth = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('finance_blog_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    // Simple demo authentication (replace with real auth in production)
    if (password.length >= 6) {
      const userData = { email };
      localStorage.setItem('finance_blog_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('finance_blog_user');
    localStorage.removeItem('finance_blog_articles');
    setUser(null);
  };

  return { user, loading, login, logout };
};
