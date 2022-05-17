import React, {useState, useCallback} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

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

            } else {
                //todo not logged in page
            }
        }).catch(err=>{console.log(err)});

    };

    return (
        <div className="login-container">
            <div>Please login</div>
            <div><label>Username:</label><input onChange={(event) => {setUserName(event.target.value)}} /></div>
            <div><label>Password:</label><input type={"password"} onChange={(event) => {setPassword(event.target.value)}}/></div>

            <div onClick={() => {loginClicked()}}>Login</div>
            <div>Register</div>
            <div>Delete account</div>
        </div>
    );
};