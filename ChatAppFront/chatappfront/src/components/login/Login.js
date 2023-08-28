import {Link} from 'react-router-dom';
import {UserController} from "../../controller/UserController";
import {useState, useEffect, useRef} from "react";
import User from "../../controller/entities/User";
import {useNavigate} from 'react-router-dom';
import React from 'react';
import {useAuthContext} from "../../auth/AuthProvider";
import Swal from "sweetalert2";
import "./Login.css";

export default function Login(){

    const [username, setUsername] =useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] =useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userString, setUserString] =useState('');
    const [token, setToken] = useState('');
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const anyError = useRef(false);

    function resetErrorFlags() {
        const errorSetters = [setUsernameError, setPasswordError];
        errorSetters.forEach((val) => val(""));
        anyError.current = false;
    }

    const validateField = (fieldValue, regexp) => {
        return regexp.test(fieldValue);
    };

    function validateUsername() {

        return validateField(username, /^[a-z0-9_-]{3,16}$/);
    }

    function validatePassword() {
        return validateField(password, /^\S{5,50}$/);
    }

    function parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    async function onLoginButtonClicked(){

        resetErrorFlags();

        if (!validateUsername()) {
                setUsernameError("Allowed username characters: letters,digits, -, _");
                anyError.current = true;
        }

        if (!validatePassword()) {
            setPasswordError("Password should be between 5 and 50 characters long");
            anyError.current = true;
        }

        if(!anyError.current) {
            try {
                console.log("start login:" + username + "++++");

                const controller = new UserController();
                const user = new User(username, password, '', '', '', '');
                const serverToken = await controller.login(user);
                console.log("Received token from server: " + serverToken.string);
                setToken(serverToken);

                const jsonToken = parseJwt(serverToken.string);
                console.log("Parsed token: " + jsonToken);


                console.log("User data as string: " + jsonToken["sub"]);

                const fields = jsonToken["sub"].split(",");
                const foundUser = new User(fields[0], "", fields[2], fields[1], fields[4], fields[3]);
                console.log("User that logged in: " + foundUser);

                setUserString(jsonToken["sub"]);
                console.log("A mers: " + user);

                console.log("go to user page");
                console.log("changed to user page");

            } catch (exception) {
                console.log(exception);
                await Swal.fire({
                    title: "Wrong credentials",
                    icon: "error",
                    color: '#A83140FF',
                    confirmButtonColor: '#A83140FF',
                });
            }
        }else {
            console.log("invalid fields");
        }

    }

    useEffect(() => {
        if (userString !== '') {
            login({ userString, token: token.string });
            navigate('/userPage');
        }
    }, [userString, login, navigate, token]);

    return (

        <div className="login-div">

            {usernameError && <span className="error" >{usernameError}</span>}
            <input required placeholder="Username"
                type="text"
                id="inputUsernameLogin"
                className="input-login"
                value={username}
                style={{ borderColor: usernameError.length > 0 ? "red" : "" }}
                onChange={(text) => setUsername(text.target.value)}
            />

            {passwordError && <span className="error">{passwordError}</span>}
            <input required placeholder="Password"
                type="password"
                id="inputPasswordLogin"
                className="input-login"
                value={password}
                style={{ borderColor: passwordError.length > 0 ? "red" : "" }}
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