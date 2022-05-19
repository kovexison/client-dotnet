import React, {useState} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./static/loginpage.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let loginClicked = () => {


        let id;
        axios.get('https://localhost:44348//WebService1.asmx/signIn?Uname='+ userName + '&password='+ password,
            {headers:
                    {'Content-Type': 'application/xml'}
            }).then(res=>{
            id = res.data;
            console.log(res);

            if(id !== -1){
                console.log(id);
                props.onLogin(id);
                window.open("./select-workout/" + id,"_self");
            } else {
                //todo not logged in page
                toast("Wrong username or password."); //send notification from not logged-in error
            }
        }).catch(err=>{console.log(err)});

    };

    return (
        <div className={"login-container"}>
            <div><h1 className={"form-title"}>Metabolic Calculator - Log in</h1></div>
            <div><label className={"text-light"}>Username:</label><input type={"text"} className={"form-input"} onChange={(event) => {setUserName(event.target.value)}} /></div>
            <br/>
            <div><label className={"text-light"}>Password:</label><input type={"password"} className={"form-input"} onChange={(event) => {setPassword(event.target.value)}}/></div>
            <br/>
            <div>
                <button className={"form-button"} type={"button"} onClick={() => {loginClicked()}}>Login</button>
                <ToastContainer />
            </div>
            <br/>
            <div><a className={"form-link"} href={"./register"} id={"linkCreateAccount"}>Don't have an account? Create account</a></div>
            <br/>
            <div><a className={"form-link"} href={"./delete-account"} id={"linkDeleteAccount"}>Delete account</a></div>
        </div>
    );
};