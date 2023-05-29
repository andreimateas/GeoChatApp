import {Link} from 'react-router-dom';
import {UserController} from "../../controller/UserController";
import {useState} from "react";
import User from "../../controller/entities/User";
import {useNavigate} from 'react-router-dom';
import React from 'react';
import {useAuthContext} from "../../auth/AuthProvider";

export default function Login(){

    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');
    const { login } = useAuthContext();
    const navigate = useNavigate();

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
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
            console.log("A mers: "+token)
            login({username,token});
            console.log("go to user page");
            navigate("/userPage");
            console.log("changed to user page");

        }catch(exception){
            console.log("error");
        }
        finally {
            console.log("end login");
        }

    }

    return (

        <div className={"loginDiv"}>

            <h1 className={"welcomeHeader"}>Welcome to ChatApp</h1>

                <label>username</label>
                <input type="text" id={"inputUsernameLogin"} className={"inputLogin"} onChange={(text)=>setUsername(text.target.value)}/>

                <label>password</label>
                <input type="password" id={"inputPasswordLogin"} className={"inputLogin"}  onChange={(event) => setPassword(event.target.value)}/>

                <p></p>
                <button type={"submit"} id={"buttonLogin"} onClick={onLoginButtonClicked} >Login</button>

            <p>Don't have an account? </p>
            <Link to="/register">Register</Link>
        </div>


       );
}