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

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    let imag;
    const userId = props.secondProp;
    console.log("User ID: " + userId);
    if (props.firstProp=== "Home Activities") {
        imag = homeActivities;
    }
    if (props.firstProp === "Swimming Backstroke") {
        imag = backstroke;
    }
    if (props.firstProp === "Swimming Butterfly") {
        imag = butterfly;
    }
    if (props.firstProp === "Swimming Crawl") {
        imag = crawl;
    }
    if(props.firstProp === "Basketball"){
        imag = basketball;
    }
    if(props.firstProp === "Running"){
        imag = running;
    }
    if(props.firstProp === "Bicycling"){
        imag = bicycling;
    }
    if(props.firstProp === "Karate"){
        imag = karate;
    }
    if(props.firstProp === "Walking"){
        imag = walking;
    }
    if(props.firstProp === "Hiking"){
        imag = hiking;
    }

    function sportClicked(sportCardName){
        let activityId;
        axios.get('https://localhost:44348//WebService1.asmx/getActivityId?activityName=' + sportCardName,
            {headers:
                {'Content-Type': 'application/xml'}
            }).then(res=>{
                activityId = res.data;
                if(activityId !== -1){
                    window.open("/user-stats/" + sportCardName + "/" + userId,"_self");
                }
        }).catch(err=>{console.log(err)});
    }

    return (
        <div className={"workout"} onClick={() => {
            sportClicked(props.firstProp);
        }}>
        <div  className={"sport-card"}>
            <div className={"workout-img"}>
             <img src={imag}  alt={"image - " + props.firstProp}/>
            </div>
            <div>
                <br/>
                <p className={"text-light"} id={props.firstProp}>{props.firstProp}</p>
                </div>
            <br/>
        </div>
        </div>
    );
}