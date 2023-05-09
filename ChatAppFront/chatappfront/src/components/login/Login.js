import {Link} from 'react-router-dom';
import {UserController} from "../../controller/UserController";
import {useState} from "react";
import {User} from "../../controller/entities/User";
import {useNavigate} from "react-router-dom";

export default function Login(){

    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');
    const navigate = useNavigate();
    async function onLoginButtonClicked(){
        try{
            console.log("start login");
            const controller =new UserController();
            const user = new User(username, password, '','','','');
            const token= await controller.login(user);
            console.log("A mers: "+token)
            navigate("/userPage");
        }catch(exception){
            console.log("error");
        }
    }

    return (

        <div className={"loginDiv"}>

            <h1 className={"welcomeHeader"}>Welcome to ChatApp</h1>
            <form>
                <label>username</label>
                <input type="text" id={"inputUsernameLogin"} className={"inputLogin"} onChange={(text)=>setUsername(text.target.value)}/>

                <label>password</label>
                <input type="password" id={"inputPasswordLogin"} className={"inputLogin"} onChange={(text)=>setPassword(text.target.value)}/>

                <p></p>
                <button type={"submit"} id={"buttonLogin"} onClick={onLoginButtonClicked} >Login</button>
            </form>
            <p>Don't have an account? </p>
            <Link to="/register">Register</Link>
        </div>


       );
}