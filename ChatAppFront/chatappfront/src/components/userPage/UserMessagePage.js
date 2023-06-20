import "./UserMessagePage.css";

import {navBarWrapper} from "../navbar/navBarWrapper";

const UserMessagePage=()=> {


    return (
        <div className={"mainDiv2"}>
        <div className={"feed2"}>

        </div>
        </div>
    );
}

const UserMessagePageWrapped = navBarWrapper(UserMessagePage);
export default UserMessagePageWrapped;