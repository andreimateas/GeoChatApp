import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        userString: localStorage.getItem('userProfile') || '',
        token: localStorage.getItem('token') || '',

    });

    /**
     * Logs in a user by updating the user profile and token, and storing them in local storage.
     * @param {Object} userProfile - User profile and token information.
     */
    function login(userProfile) {
        setUserProfile(userProfile);
        console.log(userProfile);
        localStorage.setItem('userProfile', userProfile.userString);
        localStorage.setItem('token',userProfile.token);
        console.log(`user: ${userProfile.userString} logged in ${userProfile}`);
    }

    /**
     * Logs out a user by clearing the user profile and token and removing them from local storage.
     */
    function logout() {
        console.log(`user: ${userProfile.userString} logged out`);
        setUserProfile({
            userString: '',
            token: '',
        });
        localStorage.removeItem('userProfile');
        localStorage.removeItem('token');
        sessionStorage.clear();

    }

    return (
        <AuthContext.Provider value={{ userProfile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};