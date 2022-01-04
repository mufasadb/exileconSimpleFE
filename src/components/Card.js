import React from "react";
import { Grid, Paper, Button, Link } from "@mui/material";
import { updateSelected, updateAsWeaponState } from "../context/CardStore";
import { useDispatch } from "react-redux"


const Card = (props) => {

    // const { cards } = useSelector(state => state.cards)
    const dispatch = useDispatch();

    // const card = cards[props.index]
    const card = props.card






    let cardDescription = card.description.replace(" ", "+")
    let cardType = card.type.toLowerCase()
    let itemImage = `https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/${cardDescription}.png`
    let typeImage = `https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/${cardType}.png`
    let asWeapon = ""

    let colour = card.asWeapon ? "Red" : "Blue"

    if (card.selected) {

        if (card.type === "Ring" || card.type === "Amulet") {
            typeImage = `https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/${cardType}${colour}.png`
            if (card.asWeapon) {
                asWeapon = <Link onClick={() => { dispatch(updateAsWeaponState(card)) }}>As Defence <img className="choice" src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/shield.png" alt="shield" /></Link>
            } else {
                asWeapon = <Link onClick={() => { dispatch(updateAsWeaponState(card)) }}>As Attack <img className="choice" src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/onehandedweapon.png" alt="oneHandedWeapon" /></Link>
            }
        }
    }

    let classSelected = card.selected ? "on" : "off";



    let implicits = []
    let explicits = []



    let statsArray = Object.keys(card.explicitStats)
    for (let stat of statsArray) {
        if (card.implicitStats[stat] > 0) {
            for (let i = 0; i < card.implicitStats[stat]; i++) {
                let imgURL = `https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/${stat}.png`
                implicits.push(<img key={stat + i} className="damage" src={imgURL} alt={stat} />)
            }
        }
    }
    for (let stat of statsArray) {
        if (card.explicitStats[stat] > 0) {
            for (let i = 0; i < card.explicitStats[stat]; i++) {
                let imgURL = `https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/${stat}.png`
                explicits.push(<img key={stat + i} className="damage" src={imgURL} alt={stat} />)
            }
        }
    }

    let explicitBox = explicits.map(stat => { return stat })

    let rarity = "cardUnique"
    if (card.rarity === "normal") { rarity = "cardNormal" }
    else if (card.rarity === "magic") { rarity = "cardMagic" }
    else if (card.rarity === "rare") { rarity = "cardRare" }



    return (


        < Grid item xs={card.selected ? 12 : 11} >
            <Grid container direction="row" spacing={0}>

                <Grid item xs={12}>

                    <Paper style={{ display: "flex", padding: 5, height: "10em", overflow: "hidden", paddingColor: "#4d2000" }} className={rarity} elevation={card.selected ? 24 : 6}>
                        <Grid container spacing={0} direction="row">
                            <Grid item xs={3}>
                                <Grid container direction="column">
                                    <Grid item xs={10}>
                                        <img src={itemImage} key="1" className="Item-Image" alt={card.description} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={7}>
                                {card.name}



                                <br /><br />
                                {implicits.map(stat => { return stat })}


                                {/* {explicits.map(stat => { return stat })} */}
                                {explicitBox}
                            </Grid>
                            <Grid item xs={2} >
                                <Grid container align="center" spacing={1} justify="center" direction="column">
                                    <Grid item xs={1}>
                                        <Button onClick={() => { dispatch(updateSelected(card)) }}><img src={typeImage} className={classSelected} alt={card.type} /> </Button>
                                        {asWeapon}
                                    </Grid>
                                    <Grid item xs={1}>
                                        {(card.durability > 1) ? <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/anvil.png" alt="durability" className="durability" /> : ""}
                                    </Grid>
                                    <Grid item xs={1}>

                                        {(card.durability > 0) ? <img src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/anvil.png" alt="durability" className="durability" /> : ""}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid >
        </Grid >

    )
}

export default Card;