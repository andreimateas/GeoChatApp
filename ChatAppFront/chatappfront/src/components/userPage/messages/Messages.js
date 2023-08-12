import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {navBarWrapper} from "../../navbar/navBarWrapper";
import {useAuthContext} from "../../../auth/AuthProvider";
import {MessageController} from "../../../controller/MessageController";
import "./Messages.css";



const Messages=()=> {

    const { userProfile } = useAuthContext();
    const fields= userProfile.userString.split(",");
    const user1= fields[0];
    const {user2} = useParams();

    const [messageList,setMessageList]= useState([]);


    async function fetchData() {
        const controller = new MessageController();
        let messages = await controller.getMessagesByUsers(user1,user2);
        messages.forEach((x) => (x.date = x.date.replace(/T/g, ' ')));
        console.log("Received messages from server: ", messages);
        setMessageList(messages);

    }

    useEffect( () => {
        fetchData();
    }, []);

    return (
        <div className="mainDiv">
            <ul className="messageList">
                {messageList.map((message, index) => (
                    <li key={index} className="messageBox">
                        <p className="messageFrom">{message.from}</p>
                        <p className="messageContent">{message.content}</p>
                        <p className="messageDate">Date: {message.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const MessagesWrapped=navBarWrapper(Messages);
export default MessagesWrapped;