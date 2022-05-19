import React, {useState} from "react";
import Login from "./Login";
import ListSports from "./ListSports";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const [userID, setUserID] = useState();

    let login = (e) => {
        console.log(e)
        setUserID(e);
        // eslint-disable-next-line no-restricted-globals
    }

    if (userID !== undefined && userID !== -1) {
        return (<ListSports/>);
    }
    return (<Login onLogin={(e) => {
        login(e);
    }}/>);
}