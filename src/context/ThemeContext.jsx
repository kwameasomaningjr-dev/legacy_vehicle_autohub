import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Permanently set to dark mode for luxury auto hub feel
  const theme = 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    localStorage.setItem('legacy_theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Theme locked to dark mode
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

