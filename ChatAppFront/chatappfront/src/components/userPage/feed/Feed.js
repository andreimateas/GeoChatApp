import React from 'react';
import Post from './Post';
import "./Feed.css";

const Feed = ({ posts }) => {
    return (
        <div className={"parentFeed"}>
            {posts.map((post, index) => (
                <Post
                    key={post.postId}
                    user={post.username}
                    date={post.date}
                    content={post.contentText}
                    imagePath={post.contentImage}
                    likes={post.likes}
                    cont={index + 1}
                />
            ))}
        </div>
    );
};


export default Feed;