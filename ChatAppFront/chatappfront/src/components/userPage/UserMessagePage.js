import "./UserMessagePage.css";

import {navBarWrapper} from "../navbar/navBarWrapper";


const UserMessagePage=()=> {


    return (
        <div id="map" style={{ width: '50%', height: '400px', alignContent: 'center'}}></div>


    );
}

const UserMessagePageWrapped = navBarWrapper(UserMessagePage);
export default UserMessagePageWrapped;