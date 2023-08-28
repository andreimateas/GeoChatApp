import "./Routes.css";
import {useNavigate} from "react-router-dom";
import React from "react";

const NotFound = () => {

    const navigate= useNavigate();

    return(<div>
        <h1 className={"routeText404"}>404</h1>
        <h2 className={"routeText"}>Not found</h2>
        <button onClick={() => {
            navigate('/');
        }}>
            Back to home page</button>

    </div>);

};

export default NotFound;