import {Link} from "react-router-dom";
import React from 'react';
import "./Home.css";

export default function Home(){

    const time=new Date();
    console.log("TIME IS:  "+time);

    return (
        <div className="home-page">
            <div className="home-page__content">
                <h1 className="home-page__heading">Welcome to GeoChat App!</h1>

                <div className="home-page__button">
                    <Link to="/login" className="home-page__link_login">Login</Link>
                </div>
                <p className="home-page__text">Don't have an account yet?</p>
                <div className="home-page__button">
                    <Link to="/register" className="home-page__link_register">Register</Link>
                </div>
            </div>
        </div>
    );
}