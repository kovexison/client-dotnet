import "./static/style.css";
import homeActivities from "./static/images/home-activities.jpg"
import crawl from "./static/images/swimming-crawl.jpg"
import backstroke from "./static/images/swimming-backstroke.jpg"
import butterfly from "./static/images/swimming-butterfly.jpg"
import basketball from "./static/images/basketball.jpg"
import running from "./static/images/running.jpg"
import bicycling from "./static/images/cycling.jpg"
import karate from "./static/images/karate.jpg"
import walking from "./static/images/walking.jpg"
import hiking from "./static/images/hiking.jpg"
import axios from "axios";
import UserStatsMenu from "./UserStatsMenu"

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    let imag;
    if (props.content === "Home Activities") {
        imag = homeActivities;
    }
    if (props.content === "Swimming Backstroke") {
        imag = backstroke;
    }
    if (props.content === "Swimming Butterfly") {
        imag = butterfly;
    }
    if (props.content === "Swimming Crawl") {
        imag = crawl;
    }
    if(props.content === "Basketball"){
        imag = basketball;
    }
    if(props.content === "Running"){
        imag = running;
    }
    if(props.content === "Bicycling"){
        imag = bicycling;
    }
    if(props.content === "Karate"){
        imag = karate;
    }
    if(props.content === "Walking"){
        imag = walking;
    }
    if(props.content === "Hiking"){
        imag = hiking;
    }

    function sportClicked(sportCardName){
        let activityId;
        axios.get('https://localhost:44348//WebService1.asmx/getActivityId?activityName=' + sportCardName,
            {headers:
                {'Content-Type': 'application/xml'}
            }).then(res=>{
                activityId = res.data;
                console.log(sportCardName + " ID = " + activityId);
                console.log("Sportcard " + sportCardName + " clicked.");
                if(activityId !== -1){
                    UserStatsMenu(sportCardName);
                }

            axios.get("https://localhost:44348/WebService1.asmx/getCurrentActivity?",{
                headers: {'Content-Type': 'application/xml'}
            }).then(res => {
                console.log("Stored in the server as: " + res.data);
            }).catch(err => {
                console.log(err);
            });
        }).catch(err=>{console.log(err)});


    }

    return (
        <div className={"workout"} onClick={() => sportClicked(props.content)}>
        <div  className={"sport-card"}>
            <div className={"workout-img"}>
             <img src={imag}  alt={"image - " + props.content}/>
            </div>
            <div>
                <p id={props.content} className={"text-light"}>{props.content}</p>
            </div>
            <br/>
        </div>
        </div>
    );
}