import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {navBarWrapper} from "../../navbar/navBarWrapper";
import {useAuthContext} from "../../../auth/AuthProvider";
import User from "../../../controller/entities/User";




const Messages=()=> {

    const { userProfile } = useAuthContext();
    const fields= userProfile.userString.split(",");
    const user1= fields[0];
    const {user2} = useParams();


    return (
        <div className={"mainDiv"}>
        <p>User1: {user1}</p>
        <p>User2: {user2}</p>
        </div>
    );
}

const MessagesWrapped=navBarWrapper(Messages);
export default MessagesWrapped;