import React, { useState, useEffect, useRef } from "react";
import CardContainer from "./CardContainer";
import { Grid } from "@mui/material"
import SelectedContainer from "./SelectedContainer";
import StaffContainer from "./StaffContainer"
import TotalDamageContainer from "./TotalDamageContainer";
import Floor from "./Floor";
import WalkToBar from "./WalkToBar";
import Fight from "./Fight";
import RewardContainer from "./RewardContainer";
import { useSelector } from "react-redux";
import ErrorBox from "./ErrorBox";
import Instructions from "./Instructions";
import Time from "./Time"
import { LtePlusMobiledataSharp } from "@mui/icons-material";





const Game = (props) => {


    const [timer, setTimer] = useState(0);
    const { cards } = useSelector(state => state.cards)
    const { state, progressing, xPos, newXPos } = useSelector(state => state.player)

    let step = 1



    function useInterval(callback, delay) {
        const savedCallback = useRef();
        useEffect(() => {
            savedCallback.current = callback;
        });
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }, [delay]);
    }


    // const toTime = (time) => ("0" + time).slice(-2);

    let resetRef = useRef();
    // Trick to Intialize countRef.current on first render only.
    resetRef.current = resetRef.current || false;

    useEffect(() => {
        if (resetRef.current === true) {
            // setTimer(0);
        }
    });

    useInterval(() => {
        if (!progressing) {
            resetRef.current = true;
            return;
        }
        resetRef.current = false;
        let newTime = timer + step
        if (newTime > 120) {
            setTimer(timer + step);
            console.log(step)
        }
    }, !progressing ? null : 1000);



    function addStep(newStep) {
        step = step + newStep
    }

    let staffContainer = ""
    let staffContainerStates = ["searching", "preparingForFight", "queueing", "walking"]
    if (staffContainerStates.includes(state)) { staffContainer = <StaffContainer addTime={addStep} /> }

    return (
        <Grid container direction="row">
            {/* {error ? <ErrorBox /> : ""} */}
            <ErrorBox />
            <Grid item xs={4} className="card-container">
                {cards.length > 0 ? <CardContainer /> : <div>Not connected </div>}
            </Grid>
            <Grid item xs={4}>

                <Time time={timer} />

                <SelectedContainer />
                <TotalDamageContainer />

                <Instructions />
                {state === "searching" ? <Floor /> : ""}
                {state === "walking" ? <Floor /> : ""}
                {state === "queueing" ? <WalkToBar /> : ""}
                {state === "preparingForFight" ? <Fight socket={props} /> : ""}
            </Grid>
            <Grid item xs={4}>
                {staffContainer}
                {state === "reward" ? <RewardContainer /> : ""}
            </Grid>
        </Grid>




    )
}

export default Game;