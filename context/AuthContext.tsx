'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: any;
  loading: boolean;
  handleLogout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  handleLogout: async () => {},
  refetchUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost/projectweb/rozgaar-board/backend/api/auth/me.php', { credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost/projectweb/rozgaar-board/backend/api/auth/logout.php', { method: 'POST', credentials: 'include' });
      toast.success('Logged out successfully');
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
