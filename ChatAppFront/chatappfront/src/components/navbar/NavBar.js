import "./NavBar.css"
import {Link} from "react-router-dom";
import React from "react";


const NavBar=() =>{


    return(<div className="topnav">

        <Link to="/userPage">Home</Link>

        <Link to="/userProfilePage">Profile</Link>

        <Link to="/userMessagePage">Messages</Link>
    </div>);
}

export default NavBar;