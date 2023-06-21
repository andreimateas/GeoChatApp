import React from 'react';
import './Post.css';


const Post = ({ user, date, content, imagePath, likes }) => {


    const image= imagePath.split("\\")[2];
    const imageFoundPath= require(`../../../images/${image}`);

    return (
        <div className="post">
            <div className="post-header">
                <div className="post-user">{user}</div>
                <div className="post-date">{date}</div>
            </div>
            <div className="post-content">{content}</div>
            <img src={imageFoundPath} alt={"Post"} className={"post-image"} />
            <div className="post-footer">
                <button className="post-like-button">Like</button>
                <span className="post-likes">{likes}</span>
            </div>
        </div>
    );
};

export default Post;