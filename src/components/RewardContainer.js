import React, { useContext } from "react";
import Card from "./Card"
import { Grid, Button } from "@mui/material"

import { useDispatch, useSelector } from "react-redux"

import { clearFighting } from "../context/StaffStore"
import { updatePlayerState } from "../context/PlayerStore"

const RewardContainer = () => {


    const socket = useContext(socket)

    const dispatch = useDispatch()
    const { rewardCards } = useSelector(state => state.cards)
    const { fighting } = useSelector(state => state.staff)

    
    console.log(rewardCards)
    const select = (cardId) => {
        socket.emit("selectReward", { staffMemberID: fighting, cardID: cardId })
        dispatch(clearFighting(null));
        dispatch(updatePlayerState("searching"));
    }


    return (
        <Grid className="rewards" >
            <ul>
                {rewardCards.map(card => { return <li key={card.id + "reward"} ><Button onClick={() => { select(card.id) }}><Card card={card} index={card.id} /> </Button></li> })}
            </ul >
        </Grid >
    )
}

export default RewardContainer;