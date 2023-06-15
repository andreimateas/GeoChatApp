
import {navBarWrapper} from "../navbar/navBarWrapper";

const UserMessagePage=()=> {


    return (
        <div>
            <h1>Message1</h1>
            <h2>Message2</h2>
            <h3>Message3</h3>
        </div>
    );
}

const UserMessagePageWrapped = navBarWrapper(UserMessagePage);
export default UserMessagePageWrapped;