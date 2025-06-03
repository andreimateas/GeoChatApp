import {Link, useNavigate} from "react-router-dom";
import React from 'react';
import "./Home.css";
import {useAuthContext} from "../../auth/AuthProvider";

export default function Home(){

    const { userProfile } = useAuthContext();
    const fields = userProfile.userString.split(",");
    const navigate = useNavigate();

    function onAlreadyLoggedInClick() {
        const previousPath = sessionStorage.getItem(`currentPage${fields[0]}`);

        if (previousPath) {
                navigate(previousPath);
        } else {
                navigate('/userPage');
        }

    }

    return (
        <div className="home-page">
            <div className="home-page__content">
                <h1 className="home-page__heading">Welcome to GeoChat App!</h1>

                {(!Object.keys(sessionStorage).some(key => key.startsWith('currentPage'))) &&
                <div className="home-page__button1">
                <Link to="/login" className="home-page__link_login">Login</Link>
                </div>}

                {(!Object.keys(sessionStorage).some(key => key.startsWith('currentPage'))) &&
                <p className="home-page__text">Don't have an account yet?</p>}

                {(!Object.keys(sessionStorage).some(key => key.startsWith('currentPage'))
                    ) &&
                <div className="home-page__button2">
                    <Link to="/register" className="home-page__link_register">Register</Link>
                </div>}

                {(Object.keys(sessionStorage).some(key => key.startsWith('currentPage'))
                    ) &&
                    <>
                    <p className={"already-logged-in-text"}>You are already logged in</p>
                    <button className={"already-logged-in-button"} onClick={onAlreadyLoggedInClick}>
                     Back to your account
                    </button></>}

            </div>
        </div>
    );
}