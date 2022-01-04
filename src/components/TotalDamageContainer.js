import React from "react";
import { Grid } from "@mui/material";
import { statImages } from "../helpers/tools"
import { useSelector } from "react-redux"

const TotalDamageContainer = () => {


    const { selectedCards } = useSelector(state => state.cards)


    let types = Object.keys(selectedCards)
    let attacks = {
        physical: 0,
        cold: 0,
        lightning: 0,
        fire: 0,
        chaos: 0,
        wild: 0
    }
    let defences = {
        shield: 0,
        health: 0,
        cold: 0,
        lightning: 0,
        fire: 0,
        chaos: 0,
        wild: 0
    }



    // let attackStats = ["physical", "armour", "wild", "cold", "chaos", "fire", "life", "lightning"]
    // let stats = ["physical", "armour", "wild", "cold", "chaos", "fire", "life", "lightning"]

    for (let typeWord of types) {
        let type = selectedCards[typeWord]
        if (type.selected) {


            if (typeWord === "oneHandedWeapon" || typeWord === "twoHandedWeapon") {
                for (let stat of Object.keys(attacks)) {
                    attacks[stat] = attacks[stat] + type.card.implicitStats[stat]
                    attacks[stat] = attacks[stat] + type.card.explicitStats[stat]
                }
            }
            else if ((typeWord === "amulet" || typeWord === "ring") && type.asWeapon) {
                for (let stat of Object.keys(attacks)) {
                    attacks[stat] = attacks[stat] + type.card.implicitStats[stat]
                    attacks[stat] = attacks[stat] + type.card.explicitStats[stat]
                }
            } else {
                for (let stat of Object.keys(defences)) {
                    defences[stat] = defences[stat] + type.card.implicitStats[stat]
                    defences[stat] = defences[stat] + type.card.explicitStats[stat]
                }
            }

        }
    }

    let attackImgs = []
    attackImgs = statImages(attackImgs, attacks)
    let defenceImgs = []
    defenceImgs = statImages(defenceImgs, defences)

    return (

        <Grid container direction="column" className="addPadding" spacing={4}>
            <Grid item xs={6}>
                Your Currently Selected Attack:
                {attackImgs.map(stat => { return stat })}
            </Grid>
            <Grid item xs={6}>

                Your Currently Selected Defence:
                {defenceImgs.map(stat => { return stat })}
            </Grid>
        </Grid>

    )
}

export default TotalDamageContainer;