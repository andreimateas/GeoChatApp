import React, {useEffect, useState, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {navBarWrapper} from "../../navbar/navBarWrapper";
import {useAuthContext} from "../../../auth/AuthProvider";
import {MessageController} from "../../../controller/MessageController";
import "./Messages.css";
import {UserController} from "../../../controller/UserController";
import User from "../../../controller/entities/User";



const Messages = () => {
    const { userProfile } = useAuthContext();
    const fields = userProfile.userString.split(",");
    const user1 = fields[0];
    const { user2 } = useParams();

    const [messageList, setMessageList] = useState([]);
    const messagesEndRef = useRef(null);

    const [conversationUser, setConversationUser]= useState(null);
    const [image,setImage]=useState("");

    const imagePath= useRef('');

    const [imagePathUpdated, setImagePathUpdated] = useState(false);
    async function fetchData() {
        const controller = new MessageController();
        let messages = await controller.getMessagesByUsers(user1, user2);
        messages.forEach((x) => (x.date = x.date.replace(/T/g, ' ')));
        console.log("Received messages from server: ", messages);
        setMessageList(messages);

        const userController = new UserController();
        let receivedUser= await userController.getUser(user2);
        console.log("Received user from server: ", receivedUser);
        setConversationUser(receivedUser);
        setImage(receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : "");
        imagePath.current = require(`../../../images/${receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : ""}`);

        localStorage.setItem('imagePath', JSON.stringify(imagePath));
        setImagePathUpdated(true);
    }

    useEffect(() => {
        fetchData();
        scrollToBottom();
    }, []);


    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });

    };

    useEffect(() => {
        const storedImagePath = localStorage.getItem('imagePath');
        if (storedImagePath) {
            imagePath.current = JSON.parse(storedImagePath);
            setImagePathUpdated(true);
        }
    }, []);

    return (
        <div className="messagePageContainer">
            <p className="chatTitle"></p>
            <div className="messageListContainer">
                <ul className="messageList">
                    {messageList.map((message, index) => (
                        <li
                            key={index}
                            className={`messageBox1 ${
                                message.from === user1 ? 'rightMessage' : 'leftMessage'
                            }`}
                        >
                            <p className="fromTag">{
                                message.from === user1 ? '' : <img src={imagePath.current} className={"conversationUserImage"} alt={user2}/>
                            }</p>
                            <div
                                className={`messageBubble ${
                                    message.from === user1 ? 'rightBubble' : 'leftBubble'
                                }`}
                            >

                                <p className="messageContent">{message.content}</p>
                                <p className="messageDate">{message.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div ref={messagesEndRef} />
            </div>
            <div className="messageInputContainer">
                <textarea className="messageTextArea" placeholder=""></textarea>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
}

const MessagesWrapped=navBarWrapper(Messages);
export default MessagesWrapped;