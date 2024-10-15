import "./NavBar.css"
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../auth/AuthProvider";
import {UserController} from "../../controller/UserController";

const NavBar=() =>{

    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];

    const imagePath= require(`../../images/${image}`);
    const { logout } = useAuthContext();

    /**
     * Handles the logout action by calling the logout function.
     */
    async function handleLogout(){

        sessionStorage.removeItem(`currentPage${fields[0]}`);
        const controller= new UserController();
        const token= await controller.logout(userProfile.userString.split(",")[0]);
        console.log("Logout "+ token);
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