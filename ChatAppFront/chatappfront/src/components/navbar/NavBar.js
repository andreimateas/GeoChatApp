import "./NavBar.css"
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../auth/AuthProvider";

const NavBar=() =>{

    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];

    const imagePath= require(`../../images/${image}`);
    const { logout } = useAuthContext();

    /**
     * Handles the logout action by calling the logout function.
     */
    function handleLogout(){
        sessionStorage.removeItem(`currentPage${fields[0]}`);
        logout();
    }

    return(<div className="topnav">

        <img src={imagePath} alt="Profile" />

        <Link id={"profile"} to="/userProfilePage">Profile</Link>
        <Link id={"feed"} to="/userPage">Feed</Link>
        <Link id={"chats"} to={"/userMessagePage"}>Chats</Link>
        <Link id={"logoutButton"}  onClick={handleLogout} to="/">Logout</Link>

    </div>);
}

export default NavBar;