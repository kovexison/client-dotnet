import React, {useState} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./static/loginpage.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let deleteClicked = () => {
        axios.get('https://localhost:44348//WebService1.asmx/deleteUser?nume='+ userName + '&password='+ password,
            {headers:
                    {'Content-Type': 'application/xml'}
            }).then(res=>{
            console.log(res);
                toast(res.data); //send notification to user
        }).catch(err=>{console.log(err)});
    };


    return (
        <div className={"delete-container"}>
            <div><h1 className={"form-title"}>Username and password for account to delete</h1></div>
            <div><label className={"text-light"}>Username:</label><input type={"text"} className={"form-input"} onChange={(event) => {setUserName(event.target.value)}} /></div>
            <br/>
            <div><label className={"text-light"}>Password:</label><input type={"password"} className={"form-input"} onChange={(event) => {setPassword(event.target.value)}}/></div>
            <br/>
            <div>
                <button className={"form-button"} type={"button"} onClick={() => {deleteClicked()}}>Delete Account</button>
                <ToastContainer />
            </div>
            <br/>
            <div><a className={"form-link"} href={"./"} id={"linkDeleteAccount"}>Go back to login page</a></div>
        </div>
    );
};