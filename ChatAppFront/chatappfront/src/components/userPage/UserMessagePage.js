import "./UserMessagePage.css";

import {useAuthContext} from "../../auth/AuthProvider";
import User from "../../controller/entities/User";
import React, {useEffect, useRef, useState} from "react";

import {MessageController} from "../../controller/MessageController";
import {Link} from "react-router-dom";
import {UserController} from "../../controller/UserController";


const UserMessagePage=()=> {

    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];
    const user= new User(fields[0],"", fields[2], fields[1], image, fields[3]);

    const [messageList,setMessageList]= useState([]);
    const [userMessageList,setUserMessageList]=useState([]);

    const imagePaths= useRef([]);

    const [imagePathsUpdated, setImagePathsUpdated] = useState(false);

    /**
     * Fetches messages and user information from the server.
     */
    async function fetchData() {
        const controller = new MessageController();
        let messages = await controller.getMessages();
        let userArray=[];
        for(let msg of messages){

            if(msg.sender===user.username){
                userArray.push([msg.receiver,msg.content,msg.date,msg.sender]);
            }
            if(msg.receiver===user.username){
                userArray.push([msg.sender,msg.content,msg.date,msg.sender]);
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

        messages.forEach((x) => (x.date = x.date.replace(/T/g, ' ')));
        console.log("Received messages from server ");
        setMessageList(messages);
        setUserMessageList(filteredUsers);

        const imagePromises = filteredUsers.map(async (currentUser) => {
            const userController = new UserController();
            const receivedUser = await userController.getUser(currentUser[0]);
            return require(`../../images/${receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : ""}`);
        });

        imagePaths.current = await Promise.all(imagePromises);

        setImagePathsUpdated(true);
    }

    useEffect( () => {
        const currentPagePath = window.location.pathname;
        sessionStorage.setItem(`currentPage${fields[0]}`, currentPagePath);
        fetchData();
    }, []);



    return (
        
        <div className="main-div">
            <ul className="user-message-list">
                <div className={"title-div"}>
                    <h1 className={"title-header"}>
                        Your chats
                    </h1>
                </div>
                {userMessageList.map((currentUser, index) => (
                    <li key={index} className="message-box">

                        <Link to={`/messages/${currentUser[0]}`} className="message-link">

                            <div className="message-preview">
                                <img src={imagePaths.current[index]} className={"conversation-user-image"} alt={"userProfile"}/>
                                <p className="message-sender">{currentUser[0]}</p>
                                <p className="message-content_1">{(currentUser[3]===user.username ? "You:" : "")} {currentUser[1]}</p>
                                <p className="message-date">{currentUser[2].replace(/T/g, ' ')}</p>
                            </div>

                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserMessagePage;