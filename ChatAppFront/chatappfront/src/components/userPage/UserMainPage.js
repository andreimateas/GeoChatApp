//import { useAuthContext } from '../../auth/AuthProvider';
//import User from "../../controller/entities/User";
import {navBarWrapper} from "../navbar/navBarWrapper";
import "./UserMainPage.css";
import FeedPost from "../../controller/entities/FeedPost";
import Feed from "./feed/Feed";


const UserMainPage=()=> {
   // const { userProfile } = useAuthContext();

  //  const fields= userProfile.userString.split(",");
   // const image= fields[4].split("\\")[2];
   // const user= new User(fields[0],"", fields[2], fields[1], image, fields[3]);

    const mock_feedPosts = [
        new FeedPost(1, 'ilie', 'Contrary to popular belief, Lorem Ipsum is not simply random text.','C:\\fakepath\\post1.jpg',new Date().toLocaleString(),10),
        new FeedPost(2, 'ion', 'Here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.','C:\\fakepath\\post2.jpg',new Date().toLocaleString(),11),
        new FeedPost(3, 'andrei', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','C:\\fakepath\\post3.jpg',new Date().toLocaleString(),30),
    ];

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
                    <button className={"add-post-button"} >Post</button>
                </div>

                <Feed posts={mock_feedPosts} />

            </div>
        </div>
    );
}

const UserMainPageWrapped = navBarWrapper(UserMainPage);
export default UserMainPageWrapped;