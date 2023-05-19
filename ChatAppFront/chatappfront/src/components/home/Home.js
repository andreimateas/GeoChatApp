import {Link, useNavigate} from "react-router-dom";
import React from 'react';

export default function Home(){

    const navigate = useNavigate();

    return(<div>
       <div><Link to="/login">Login</Link></div>
        <div><Link to="/register">Register</Link></div>
        <button onClick={()=>navigate("/userPage")}/>
    </div>);
}