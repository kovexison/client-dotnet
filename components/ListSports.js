import React, {useState, useEffect } from "react";
import axios from "axios";
import SportCard from "./SportCard";

export default (props) => {
    const [sport, setSport] = useState();
    useEffect(() => {
        axios.get('https://localhost:44348//WebService1.asmx/activityNameList?',
            {headers:
                    {'Content-Type': 'application/xml'}
            }).then(res=>{
               setSport(res.data)
            }).catch(err=>{console.log(err)});
    }, []);

    if(sport !== undefined)
        return (<div>
            <h1>HELLO</h1>
            {sport.map((e) => <SportCard content = {e}/>)}
        </div>);
    return <h1>hELLO</h1>;
}