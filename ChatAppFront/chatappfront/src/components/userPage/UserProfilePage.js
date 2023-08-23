import { useAuthContext } from '../../auth/AuthProvider';
import User from "../../controller/entities/User";
import {navBarWrapper} from "../navbar/navBarWrapper";
import "./UserProfilePage.css";

const UserProfilePage=()=> {
    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const image= fields[4].split("\\")[2];
    const user= new User(fields[0],"", fields[2], fields[1], image, fields[3]);
    const imagePath= require(`../../images/${image}`);

    return (
        <div className={"mainDiv"}>
            <div className={"feed"}>
                <h1>Welcome, {user.username}!</h1>
                <h2>{user.name}</h2>
                <h3>{user.email}</h3>
                <h3>{user.location}</h3>
                <h3><img src={imagePath} alt="profile"/></h3>
            </div>
        </div>
    );
}

const UserProfilePageWrapped = navBarWrapper(UserProfilePage);
export default UserProfilePageWrapped;