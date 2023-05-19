import './App.css';
import Login from './components/login/Login';
import {Routes, Route} from 'react-router-dom';
import Register from "./components/login/Register";
import UserMainPage from "./components/userPage/UserMainPage";
import Home from "./components/home/Home";
import React from 'react';
const App = () => {
  return (
    <>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/userPage" element={<UserMainPage/>}/>
        </Routes>
    </>
  );
}

export default App;
