import "./NavBar.css"
import {Link} from "react-router-dom";
import React from "react";
import {useAuthContext} from "../../auth/AuthProvider";
import User from "../../controller/entities/User";


const NavBar=() =>{

    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];
    const user= new User(fields[0],"", fields[2], fields[1], image, fields[3]);
    const imagePath= require(`../../images/${image}`);
    const { logout } = useAuthContext();

    function handleLogout(){
        logout();
    }

    return(<div className="topnav">

        <img src={imagePath} alt="Profile" />

        <Link to="/userProfilePage">Profile</Link>
        <Link to="/userPage">Home</Link>
        <Link to="/userMessagePage">Messages</Link>
        <Link  id={"logoutButton"} onClick={handleLogout} to="/">Logout</Link>

    </div>);
}

export default NavBar;