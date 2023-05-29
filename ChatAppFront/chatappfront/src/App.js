import './App.css';
import Login from './components/login/Login';
import {Routes, Route} from 'react-router-dom';
import Register from "./components/login/Register";
import UserMainPage from "./components/userPage/UserMainPage";
import Home from "./components/home/Home";
import React from 'react';
import {AuthContextProvider} from "./auth/AuthProvider";
const App = () => {
  return (
    <>
        <AuthContextProvider>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/userPage" element={<UserMainPage/>}/>
        </Routes>
        </AuthContextProvider>
    </>
  );
}

export default App;
