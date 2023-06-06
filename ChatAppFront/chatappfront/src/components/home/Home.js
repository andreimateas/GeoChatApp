import {Link, useNavigate} from "react-router-dom";
import React from 'react';

export default function Home(){


    return(<div>
       <div><Link to="/login">Login</Link></div>
        <div><Link to="/register">Register</Link></div>
    </div>);
}