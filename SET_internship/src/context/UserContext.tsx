import React, {createContext, useState, useContext, useEffect} from 'react';
import Connect from "../api/connect";
import API from "../api/api";
import {useNavigate} from "react-router-dom";

type UserContextType = {
    user: any;
    setUser: (value: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider= ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect( () => {
            async function handleConnection() {
                Connect.refreshToken();

                if (!Connect.token) {
                    navigate("/sign_up");
                    return;
                }

                const json = await API.getProfile();

                if (json && json.success) {
                    setUser(json.data);
                }
            }

            handleConnection();
        }
        ,[]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);