import React, {useEffect, useState, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {navBarWrapper} from "../../navbar/navBarWrapper";
import {useAuthContext} from "../../../auth/AuthProvider";
import {MessageController} from "../../../controller/MessageController";
import "./Messages.css";
import {UserController} from "../../../controller/UserController";
import User from "../../../controller/entities/User";
import SockJS from "sockjs-client";
import {over} from "stompjs";
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

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const [date, setDate] =useState(formatDate(new Date()).replace(' ', 'T'));

    const socket = new SockJS('http://localhost:3001/ws');
    const stompClient = over(socket);
    let isConnected = false;

    useEffect(() => {
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
                });
            }
        };

        connect();

        return disconnect;
    }, []);


    const sendMessage = (message) => {
        if (isConnected) {
            stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
        } else {
            console.log('WebSocket connection is not established');
        }
    };

    async function fetchData() {
        const controller = new MessageController();
        let messages = await controller.getMessagesByUsers(user1, user2);
        messages.forEach((x) => (x.date = x.date.replace(/T/g, ' ')));
        console.log("Received messages from server: ", messages);
        messages= messages.sort(x=>x.date);
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
        document.getElementById("messageText").value="";
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

    async function onSendMessageButtonClicked() {
        if(message.length<1){
            await Swal.fire({
                title: "Message is too short!",
                icon: "error",
                color: '#A83140FF',
                confirmButtonColor: '#A83140FF',

            });
        }
        else{
            try{
                setDate(formatDate(new Date()).replace(' ', 'T'));
                const controller= new MessageController();
                const msg= new Message(0, user1, user2, message, date);
                const token= await controller.addMessage(msg);
                console.log("Received token from server: " + token.string);
                fetchData();
                setMessage("");

            }catch(exception){
                console.log("error add message");
            }
        }

    }

    return (
        <div className="messagePageContainer">
            <p className="chatTitle"></p>
            <div className="messageListContainer">
                <ul className="messageList">
                    {messageList.map((message, index) => (
                        <li
                            key={index}
                            className={`messageBox1 ${
                                message.sender === user1 ? 'rightMessage' : 'leftMessage'
                            }`}
                        >
                            <p className="senderTag">{
                                message.sender === user1 ? '' : <img src={imagePath.current} className={"conversationUserImage"} alt={user2}/>
                            }</p>
                            <div
                                className={`messageBubble ${
                                    message.sender === user1 ? 'rightBubble' : 'leftBubble'
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
                <textarea className="messageTextArea" id={"messageText"} placeholder="" onChange={(e)=>setMessage(e.target.value)}></textarea>
                <button className="sendButton" onClick={onSendMessageButtonClicked}>Send</button>
            </div>
        </div>
    );
}

const MessagesWrapped=navBarWrapper(Messages);
export default MessagesWrapped;