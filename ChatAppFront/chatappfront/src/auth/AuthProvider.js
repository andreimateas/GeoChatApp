import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        username: localStorage.getItem('userProfile') || '',
        token: localStorage.getItem('token') || '',
    });

    function login(userProfile) {
        setUserProfile(userProfile);
        console.log(userProfile);
        localStorage.setItem('userProfile', userProfile.username);
        localStorage.setItem('token', userProfile.token);
        console.log(`user: ${userProfile.username} logged in ${userProfile}`);
    }

    function logout() {
        setUserProfile({
            username: '',
            token: '',
        });
        localStorage.removeItem('userProfile');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ userProfile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};