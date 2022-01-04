import React from "react";
import { Button, Grid } from "@mui/material";
// import {update} from "../context/GameContext";
import { updateSelected } from "../context/CardStore"
import { useDispatch, useSelector } from "react-redux"


const SelectedContainer = () => {


    const dispatch = useDispatch()
    const { selectedCards } = useSelector(state => state.cards)
    const { cards } = useSelector(state => state.cards)



    // const game = useContext(GameContext)


    function onClickHandler(type) {
        if (selectedCards[type].selected) {
            let selected = cards.find(card => { return card.id === selectedCards[type].card.id })
            dispatch(updateSelected(selected))
        }
    }


    return (

        <Grid container direction="column">

            <Grid item xs={2}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={2}><Button onClick={() => { onClickHandler("twoHandedWeapon") }}> <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/axeRed.png" className={selectedCards.twoHandedWeapon.selected ? "on" : "off"} alt="two handed weapon" /></Button></Grid>
                    <Grid item xs={2}><Button onClick={() => { onClickHandler("oneHandedWeapon") }}> <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/daggerRed.png" className={selectedCards.oneHandedWeapon.selected ? "on" : "off"} alt="one handed weapon" /></Button></Grid>
                    {selectedCards.ring.asWeapon ? <Grid item xs={2}><Button onClick={() => { onClickHandler("ring") }}> <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/ringRed.png" className={selectedCards.ring.selected ? "on" : "off"} alt="ring" /></Button> </Grid> : ""}
                    {selectedCards.amulet.asWeapon ? <Grid item xs={2}><Button onClick={() => { onClickHandler("amulet") }}> <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/amuletRed.png" className={selectedCards.amulet.selected ? "on" : "off"} alt="amulet" /></Button></Grid> : ""}


                    <Grid item xs={2}><Button onClick={() => { onClickHandler("armour") }}> <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/armourBlue.png" className={selectedCards.armour.selected ? "on" : "off"} alt="armour" /></Button></Grid>
                    <Grid item xs={2}><Button onClick={() => { onClickHandler("shield") }}><img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/shieldBlue.png" className={selectedCards.shield.selected ? "on" : "off"} alt="shield" /></Button></Grid>
                    {selectedCards.ring.asWeapon ? "" : <Grid item xs={2}><Button onClick={() => { onClickHandler("ring") }}> <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/ringBlue.png" className={selectedCards.ring.selected ? "on" : "off"} alt="ring" /></Button></Grid>}
                    {selectedCards.amulet.asWeapon ? "" : <Grid item xs={2}><Button onClick={() => { onClickHandler("amulet") }}> <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/amuletBlue.png" className={selectedCards.amulet.selected ? "on" : "off"} alt="amulet" /></Button></Grid>}
                </Grid>
            </Grid>
            <Grid item xs={10}></Grid>

        </Grid >

    )
}

export default SelectedContainer;