import React, {useEffect, useState, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {navBarWrapper} from "../../navbar/navBarWrapper";
import {useAuthContext} from "../../../auth/AuthProvider";
import {MessageController} from "../../../controller/MessageController";
import "./Messages.css";



const Messages = () => {
    const { userProfile } = useAuthContext();
    const fields = userProfile.userString.split(",");
    const user1 = fields[0];
    const { user2 } = useParams();

    const [messageList, setMessageList] = useState([]);
    const messagesEndRef = useRef(null);

    async function fetchData() {
        const controller = new MessageController();
        let messages = await controller.getMessagesByUsers(user1, user2);
        messages.forEach((x) => (x.date = x.date.replace(/T/g, ' ')));
        console.log("Received messages from server: ", messages);
        setMessageList(messages);
    }

    useEffect(() => {
        fetchData();
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="messagePageContainer">
            <p className="chatTitle">Chat with: {user2}</p>
            <div className="messageListContainer">
                <ul className="messageList">
                    {messageList.map((message, index) => (
                        <li
                            key={index}
                            className={`messageBox1 ${
                                message.from === user1 ? 'rightMessage' : 'leftMessage'
                            }`}
                        >
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
                <textarea className="messageTextArea" placeholder="Type a message..."></textarea>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
}

const MessagesWrapped=navBarWrapper(Messages);
export default MessagesWrapped;