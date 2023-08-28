import "./Routes.css";
import React from "react";
import {useNavigate} from "react-router-dom";


const AccessDenied = () => {

    const navigate= useNavigate();

    return(<div>
        <h1 className={"routeText"}>Access denied</h1>
        <button onClick={() => {
            navigate('/');
        }}>
            Back to home page</button>

    </div>);

};

export default AccessDenied;
