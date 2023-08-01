import React, {useState} from 'react';
import './Post.css';


const Post = ({ user, date, content, imagePath, likes, cont}) => {


    const image= imagePath.split("\\")[2];
    const imageFoundPath= require(`../../../images/${image}`);
    const [liked, setLiked] =useState(false);
    function onLikeButtonClick(){
        if(liked===false){
            setLiked(true);
            document.getElementById("btnLike"+cont).style.background="rgb(128,30,42)";
            document.getElementById("btnLike"+cont).textContent="Liked";
            document.getElementById("btnLike"+cont).style.textAlign="center";

            document.getElementById("txtLike"+cont).textContent=likes + 1;
        }
        else
        {
            setLiked(false);
            document.getElementById("btnLike"+cont).style.background="rgba(221, 85, 102, 1)";
            document.getElementById("btnLike"+cont).textContent="Like";
            document.getElementById("btnLike"+cont).style.textAlign="center";

            document.getElementById("txtLike"+cont).textContent=likes;
        }
    }

    return (
        <div className="post">
            <div className="post-header">
                <div className="post-user">{user}</div>
                <div className="post-date">{date}</div>
            </div>
            <div className="post-content">{content}</div>
            <img src={imageFoundPath} alt={"Post"} className={"post-image"} />
            <div className="post-footer">
                <button className="post-like-button" id={"btnLike"+cont} onClick={onLikeButtonClick}>Like</button>
                <span className="post-likes" id={"txtLike"+cont}>{likes}</span>
            </div>
        </div>
    );
};

export default Post;