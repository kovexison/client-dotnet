import React, {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "./static/userStats.css"
import {useParams} from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const params = useParams();
    const sportName = params.activityName;
    const user_ID = params.userID;

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [time, setTime] = useState("");
    const [distance, setDistance] = useState("");

    let lastUserEntry;
    let activityMet;
    let caloriesBurned;
    let activityID;

    axios.get("https://localhost:44348/WebService1.asmx/getActivityId?activityName=" + sportName, {
        headers: {'Content-Type': 'application/xml'}
    }).then(resp => {
        activityID = resp.data;
        console.log(sportName + " activity ID is " + activityID);
    }).catch(err => {
        console.log(err);
    });

    let getActivityMet = () => {
        let returnValue;
        axios.get("https://localhost:44348/WebService1.asmx/activityMets?activity=" + sportName).then(
            resp => {
                returnValue = resp.data;
                document.getElementById("activityMets").value = activityMet;
            }
        ).catch(err => {
            console.log(err);
        });
        return returnValue;
    };

    activityMet = getActivityMet();

    function getLastEntry() {
        let lastEntry;
        axios.get("https://localhost:44348/WebService1.asmx/addUserStat?greutate=" + weight + "&inaltime=" + height + "&varsta=" + age + "&userID=" + user_ID, {
            headers: {'Content-Type': 'application/xml'}
        }).then(resp => {
            lastEntry = resp.data;
            console.log("Raspuns addUserStat: " + resp.data);
            console.log("Last entry:" + lastEntry);
            lastUserEntry = lastEntry;
        }).catch(err => {
            console.log(err);
        });
    }

    let sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let calculateClicked = () => {
        if (time > 0) {
            axios.get("https://localhost:44348/WebService1.asmx/getBmr?id_stats=" + lastUserEntry, {
                headers: {'Content-Type': 'application/xml'}
            }).then(res => {
                document.getElementById("bmr").value = res.data;
                caloriesBurned = time * activityMet * weight / 200;
                document.getElementById("kcal").value = caloriesBurned;
            }).catch(err => {
                console.log(err);
            });
        } else {
            toast("You have to add a value as time greater than 0.");
        }
    }



    let nextClicked = () => {
        if (weight > 30 && height > 100 && age > 7) {
            const secondForm = document.querySelector(".user-feedback");
            const firstForm = document.querySelector(".user-stats");
            getLastEntry();
            sleep(1200).then(resp => {
                secondForm.style.marginLeft = "-98%";
                firstForm.style.marginLeft = "+120%";
            }).catch(err => {
                console.log(err);
            });
        } else {
            toast("Please fill in your data. Weight > 30kg, height > 100cm, age > 7 yrs.");
        }
    };

    let backClicked = () => {
        window.open("/select-workout/" + user_ID, "_self");
    };

    let storeActivity = () => {
        if (distance === undefined) {
            axios.get("https://localhost:44348/WebService1.asmx/addActivityStats?time=" + time + "&distance=0&userLastStat=" + lastUserEntry + "&userID=" + user_ID + "&activityName=" + sportName, {
                headers: {'Content-Type': 'application/xml'}
            }).then(resp => {
                toast(resp.data);
            }).catch(err => {
                console.log(err);
            });
        } else if (distance > 0) {
            axios.get("https://localhost:44348/WebService1.asmx/addActivityStats?time=" + time + "&distance=" + distance + "&userLastStat=" + lastUserEntry + "&userID=" + user_ID + "&activityName=" + sportName, {
                headers: {'Content-Type': 'application/xml'}
            }).then(resp => {
                toast(resp.data);
            }).catch(err => {
                console.log(err);
            });
        }
    };


    return (<div className={"wrapper"}>
        <div className={"title-text"}>
            <br/><br/>
            <p className={"title-centered"}>Details about your {sportName} <br/><br/>
                Please fill in your data: </p>
            <br/>
        </div>
        <br/>
        <div className={"form-container"}>
            <div className={"form-inner"}>
                <form action={"#"} className={"user-stats"}>
                    <div className={"field"}>
                        <input type={"text"} placeholder={"Your weight in kg"} className={"form-input"}
                               onChange={(event) => {
                                   setWeight(event.target.value)
                               }}/>
                    </div>

                    <div className={"field"}>
                        <input type={"text"} className={"form-input"} placeholder={"Your height in cm"}
                               onChange={(event) => {
                                   setHeight(event.target.value)
                               }}/>
                    </div>
                    <div className={"field"}>
                        <input type={"text"} placeholder={"Your age"} className={"form-input"}
                               onChange={(event) => {
                                   setAge(event.target.value)
                               }}/>
                    </div>

                    <div className={"field-btn"}>
                        <button className={"form-button"} type={"button"} onClick={() => nextClicked()}>Next
                        </button>
                        <button className={"form-button"} type={"button"} onClick={() => backClicked()}>Back to
                            workouts
                        </button>
                        <ToastContainer/>
                    </div>
                </form>
            </div>
            <div className={"form-inner"}>
                <form action={"#"} className={"user-feedback"}>
                    <div className={"field"}>
                        <input type={"text"} placeholder={sportName + " time in minutes"} className={"form-input"}
                               onChange={(event) => {
                                   setTime(event.target.value)
                               }}/>
                    </div>
                    <div className={"field"}>
                        <input type={"text"} className={"form-input"}
                               placeholder={sportName + " distance in km (Optional)"}
                               onChange={(event) => {
                                   setDistance(event.target.value)
                               }}/>
                    </div>
                    <div className={"field"}>
                        <label className={"text-light"}>BMR:</label>
                        <input type={"text"} placeholder={"0"} className={"form-input"} id={"bmr"} readOnly={true}/>
                    </div>
                    <div className={"field"}>
                        <label className={"text-light"}>Activity mets:</label>
                        <input type={"text"} placeholder={"0"} className={"form-input"} id={"activityMets"}
                               readOnly={true}/>
                    </div>
                    <div className={"field"}>
                        <label className={"text-light"}>Calories burned (kcal):</label>
                        <input type={"text"} placeholder={"0"} className={"form-input"} id={"kcal"}
                               readOnly={true}/>
                    </div>
                    <br/><br/>
                    <div className={"btn-layer"}>
                        <button className={"form-button"} type={"button"} onClick={() => storeActivity()}>Store
                            activity
                        </button>

                        <br/>
                        <button className={"form-button"} type={"button"} onClick={() => calculateClicked()}>Calculate
                        </button>
                        <br/>
                    </div>
                    <br/>
                    <div className={"btn-layer"}>
                        <button className={"form-button"} type={"button"} onClick={() => backClicked()}>Your
                            progress
                        </button>
                        <button className={"form-button"} type={"button"} onClick={() => {
                            window.open("/select-workout", "_self");
                        }}>Back to workout selection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}