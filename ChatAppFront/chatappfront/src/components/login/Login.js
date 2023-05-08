import {Link} from 'react-router-dom';

export default function Login(){
    return (

        <div className={"firstPage login"}>

            <h1 id={"welcomeHeader"}>Welcome to ChatApp</h1>
            <form>
                <label>username</label>
                <input type="text" id={"inputUsernameLogin"} className={"inputLogin"}/>

                <label>password</label>
                <input type="password" id={"inputPasswordLogin"} className={"inputLogin"}/>

                <p></p>
                <button type={"submit"} id={"buttonLogin"}>Login</button>
            </form>
            <p>Don't have an account? </p>
            <Link to="/register">Register</Link>
        </div>


       );
}