import {Link} from 'react-router-dom';
import {UserController} from "../../controller/UserController";
import {useState, useEffect} from "react";
import User from "../../controller/entities/User";
import {useNavigate} from 'react-router-dom';
import React from 'react';
import {useAuthContext} from "../../auth/AuthProvider";
import "./Login.css";

export default function Login(){

    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');
    const [userString, setUserString] =useState('');
    const { login } = useAuthContext();
    const navigate = useNavigate();

    function parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    async function onLoginButtonClicked(){
        try{
            console.log("start login:" +username+"++++");

            const controller =new UserController();
            const user = new User(username, password, '','','','');
            const token= await controller.login(user);
            console.log("Received token from server: "+token.string);

            const jsonToken=parseJwt(token.string);
            console.log("Parsed token: "+jsonToken);


            console.log("User data as string: "+jsonToken["sub"]);

            const fields= jsonToken["sub"].split(",");
            const foundUser= new User(fields[0],"", fields[2], fields[1], fields[4], fields[3]);
            console.log("User that logged in: "+ foundUser);

            setUserString(jsonToken["sub"]);
            console.log("A mers: "+user);

            console.log("go to user page");
            console.log("changed to user page");

        }catch(exception){
            console.log("error");
        }
        finally {
            console.log("end login");
        }

    }

    useEffect(() => {
        if (userString !== '') {
            login({ userString });
            navigate('/userPage');
        }
    }, [userString, login, navigate]);

    return (
        <div className="loginDiv">


            <input required placeholder="Username"
                type="text"
                id="inputUsernameLogin"
                className="inputLogin"
                onChange={(text) => setUsername(text.target.value)}
            />


            <input required placeholder="Password"
                type="password"
                id="inputPasswordLogin"
                className="inputLogin"
                onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit" id="buttonLogin" onClick={onLoginButtonClicked}>
                Login
            </button>
            <p className="p-register">Don't have an account?</p>
            <Link to="/register" className="register-link">Register</Link>


        </div>
    );

}