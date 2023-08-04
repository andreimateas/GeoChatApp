import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        userString: localStorage.getItem('userProfile') || '',

    });

    function login(userProfile) {
        setUserProfile(userProfile);
        console.log(userProfile);
        localStorage.setItem('userProfile', userProfile.userString);
        console.log(`user: ${userProfile.userString} logged in ${userProfile}`);
    }

    function logout() {
        console.log(`user: ${userProfile.userString} logged out`);
        setUserProfile({
            userString: '',
        });
        localStorage.removeItem('userProfile');

    }

    return (
        <AuthContext.Provider value={{ userProfile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};