import "./Routes.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import "./AccessDenied.css";

const AccessDenied = () => {

    const navigate= useNavigate();

    return (
        <div className="access-denied-container">
            <h1 className="route-text">Access denied</h1>
            <button onClick={() => navigate('/')}>
                Back to home page
            </button>
        </div>
    );

};

export default AccessDenied;
