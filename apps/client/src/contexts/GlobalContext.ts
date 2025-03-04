import { createContext, useContext, ReactNode, useState } from 'react';

interface GlobalContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  showAllGroups: boolean;
  setShowAllGroups: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllGroups, setShowAllGroups] = useState(false);

  const value = {
    isMenuOpen,
    setIsMenuOpen,
    showAllGroups,
    setShowAllGroups,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

// ... existing code ... 