"use client"
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // This ensures that localStorage is only accessed on the client side
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
      }
    }
    return null;
  });

  // Save user to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        try {
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          console.error('Error saving user to localStorage:', error);
        }
      } else {
        localStorage.removeItem('user');
      }
    }
  }, [user]);

  // Optional: Add logging to help debug
  useEffect(() => {
    console.log('Current User in Context:', user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};