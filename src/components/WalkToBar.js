import React, { useState } from "react";
import { LinearProgress } from "@mui/material"
import { Button, Grid } from "@mui/material"
import { updatePlayerState } from "../context/PlayerStore";
import { useSelector, useDispatch } from "react-redux"


const WalkToBar = () => {


    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();



    const { speed } = useSelector(state => state.player)

    function queue(progress, speed = 10) {
        setTimeout(() => {
            let newProgress = progress + 1
            if (newProgress < 101) {
                setProgress(newProgress)
                queue(newProgress)
            } else {
                doneQueueing()
                setProgress(0)
            }
        }, 100 / speed)
    }


    function doneQueueing() {
        dispatch(updatePlayerState("preparingForFight"))
    }
    return (
        <div>
            <Grid>
            </Grid>
            <Button varient="contained" onClick={() => { queue(progress, 100) }}> Join QUEUE</Button>
            <LinearProgress variant="determinate" value={progress} />
            <Grid>
                <Button varient="contained" onClick={() => { dispatch(updatePlayerState("searching")) }}> Stop Queueing</Button>
            </Grid>
        </div>
    )
}

export default WalkToBar