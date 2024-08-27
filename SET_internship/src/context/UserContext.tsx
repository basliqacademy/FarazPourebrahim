import React, {createContext, useState, useContext, useEffect} from 'react';
import Connect from "../api/connect";
import API from "../api/api";

type UserContextType = {
    user: any;
    setUser: (value: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider= ({ children }) => {
    const [user, setUser] = useState<any>(null);

    useEffect( () => {
            async function handleConnection() {
                Connect.refreshToken();
                const json = await API.getProfile();

                if (json && json.success) {
                    setUser(json.data);
                    console.log(user);
                }
            }

            handleConnection();

        }
        ,[])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);