import './App.css';
import Login from './components/login/Login';
import {Routes, Route} from 'react-router-dom';
import Register from "./components/login/Register";
import UserMainPage from "./components/userPage/UserMainPage";
import Home from "./components/home/Home";
import React from 'react';
import {AuthContextProvider} from "./auth/AuthProvider";
import UserProfilePage from "./components/userPage/UserProfilePage";
import UserMessagePage from "./components/userPage/UserMessagePage";
const App = () => {
  return (
    <>
        <AuthContextProvider>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/userPage" element={<UserMainPage/>}/>
            <Route path="/userProfilePage" element={<UserProfilePage/>}/>
            <Route path="/userMessagePage" element={<UserMessagePage/>}/>
        </Routes>
        </AuthContextProvider>
    </>
  );
}

export default App;
