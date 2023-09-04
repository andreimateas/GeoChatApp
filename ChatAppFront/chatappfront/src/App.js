import './App.css';
import Login from './components/login/Login';
import {Routes, Route} from 'react-router-dom';
import Register from "./components/login/Register";
import UserMainPage from "./components/userPage/UserMainPage";
import Home from "./components/home/Home";
import React from 'react';
import {AuthContextProvider} from "./auth/AuthProvider";
import UserProfilePage from "./components/userPage/UserProfilePage";
import NotFound from "./routes/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import UserMessagePage from "./components/userPage/UserMessagePage";
import Messages from "./components/userPage/messages/Messages";
import NavBar from "./components/navbar/NavBar";
const App = () => {
    return (
        <>
            <AuthContextProvider>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/userPage"
                        element={
                            <>
                                <NavBar />
                                <PrivateRoute component={UserMainPage} />
                            </>
                        }
                    />
                    <Route
                        path="/userProfilePage"
                        element={
                            <>
                                <NavBar />
                                <PrivateRoute component={UserProfilePage} />
                            </>
                        }
                    />
                    <Route
                        path="/userMessagePage"
                        element={
                            <>
                                <NavBar />
                                <PrivateRoute component={UserMessagePage} />
                            </>
                        }
                    />
                    <Route
                        path="/messages/:user2"
                        element={
                            <>
                                <NavBar />
                                <PrivateRoute component={Messages} />
                            </>
                        }
                    />
                </Routes>
            </AuthContextProvider>
        </>
    );
};


export default App;
