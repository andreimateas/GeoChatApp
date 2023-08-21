import "./UserMessagePage.css";

import {navBarWrapper} from "../navbar/navBarWrapper";
import {useAuthContext} from "../../auth/AuthProvider";
import User from "../../controller/entities/User";
import {useEffect, useState} from "react";

import {MessageController} from "../../controller/MessageController";
import {Link} from "react-router-dom";


const UserMessagePage=()=> {

    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];
    const user= new User(fields[0],"", fields[2], fields[1], image, fields[3]);

    const [messageList,setMessageList]= useState([]);
    const [userMessageList,setUserMessageList]=useState([]);

    async function fetchData() {
        const controller = new MessageController();
        let messages = await controller.getMessages();
        let userArray=[];
            for(let msg of messages){

                    if(msg.from===user.username){
                        userArray.push([msg.to,msg.content,msg.date,msg.from]);
                    }
                    if(msg.to===user.username){
                        userArray.push([msg.from,msg.content,msg.date,msg.from]);
                    }
            }
        userArray=userArray.reverse();
        let userSet=new Set();
        let filteredUsers=[]
        for(const arr of userArray){
            if(!userSet.has(arr[0])){
                userSet.add(arr[0])
                filteredUsers.push(arr);
            }
        }


        console.log("User set: "+userArray);

        messages.forEach((x) => (x.date = x.date.replace(/T/g, ' ')));
        console.log("Received messages from server: ", messages);
        setMessageList(messages);
        setUserMessageList(filteredUsers);
    }

    useEffect( () => {
        fetchData();
    }, []);

    return (
        <div className="mainDiv">
            <ul className="userMessageList">
                {userMessageList.map((currentUser, index) => (
                    <li key={index} className="messageBox">
                        <Link to={`/messages/${currentUser[0]}`} className="messageLink">
                            <div className="messagePreview">
                                <p className="messageFrom">{currentUser[0]}</p>
                                <p className="messageContent1">{(currentUser[3]===user.username ? "You" : currentUser[3])}: {currentUser[1]}</p>
                            </div>
                            <p className="messageDate">Date: {currentUser[2].replace(/T/g, ' ')}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const UserMessagePageWrapped = navBarWrapper(UserMessagePage);
export default UserMessagePageWrapped;