import React, {useEffect, useRef, useState} from 'react';
import './Post.css';
import {UserController} from "../../../controller/UserController";


const Post = ({ post,postId,user, date, content, imagePath, likes, location, cont,onLikeButtonClick}) => {

    const [liked, setLiked] =useState(false);
    const [hasImage,setHasImage]= useState(false);
    const image = imagePath ? imagePath.split("\\")[2] : '';
    const imageFoundPathRef = useRef('');

    const [userImage,setUserImage]=useState("");

    const userImagePath= useRef('');

    const [userImagePathUpdated, setUserImagePathUpdated] = useState(false);


    async function fetchData(){
        const userController = new UserController();
        let receivedUser= await userController.getUser(user);
        console.log("Received user from server: ", receivedUser);

        setUserImage(receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : "");
        userImagePath.current = require(`../../../images/${receivedUser.profilePicture ? receivedUser.profilePicture.split("\\")[2] : ""}`);

        localStorage.setItem('userImagePath', JSON.stringify(userImagePath));
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

    useEffect(() => {
        const storedImagePath = localStorage.getItem('userImagePath');
        if (storedImagePath) {
            userImagePath.current = JSON.parse(storedImagePath);
            setUserImagePathUpdated(true);
        }
    }, []);

    return (
        <div className="post">
            <div className="post-header">
                <img src={userImagePath.current} className={"userImage"} alt={user}/>
                <div className="post-user">{user}</div>
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