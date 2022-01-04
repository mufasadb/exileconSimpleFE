import React, { useContext } from "react"
import { Grid, Button } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { updatePlayerState } from "../context/PlayerStore"
import { SocketContext } from "../context/Socket"


const Fight = () => {

    const dispatch = useDispatch()
    const socket = useContext(SocketContext)

    const { selectedCards } = useSelector(state => state.cards)
    const { fighting } = useSelector(state => state.staff)


    let canClick = true
    let cards = []
    let types = Object.keys(selectedCards)
    for (let type of types) {
        if (selectedCards[type].card) { cards.push(selectedCards[type].card); canClick = false }
    }


    function fight() {
        socket.emit("fight", { staffId: fighting.id, cards: cards })
        dispatch(updatePlayerState("reward"))
    }
    function leaveQueue() {
        dispatch(updatePlayerState("searching"))
    }


    return (
        <Grid container spacing={2}>

            <Grid item xs={6}>
                <Button variant="contained" disabled={canClick} onClick={() => { fight() }}>  Fight </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick={() => { leaveQueue() }}>  Leave Queue </Button>
            </Grid>
        </Grid>
    )
}

export default Fight