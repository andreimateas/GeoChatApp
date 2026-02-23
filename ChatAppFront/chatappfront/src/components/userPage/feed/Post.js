import React, {useEffect, useRef, useState} from 'react';
import './Post.css';
import {UserController} from "../../../controller/UserController";
import {Link, useNavigate} from "react-router-dom";
import {useAuthContext} from "../../../auth/AuthProvider";
import User from "../../../controller/entities/User";
import {FeedPostController} from "../../../controller/FeedPostController";
import UserLike from "../../../controller/entities/UserLike";


const Post = ({ post,postId,user, date, content, imagePath, likes, location, cont, isLiked}) => {

    const [liked, setLiked] =useState(isLiked);
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

    /**
     * Fetches user data from the server and updates the component's state.
     */
    async function fetchData(){
        const userController = new UserController();
        let receivedUser= await userController.getUser(user);
        console.log("Received user from server: ", receivedUser);

        setUserImage(receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : "");
        userImagePath.current = require(`../../../images/${receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : ""}`);

        setUserImagePathUpdated(true);
    }

    /**
     * Component effect: Fetches user data and updates user image path.
     */
    useEffect(() => {
        fetchData();

    }, []);

    /**
     * Component effect: Updates image path when the 'image' prop changes.
     */
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


    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);

    /**
     * Handles the like button click event.
     */
    async function handleLikeButtonClick() {

        const controller = new FeedPostController();
        const feedPost = post;
        const date = new Date(feedPost.date);
        feedPost.date = formatDate(date).replace(' ', 'T');

        if (liked === false) {
            setLiked(true)
            const token = await controller.addUserLike(new UserLike(1, loggedUser, feedPost));


        } else {
            setLiked(false);
            const token = await controller.removeUserLike(new UserLike(1, loggedUser, feedPost));

        }
    }

    /**
     * Handles the start conversation button click event.
     */
    function onConversationButtonClick() {
        navigate(`/messages/${user}`);
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className="post">
            <div className="post-header">
                {(user!==loggedUser.username) ? <div className="user-container">
                    <div className={"user"}>
                        <Link to={`/messages/${user}`} className="message-link">
                            <img src={userImagePath.current} className={"user-image"} alt={user}/>
                            <div className="post-user">{user}</div>
                        </Link>
                    </div>
                    <div className="start-conversation-box">
                        <button className="start-conversation-button" onClick={onConversationButtonClick}>Send message</button>
                    </div>
                </div> : <div className={"logged-user-div"}><img src={userImagePath.current} className={"user-image"} alt={user}/>
                    <div className="post-logged-user">You</div></div>}

                <div className="post-date">{date}</div>

            </div>
            <div className="post-content">{content}</div>
            {hasImage && <img src={imageFoundPathRef.current} alt={"Post"} className={"post-image"} />}
            <div className="post-footer">
                {!liked && <button className="post-like-button-like" id={"btnLike"+cont} onClick={handleLikeButtonClick}>Like</button>}
                {liked && <button className="post-like-button-liked" id={"btnLike"+cont} onClick={handleLikeButtonClick}>Liked</button>}
                <span className="post-likes" id={"txtLike"+cont}>{likes}</span>
            </div>
        </div>
    );
};

export default Post;