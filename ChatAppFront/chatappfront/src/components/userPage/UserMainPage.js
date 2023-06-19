import { useAuthContext } from '../../auth/AuthProvider';
import User from "../../controller/entities/User";
import {navBarWrapper} from "../navbar/navBarWrapper";
import "./UserPage.css";

const UserMainPage=()=> {
    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];
    const user= new User(fields[0],"", fields[2], fields[1], image, fields[3]);
    let imagePath;
    try{
        imagePath= require(`../../images/${image}`);
    }catch(e){
        console.log("cannot find photo");
    }

    return (
        <div className={"mainDiv"}>
            <div className={"feed"}>
            <h1>Welcome, {user.username}!</h1>
            <h3><img src={imagePath} alt="profile"/></h3>
            <h3>YOUR FEED</h3>
            </div>
        </div>
    );
}

const UserMainPageWrapped = navBarWrapper(UserMainPage);
export default UserMainPageWrapped;