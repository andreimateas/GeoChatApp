import React, {useEffect, useRef, useState} from 'react';
import './Post.css';
import {UserController} from "../../../controller/UserController";
import {Link, useNavigate} from "react-router-dom";
import {useAuthContext} from "../../../auth/AuthProvider";
import User from "../../../controller/entities/User";


const Post = ({ post,postId,user, date, content, imagePath, likes, location, cont,onLikeButtonClick}) => {

    const [liked, setLiked] =useState(false);
    const [hasImage,setHasImage]= useState(false);
    const image = imagePath ? imagePath.split("\\")[2] : '';
    const imageFoundPathRef = useRef('');

    const [userImage,setUserImage]=useState("");

    const userImagePath= useRef('');

    const [userImagePathUpdated, setUserImagePathUpdated] = useState(false);

    const navigate = useNavigate();

    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const imageLoggedUser= fields[4].split("\\")[2];
    const loggedUser= new User(fields[0],"", fields[2], fields[1], imageLoggedUser, fields[3]);

    async function fetchData(){
        const userController = new UserController();
        let receivedUser= await userController.getUser(user);
        console.log("Received user from server: ", receivedUser);

        setUserImage(receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : "");
        userImagePath.current = require(`../../../images/${receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : ""}`);

        setUserImagePathUpdated(true);
    }

    useEffect(() => {
        fetchData();

    }, []);

    useEffect(() => {
        if (image) {
            try {
                imageFoundPathRef.current = require(`../../../images/${image}`);
                setHasImage(true);
            } catch (e) {
                setHasImage(false);
            }
        }
    }, [image]);

    function handleLikeButtonClick(){
        if(liked===false){
            setLiked(true);
            document.getElementById("btnLike"+cont).style.background="rgb(128,30,42)";
            document.getElementById("btnLike"+cont).textContent="Liked";
            document.getElementById("btnLike"+cont).style.textAlign="center";

            document.getElementById("txtLike"+cont).textContent=likes + 1;

            onLikeButtonClick(post,true);

        }
        else
        {
            setLiked(false);
            document.getElementById("btnLike"+cont).style.background="rgba(221, 85, 102, 1)";
            document.getElementById("btnLike"+cont).textContent="Like";
            document.getElementById("btnLike"+cont).style.textAlign="center";

            document.getElementById("txtLike"+cont).textContent=likes;

            onLikeButtonClick(post,false);

        }
    }


    function onConversationButtonClick() {
        navigate(`/messages/${user}`);
    }

    return (
        <div className="post">
            <div className="post-header">
                {(user!==loggedUser.username) ? <div className="user-container">
                    <div className={"user"}>
                        <Link to={`/messages/${user}`} className="messageLink">
                            <img src={userImagePath.current} className={"userImage"} alt={user}/>
                            <div className="post-user">{user}</div>
                        </Link>
                    </div>
                    <div className="start-conversation-box">
                        <button className="start-conversation-button" onClick={onConversationButtonClick}>Send message</button>
                    </div>
                </div> : <div className={"logged-user-div"}><img src={userImagePath.current} className={"userImage"} alt={user}/>
                    <div className="post-logged-user">You</div></div>}

                <div className="post-date">{date}</div>

            </div>
            <div className="post-content">{content}</div>
            {hasImage && <img src={imageFoundPathRef.current} alt={"Post"} className={"post-image"} />}
            <div className="post-footer">
                <button className="post-like-button" id={"btnLike"+cont} onClick={handleLikeButtonClick}>Like</button>
                <span className="post-likes" id={"txtLike"+cont}>{likes}</span>
            </div>
        </div>
    );
};

export default Post;