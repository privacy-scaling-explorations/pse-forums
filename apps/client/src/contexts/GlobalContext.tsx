import React, { createContext, useContext, ReactNode, useState } from 'react';

interface GlobalContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  children?: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const value = {
    isMenuOpen,
    setIsMenuOpen,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}
