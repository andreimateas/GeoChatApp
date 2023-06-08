import { useAuthContext } from '../../auth/AuthProvider';
import User from "../../controller/entities/User";
import {navBarWrapper} from "../navbar/navBarWrapper";

const UserMainPage=()=> {
    const { userProfile } = useAuthContext();

    const fields= userProfile.userString.split(",");
    const user= new User(fields[0],"", fields[2], fields[1], fields[4], fields[3]);


    return (
        <div>
            <h1>Welcome, {user.username}!</h1>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <h3>{user.location}</h3>
            <h3>{user.profilePicture}</h3>
        </div>
    );
}

const UserMainPageWrapped = navBarWrapper(UserMainPage);
export default UserMainPageWrapped;