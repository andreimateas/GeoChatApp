import { useAuthContext } from '../../auth/AuthProvider';
import User from "../../controller/entities/User";
import {navBarWrapper} from "../navbar/navBarWrapper";
import "./UserMainPage.css";
import FeedPost from "../../controller/entities/FeedPost";

const UserMainPage=()=> {
    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];
    const user= new User(fields[0],"", fields[2], fields[1], image, fields[3]);

    const feedPosts = [
        new FeedPost(1, 'Post 1 Content', 'Author 1','','',''),
        new FeedPost(2, 'ion', 'Hello wassup','',new Date(),11),
        new FeedPost(3, 'andrei', 'Its me','',new Date(),30),
    ];

    return (
        <div className={"mainDiv1"}>
            <div className={"feed1"}>

            <h1>YOUR FEED</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Content</th>

                        <th>Likes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feedPosts.map((post, index) => (
                        <tr key={index}>
                            <td>{post.username}</td>
                            <td>{post.contentText}</td>

                            <td>{post.likes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const UserMainPageWrapped = navBarWrapper(UserMainPage);
export default UserMainPageWrapped;