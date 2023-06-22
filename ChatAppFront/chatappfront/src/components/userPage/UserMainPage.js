
import {navBarWrapper} from "../navbar/navBarWrapper";
import "./UserMainPage.css";
import Feed from "./feed/Feed";
import {useEffect, useState} from "react";
import {FeedPostController} from "../../controller/FeedPostController";



const UserMainPage=()=> {

    const [feedPosts, setFeedPosts]= useState([]);

    useEffect( () => {
        async function fetchData() {

        const controller = new FeedPostController();
        const feedPosts = await controller.getFeedPosts();

        console.log("Received feed posts from server: " + feedPosts);

        setFeedPosts(feedPosts);
    }
    fetchData();
    }, []); // Empty dependency array ensures the effect runs only once


    return (
        <div className={"mainDiv1"}>
            <div className={"feed1"}>

            <h1 className={"feedHeader1"}>YOUR FEED</h1>

                <div className={"add-post-div"}>
                    <textarea className={"add-post-textarea"}
                        placeholder="Write your post..."
                    ></textarea>
                    <label className={"file-input-label"}>
                        Image
                        <input type="file" className={"add-post-file-input"}  />
                    </label>
                    <button type="submit" className={"add-post-button"} >Post</button>
                </div>

                <Feed posts={feedPosts} />

            </div>
        </div>
    );
}

const UserMainPageWrapped = navBarWrapper(UserMainPage);
export default UserMainPageWrapped;