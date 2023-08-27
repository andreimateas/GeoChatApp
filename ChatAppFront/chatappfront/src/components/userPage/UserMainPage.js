
import {navBarWrapper} from "../navbar/navBarWrapper";
import "./UserMainPage.css";
import Feed from "./feed/Feed";
import React, {useEffect, useRef, useState} from "react";
import {FeedPostController} from "../../controller/FeedPostController";
import {useAuthContext} from "../../auth/AuthProvider";
import FeedPost from "../../controller/entities/FeedPost";
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import MyMap from "./MyMap";
import Swal from "sweetalert2";
import User from "../../controller/entities/User";

const UserMainPage=()=> {

    const { userProfile } = useAuthContext();
    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];
    const userFull= new User(fields[0],"", fields[2], fields[1], image, fields[3]);
    const user= fields[0];

    const [message, setMessage] = useState('');


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

    const [feedPosts, setFeedPosts]= useState([]);



    const [username, setUsername] =useState('');
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const [contentText, setContentText] =useState('');
    const [contentImage, setContentImage] =useState('');
    const [postLocation, setPostLocation]= useState(userFull.location);
    const currentCounty= useRef(null);


    function removeDiacritics(str) {
        const diacriticsMap = {
            'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
            'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T', 'ş': 's'
        };

        return str.replace(/[ăâîșțĂÂÎȘȚş]/g, match => diacriticsMap[match]);
    }
    async function fetchData() {
        const controller = new FeedPostController();
        let feedPosts = await controller.getFeedPosts();
        console.log("Current county: "+currentCounty.current.textContent);
        console.log("Received feed posts from server 1: ");
        let filteredPosts=[];
        if(currentCounty.current.textContent!==""){
            for(let post of feedPosts){

                if(removeDiacritics(post.location)===removeDiacritics(currentCounty.current.textContent)) {
                    filteredPosts.push(post);
                }
            }
            feedPosts=filteredPosts;
        }

        feedPosts.forEach((x) => (x.date = x.date.replace(/T/g, ' ')));
        console.log("Received feed posts from server 2: ");
        setFeedPosts(feedPosts);
        setUsername(user);
    }

    useEffect( () => {
        document.getElementById("postText").value="";
        fetchData();
    }, []);


    async function onAddPostButtonClicked(){
        if(contentText.length<5){
            await Swal.fire({
                title: "Post is too short!",
                icon: "error",
                color: '#A83140FF',
                confirmButtonColor: '#A83140FF',

            });
        }
        else{
            try{

                const controller= new FeedPostController();
                const dateNow= formatDate(new Date()).replace(' ', 'T');
                const contentImageFileName = contentImage ? ("C:\\fakepath\\"+contentImage.name) : '';
                const feedPost= new FeedPost(username+dateNow,username,contentText,contentImageFileName,dateNow,0,currentCounty.current.textContent);
                const token= await controller.addFeedPost(feedPost);
                console.log("Received token from server: "+token.string);
                fetchData();
                setContentText("");

            }catch(exception){
                console.log("error add post");
            }
        }
    }

    const updateLikes = async (post,liked) => {
        try {
            const controller= new FeedPostController();
            const feedPost= post;
            const date= new Date(feedPost.date);
            feedPost.date=formatDate(date).replace(' ', 'T');
            if(liked===true){
                feedPost.likes++;
            }
            else{
                feedPost.likes--;
            }
            const token= await controller.addFeedPost(feedPost);
            console.log("Received token from server: "+token.string);
            fetchData();

        } catch (exception) {
            console.log("error like post"+exception);
        }
    }

    const fetchMap = async (post,liked) => {
        await fetchData();
    }


    function handlePostImageChange(e) {
        try {
            const fileInput = e.target;
            const fileLabel = document.getElementById('fileLabelText');

            if (fileInput.files.length > 0) {
                fileLabel.textContent = fileInput.files[0].name;
                setContentImage(fileInput.files[0]);
            } else {
                fileLabel.textContent = 'Select image';
                setContentImage(null);
            }
        } catch (e) {
            console.log("Error uploading post image: " + e);
        }
    }

    return (
        <div className={"mainDiv1"}>
            <div className={"feed1"}>

                <h1 className={"feedHeader1"}>YOUR FEED</h1>
                <h2 ref={currentCounty} id={"cityHeader"} ></h2>

                <div id="map" style={{ width: '95%', height: '500px', alignContent: 'center'}}><MyMap initialLocation={userFull.location} onMapChange={fetchMap}/></div>

                <div className={"add-post-div"}>
                    <textarea id={"postText"} value={contentText}
                              onChange={(e) => setContentText(e.target.value)} className={"add-post-textarea"}
                              placeholder="Write your post..."
                    ></textarea>
                    <label className={"file-input-label"}>
                        <span className={"input-label-text1"} id="fileLabelText">Select image</span>
                        <input onChange={handlePostImageChange} type="file" className={"add-post-file-input"}  />
                    </label>
                    <button type="submit" className={"add-post-button"}  onClick={onAddPostButtonClicked}>Post</button>

                </div>

                <Feed posts={feedPosts} onLikeButtonClick={updateLikes}/>

            </div>
        </div>
    );
}

const UserMainPageWrapped = navBarWrapper(UserMainPage);
export default UserMainPageWrapped;