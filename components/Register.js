import React, {useState} from "react";
import axios from "axios";

export default (props) => {
    const [userName, setUserName] = useState("belavok");
    const [password, setPassword] = useState("passw");
    const [password2, setPassword2] = useState("");

    let registerClicked = () => {
        axios.get('https://localhost:44348//WebService1.asmx/signUp?Uname='+ userName + '&password='+ password,
            {headers:
                    {'Content-Type': 'application/xml'}
            }).then(res=>{
            console.log(res);
        }).catch(err=>{console.log(err)});
    };

    return (
        <div className="register-container">
            <div>Please register</div>
            <div><label>Username:</label><input onChange={(event) => {setUserName(event.target.value)}}/></div>
            <div><label>Password:</label><input type={"password"} onChange={(event) => {setPassword(event.target.value)}}/></div>
            <div><label>Confirm password:</label><input type={"password"} onChange={(event) => {setPassword2(event.target.value)}}/></div>

            <div onClick={() => registerClicked()}>Register</div>
            <div>Back</div>
        </div>
    );
};