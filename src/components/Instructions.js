import React from "react";
import { Grid, Alert} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux"

const Instructions = () => {
    const { state, reward } = useSelector(state => state.player)
    const { fighting } = useSelector(state => state.staff)




    const messages = {
        searching: "Look around at each of the monsters and find one you think you can kill!",
        reward: `Great you slayed the enemy!, select ${reward.rewardCount} from the options here`,
        preparingForFight: `Choose the items you're going to use for battle to kill ${fighting}`,
        queueing: "If you think you can slay this enemy, koin the queue and, use this as a chance to select your items"
    }
    let iconProp = false
    if (state === "reward") { iconProp = <CheckIcon fontSize="inherit" /> }


    return (
        <Grid className="addPadding" style={{height:'14vh'}}>
            <Alert icon={iconProp}>
                {messages[state]}
            </Alert>
        </Grid>
    )
}

export default Instructions