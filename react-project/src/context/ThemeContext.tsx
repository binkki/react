import React, { useState } from 'react';

type ThemeProps = {
  theme: boolean;
  setTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeProps>({
  theme: true,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState((localStorage.getItem('theme') ?? 'true') === 'true');

  const toogleTheme = () => {
    localStorage.setItem('theme', String(!darkTheme));
    setDarkTheme((darkTheme) => !darkTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: darkTheme,
        setTheme: toogleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
