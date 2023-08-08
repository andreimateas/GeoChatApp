import React from 'react';
import Post from './Post';
import "./Feed.css";

const Feed = ({ posts , onLikeButtonClick}) => {
    return (
        <div className={"parentFeed"}>
            {posts.map((post, index) => (
                <Post
                    key={post.postId}
                    post={post}
                    postId={post.postId}
                    user={post.username}
                    date={post.date}
                    content={post.contentText}
                    imagePath={post.contentImage}
                    likes={post.likes}
                    location={post.location}
                    cont={index + 1}
                    onLikeButtonClick={onLikeButtonClick}
                />
            ))}
        </div>
    );
};


export default Feed;