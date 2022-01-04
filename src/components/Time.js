import React from "react";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress"
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material"
import { beginTime, stopTime } from "../context/PlayerStore";
import { useSelector, useDispatch } from "react-redux"


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));


const Time = ({ time }) => {

    const dispatch = useDispatch();
    const { day, progressing } = useSelector(state => state.player)

    let hours = 8 + Math.floor(time / 12)
    if (hours.toString().length < 2) { hours = "0" + hours.toString() }
    let minutes = (time % 12) * 5
    if (minutes.toString().length < 2) { minutes = "0" + minutes.toString() }
    


    return (
        <div>

            <BorderLinearProgress thickness={4} size={40} variant="determinate" value={time/120*100} />
            {progressing ? <Button onClick={() => { dispatch(stopTime()) }}>Stop Time</Button> : <Button onClick={() => { dispatch(beginTime()) }}>Begin Time</Button>}

            <i><strong>Day:</strong> {day} </i> < strong>Time:</strong> {hours}:{minutes}
        </div>
    )
}

export default Time