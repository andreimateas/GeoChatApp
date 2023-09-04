import React, {useEffect, useState, useRef} from "react";
import { useParams} from "react-router-dom";
import {useAuthContext} from "../../../auth/AuthProvider";
import {MessageController} from "../../../controller/MessageController";
import "./Messages.css";
import {UserController} from "../../../controller/UserController";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Swal from "sweetalert2";
import Message from "../../../controller/entities/Message";



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

    const [message, setMessage] = useState('');

    const [messageContent, setMessageContent] = useState('');

    /**
     * Formats a given date into a string with a specific format.
     * @param {Date} date - The date to be formatted.
     * @returns {string} The formatted date string.
     */
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const [reconnectAttempt, setReconnectAttempt] = useState(0);
    const MAX_RECONNECT_ATTEMPTS = 5;
    const RECONNECT_DELAY_MS = 3000;

    const socket = new SockJS('http://localhost:3001/ws');
    const stompClient = Stomp.over(socket);
    let isConnected = false;

    /**
     * Connects and manages the WebSocket connection with the server.
     */
    useEffect(() => {

        let reconnectTimeout;
        const connect = () => {
            stompClient.connect({}, () => {

                isConnected = true;
                console.log('WebSocket connected');
                stompClient.subscribe('/topic/updates', (response) => {
                    const data = JSON.parse(response.body);
                    setMessage(data);
                    fetchData();
                });
            });
        };

        const disconnect = () => {
            if (isConnected) {
                stompClient.disconnect(() => {
                    isConnected = false;
                    console.log('WebSocket disconnected');

                    if (reconnectAttempt < MAX_RECONNECT_ATTEMPTS) {
                        console.log('Attempting to reconnect...');
                        reconnectTimeout = setTimeout(() => {
                            setReconnectAttempt(reconnectAttempt + 1);
                            connect();
                        }, RECONNECT_DELAY_MS);
                    } else {
                        console.log('Exceeded maximum reconnect attempts.');
                    }
                });
            }
        };

        connect();

        return () => {
            clearTimeout(reconnectTimeout);
            disconnect();
        };
    }, [reconnectAttempt]);


    const sendMessage = (message) => {
        if (isConnected) {
            stompClient.send('/app/update', {}, JSON.stringify(message));
        } else {
            console.log('WebSocket connection is not established');
        }
    };

    /**
     * Fetches messages and user data from the server.
     */
    async function fetchData() {
        const controller = new MessageController();
        let messages = await controller.getMessagesByUsers(user1, user2);
        messages.forEach((x) => (x.date = x.date.replace(/T/g, ' ')));


        setMessageList(messages);

        const userController = new UserController();
        let receivedUser= await userController.getUser(user2);
        console.log("Received user from server: ", receivedUser);

        setConversationUser(receivedUser);

        setImage(receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : "");
        imagePath.current = require(`../../../images/${receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : ""}`);

        setImagePathUpdated(true);
    }

    /**
     * Scrolls the message container to the bottom, ensuring the latest messages are visible.
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });

    };

    /**
     * Initializes data fetching and scrolling when the component mounts.
     */
    useEffect(() => {
        const currentPagePath = window.location.pathname;
        sessionStorage.setItem(`currentPage${fields[0]}`, currentPagePath);
        document.getElementById("messageText").value="";
        fetchData();
        scrollToBottom();
    }, []);


    /**
     * Scrolls to the bottom of the message container whenever the message list updates.
     */
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    /**
     * Updates the user image path once when the component mounts.
     */
    useEffect(() => {
            setImagePathUpdated(true);
    }, []);

    /**
     * Handles the event when the send message button is clicked.
     */
    async function onSendMessageButtonClicked() {
        if(messageContent.length<1){
            await Swal.fire({
                title: "Message is too short!",
                icon: "error",
                color: '#A83140FF',
                confirmButtonColor: '#A83140FF',

            });
        }
        else{
            try{

                const controller= new MessageController();
                const dateNow= formatDate(new Date()).replace(' ', 'T');
                const msg= new Message(0, user1, user2, messageContent, dateNow);
                const token= await controller.addMessage(msg);
                console.log("Received token from server: " + token.string);
                fetchData();
                setMessageContent("");

            }catch(exception){
                console.log("error add message");
            }
        }

    }

    return (
        <div className="message-page-container">
            <p className="chat-title"></p>
            <div className="message-list-container">
                <ul className="message-list">
                    {messageList.map((messageContent, index) => (
                        <li
                            key={index}
                            className={`message-box_1 ${
                                messageContent.sender === user1 ? 'right-message' : 'left-message'
                            }`}
                        >
                            <p className="sender-tag">{
                                messageContent.sender === user1 ? '' : <img src={imagePath.current} className={"conversation-user-image"} alt={user2}/>
                            }</p>
                            <div
                                className={`message-bubble ${
                                    messageContent.sender === user1 ? 'right-bubble' : 'left-bubble'
                                }`}
                            >
                                <p className="message-content">{messageContent.content}</p>
                                <p className="message-date">{messageContent.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div ref={messagesEndRef} />
            </div>
            <div className="message-input-container">
                <textarea value={messageContent} className="message-text-area" id={"messageText"} placeholder="" onChange={(e)=>setMessageContent(e.target.value)}></textarea>
                <button type={"submit"} className="send-button" onClick={onSendMessageButtonClicked}>Send</button>
            </div>
        </div>
    );
}

export default Messages;