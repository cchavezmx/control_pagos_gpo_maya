import React, { createContext, useContext, ReactNode } from 'react';

interface GlobalContextType {    
  user: string;
}

const globalContext = createContext<GlobalContextType | undefined>(undefined);

const Provider = globalContext.Provider;

interface ContextGlobalProviderProps {
  children: ReactNode;
}

const ContextGlobalProvider: React.FC<ContextGlobalProviderProps> = ({ children }) => {    
    const value = {            
        user: 'John Doe',
    };

    return (
      <Provider value={{
        user: value.user,
      
      }}>
        {children}
      </Provider>
    )
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(globalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a ContextGlobalProvider');
    }
    return context;
}

export default ContextGlobalProvider;
