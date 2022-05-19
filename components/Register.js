import React, {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "./static/loginpage.css"

export default (props) => {
    const [userName, setUserName] = useState("belavok");
    const [password, setPassword] = useState("passw");
    const [password2, setPassword2] = useState("");


    let sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function registerClicked(){
        if (userName.length > 4) {
            if (password === password2) {
                axios.get('https://localhost:44348/WebService1.asmx/signUp?Uname=' + userName + '&password=' + password,
                    {
                        headers:
                            {'Content-Type': 'application/xml'}
                    }).then(res => {
                    console.log(res);
                    if (res.data === 'Your account was successfully created') {
                        notify(res.data + ". Please log in.");
                    } else {
                        notify(res.data);
                    }

                }).catch(err => {
                    console.log(err)
                });

                sleep(4500).then(() => {
                    window.open("./", "_self");
                });

            } else {
                notify("Passwords doesn't match.");
            }
        } else {
            notify("Username has to be minim 5 charachers in length.");
        }
    };

    let notify = (res) => toast(res);

    return (
        <div className="register-container">
            <div><h1 className={"form-title"}>Become a member</h1></div>
            <div><label className={"text-light"}>Username:</label><br/>
                <input className={"form-input"} type={"text"}
                       onChange={(event) => {
                           setUserName(event.target.value)
                       }}/></div>
            <div><br/><label className={"text-light"}>Password:</label><br/>
                <input className={"form-input"}
                       type={"password"}
                       onChange={(event) => {
                           setPassword(event.target.value)
                       }}/></div>
            <div><br/><label className={"text-light"}>Confirm password:</label><br/>
                <input className={"form-input"}
                       type={"password"}
                       onChange={(event) => {
                           setPassword2(event.target.value)
                       }}/></div>
            <div>
                <br/>
                <button className={"form-button"} type={"button"} onClick={() => registerClicked()}>Register</button>
                <ToastContainer/>
            </div>
            <div>
                <br/>
                <a className={"form-link"} href={"./"}>Log in instead</a>
            </div>
        </div>
    );
};