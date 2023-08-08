import React, {useEffect, useRef, useState} from 'react';
import './Post.css';


const Post = ({ post,postId,user, date, content, imagePath, likes, location, cont,onLikeButtonClick}) => {

    const [liked, setLiked] =useState(false);
    const [hasImage,setHasImage]= useState(false);
    const image = imagePath ? imagePath.split("\\")[2] : '';
    const imageFoundPathRef = useRef('');

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

    return (
        <div className="post">
            <div className="post-header">
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