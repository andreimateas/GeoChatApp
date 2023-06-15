import {Link} from "react-router-dom";
import React from 'react';
import "./Home.css";

export default function Home(){


    return (
        <div className="home-page">
            <div className="home-page__content">
                <h1 className="home-page__heading">Welcome to ChatApp!</h1>

                <div className="home-page__button">
                    <Link to="/login" className="home-page__link">Login</Link>
                </div>
                <p className="home-page__text">Don't have an account yet?</p>
                <div className="home-page__button">
                    <Link to="/register" className="home-page__link">Register</Link>
                </div>
            </div>
        </div>
    );
}