import React, {useEffect, useRef, useState} from "react";
import {useAuthContext} from "../../auth/AuthProvider";
import {Link, useNavigate} from "react-router-dom";
import {UserController} from "../../controller/UserController";
import User from "../../controller/entities/User";
import Swal from "sweetalert2";
import "./Register.css";


export default function Register() {

    const [username, setUsername] =useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] =useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] =useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] =useState('');
    const [nameError, setNameError] = useState('');
    const [profilePicture, setProfilePicture] =useState('');
    const [profilePictureError, setProfilePictureError] = useState('');
    const [location, setLocation] =useState('');
    const [locationError, setLocationError] = useState('');
    const [userString, setUserString] =useState('');
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

    function validateEmail() {
        return validateField(email, /^[a-zA-Z0-9]{1,50}@[a-zA-Z0-9]{1,50}.[a-zA-Z]{2,5}$/);
    }

    function validateName() {
        return validateField(name, /^[a-z ,.'-]+$/i);
    }

    function validateProfilePicture() {
        return profilePicture.length>0;
    }

    function validateLocation() {
        return validateField(location, /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
    }

    function parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    async function onRegisterButtonClicked(){

        resetErrorFlags();

        if (!validateUsername()) {
            setUsernameError("Allowed username characters: letters,digits, -, _");
            anyError.current = true;
        }

        if (!validatePassword()) {
            setPasswordError("Password should be between 5 and 50 characters long");
            anyError.current = true;
        }

        if (!validateEmail()) {
            setEmailError("Enter a valid email address");
            anyError.current = true;
        }

        if (!validateName()) {
            setNameError("Enter a valid name");
            anyError.current = true;
        }

        if (!validateProfilePicture()) {
            setProfilePictureError("You must select a profile picture");
            anyError.current = true;
        }

        if (!validateLocation()) {
            setLocationError("Enter a valid city");
            anyError.current = true;
        }

        if(!anyError.current) {
            try {
                console.log("start register:" + username + "++++");

                const controller = new UserController();
                const user = new User(username, password, email, name, profilePicture, location);
                const token = await controller.register(user);
                console.log("Received token from server: " + token.string);

                const jsonToken = parseJwt(token.string);
                console.log("Parsed token: " + jsonToken);

                console.log("User data as string: " + jsonToken["sub"]);

                const fields = jsonToken["sub"].split(",");
                const foundUser = new User(fields[0], "", fields[2], fields[1], fields[4], fields[3]);
                console.log("User registered: " + foundUser);
                setUserString(jsonToken["sub"]);


                console.log("A mers: " + user);

                console.log("go to user page");
                console.log("changed to user page");

            } catch (exception) {
                console.log("error");
                await Swal.fire({
                    title: "Username already taken",
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
            login({ userString });
            navigate('/userPage');
        }
    }, [userString, login, navigate]);

    return (
        <div className="registerDiv">


            {usernameError && <span className="error" >{usernameError}</span>}
                <input required placeholder={"Username"}
                    type="text"
                    id="inputUsername"
                    className="inputField"
                    value={username}
                    style={{ borderColor: usernameError.length > 0 ? "red" : "" }}
                    onChange={(e) => setUsername(e.target.value)}
                />


            {passwordError && <span className="error">{passwordError}</span>}
                <input required placeholder={"Password"}
                    type="password"
                    id="inputPassword"
                    className="inputField"
                    value={password}
                    style={{ borderColor: passwordError.length > 0 ? "red" : "" }}
                    onChange={(e) => setPassword(e.target.value)}
                />


            {emailError && <span className="error">{emailError}</span>}
                <input required placeholder={"Email"}
                    type="email"
                    id="inputEmail"
                    className="inputField"
                    value={email}
                    style={{ borderColor: emailError.length > 0 ? "red" : "" }}
                    onChange={(e) => setEmail(e.target.value)}
                />


            {nameError && <span className="error">{nameError}</span>}
                <input required placeholder={"Name"}
                    type="text"
                    id="inputName"
                    className="inputField"
                    value={name}
                    style={{ borderColor: nameError.length > 0 ? "red" : "" }}
                    onChange={(e) => setName(e.target.value)}
                />


            {locationError && <span className="error">{locationError}</span>}
                <input required placeholder={"Location"}
                   type="text"
                   id="inputLocation"
                   className="inputField"
                   value={location}
                   style={{ borderColor: locationError.length > 0 ? "red" : "" }}
                   onChange={(e) => setLocation(e.target.value)}
                />


                <p>Profile picture</p>
            {profilePictureError && <span className="error">{profilePictureError}</span>}
                <input required placeholder={"Profile picture"}
                    type="file"
                    id="inputProfilePicture"
                    className="inputField"
                    value={profilePicture}
                    style={{ borderColor: profilePictureError.length > 0 ? "red" : "" }}
                    onChange={(e) => setProfilePicture(e.target.value)}
                />


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