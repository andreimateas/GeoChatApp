import "./Routes.css";
import {useNavigate} from "react-router-dom";
import React from "react";

const NotFound = () => {

    const navigate= useNavigate();

    return(<div>
        <h1 className={"route-text_404"}>404</h1>
        <h2 className={"route-text"}>Not found</h2>
        <button onClick={() => {
            navigate('/');
        }}>
            Back to home page</button>

    </div>);

};

export default NotFound;