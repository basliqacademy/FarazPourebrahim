import React, { createContext, useState, useContext } from 'react';

type UserContextType = {
    user: any;
    setUser: (value: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider= ({ children }) => {
    const [user, setUser] = useState<any>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

