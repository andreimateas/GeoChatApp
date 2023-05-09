import {UserController} from "../../controller/UserController";
import {User} from "../../controller/entities/User";

export default function Register() {

    return (

    <div className={"firstPage register"}>
        <h1 className={"inputRegister"} id={"registerHeader"} >Don't have an account yet?</h1>

        <form className={"inputRegister"}>
            <div className={"inputDiv"}>
                <label className={"inputRegister"}>username</label>
                <input type="text" id={"inputUsername"} className={"inputRegister"}/>
            </div>
            <div>
                <label className={"inputRegister"}>password</label>
                <input type="password" id={"inputPassword"} className={"inputRegister"}/>
            </div>
            <div>
                <label className={"inputRegister"}>email</label>
                <input type="email" id={"inputEmail"} className={"inputRegister"}/>
            </div>
            <div>
                <label className={"inputRegister"}>name</label>
                <input type="text" id={"inputName"} className={"inputRegister"}/>
            </div>
            <div>
                <label className={"inputRegister"}>profile picture</label>
                <input type="file" id={"inputProfilePicture"} className={"inputRegister"}/>
            </div>
            <div>
                <label className={"inputRegister"}>location</label>
                <input type="text" id={"inputLocation"} className={"inputRegister"}/>
            </div>
            <p></p>

            <button type={"submit"} id ={"buttonRegister"} >Register</button>

        </form>
    </div>
    );
}