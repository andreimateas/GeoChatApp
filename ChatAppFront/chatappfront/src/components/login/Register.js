import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../auth/AuthProvider";
import {Link, useNavigate} from "react-router-dom";
import {UserController} from "../../controller/UserController";
import User from "../../controller/entities/User";
import "./Register.css";

export default function Register() {

    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');
    const [email, setEmail] =useState('');
    const [name, setName] =useState('');
    const [profilePicture, setProfilePicture] =useState('');
    const [location, setLocation] =useState('');
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
    async function onRegisterButtonClicked(){
        try{
            console.log("start register:" +username+"++++");

            const controller =new UserController();
            const user = new User(username, password, email,name,profilePicture,location);
            const token= await controller.register(user);
            console.log("Received token from server: "+token.string);

            const jsonToken=parseJwt(token.string);
            console.log("Parsed token: "+jsonToken);

            console.log("User data as string: "+jsonToken["sub"]);

            const fields= jsonToken["sub"].split(",");
            const foundUser= new User(fields[0],"", fields[2], fields[1], fields[4], fields[3]);
            console.log("User registered: "+ foundUser);
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
        <div className="registerDiv">

            <div className="inputDiv">

                <input required placeholder={"Username"}
                    type="text"
                    id="inputUsername"
                    className="inputField"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="inputDiv">

                <input required placeholder={"Password"}
                    type="password"
                    id="inputPassword"
                    className="inputField"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="inputDiv">

                <input required placeholder={"Email"}
                    type="email"
                    id="inputEmail"
                    className="inputField"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="inputDiv">

                <input required placeholder={"Name"}
                    type="text"
                    id="inputName"
                    className="inputField"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="inputDiv">

            <input required placeholder={"Location"}
                   type="text"
                   id="inputLocation"
                   className="inputField"
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
            />
        </div>
            <div className="inputDiv">
                <p>Profile picture</p>
                <input required placeholder={"Profile picture"}
                    type="file"
                    id="inputProfilePicture"
                    className="inputField"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                />
            </div>

            <button type="submit" id="buttonRegister" onClick={onRegisterButtonClicked}>
                Register
            </button>
            <p>Already have an account?</p>
            <Link to="/login" className="loginLink">
                Login
            </Link>
        </div>
    );
}