import React, {useState, useEffect } from "react";
import axios from "axios";
import SportCard from "./SportCard";
import "./static/style.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [sport, setSport] = useState();

    useEffect(() => {
        axios.get('https://localhost:44348//WebService1.asmx/activityNameList?',
            {headers:
                    {'Content-Type': 'application/xml'}
            }).then(res=>{
               setSport(res.data);
               console.log(res.data);
            }).catch(err=>{console.log(err)});
    }, []);

    if(sport !== undefined)
        return (<div className={"workouts"}>
            <div className={"container"}>
            <h1 className="title">Hello</h1><br/>
            <h1 className="title">Select your workout</h1>
                <div className={"workout-types"}>{sport.map((e) => <SportCard content = {e}/>)}</div>
        </div>
        </div>);
    //return <h1 className={"title"}>Hello</h1>;
}