import React from "react";
import { Grid, Paper, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { queueForMember, seeStaffMember } from "../context/StaffStore";
import { updatePlayerState, updateXPos } from "../context/PlayerStore"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const StaffMember = (props) => {

    const staffMember = props.staffMember
    const dispatch = useDispatch();
    const { xPos, speed } = useSelector(state => state.player)

    let duration = Math.abs(xPos - staffMember.xDist) * 5000 / speed

    function see() {
        dispatch(updateXPos(staffMember.xDist))
        setTimeout(() => { dispatch(seeStaffMember(staffMember.id)) }, duration * 1.3)

    }

    function queueFor() {
        props.addTime(staffMember.xDist)
        dispatch(queueForMember(staffMember))
        dispatch(updatePlayerState("queueing"))
    }

    let defence = []
    let attack = []


    let buttonVar = null

    let imageIcon = <div className="staff"><QuestionMarkIcon /></div>
    // let imageIcon = <img className="staff" src={`https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/StaffImage/${staffMember.name.replaceAll(" ", "_")}.png`} alt={staffMember.name} />

    if (staffMember.seen) {
        imageIcon = <img className="staff" src={`https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/StaffImage/${staffMember.name.replaceAll(" ", "_")}.png`} alt={staffMember.name} />
        buttonVar = <Button className="staff-select-button" onClick={queueFor}>Queue For</Button>


        let statsArray = Object.keys(staffMember.defence)
        for (let stat of statsArray) {
            if (staffMember.defence[stat] > 0) {
                let imgURL = `https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/${stat}.png`
                defence.push(<img key={stat} className="damage" src={imgURL} alt={stat} />)
            }
        }
        for (let stat of statsArray) {
            if (staffMember.attack[stat] > 0) {
                let imgURL = `https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/${stat}.png`
                attack.push(<img key={stat} className="damage" src={imgURL} alt={stat} />)
            }
        }
    } else {
        buttonVar = <Button className="staff-select-button" onClick={see}>View Stats</Button>
    }
    return (
        <Grid item xs={12}>
            <Paper style={{ display: "flex", padding: 10, height: "10em", overflow: "hidden" }} elevation={6}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        {imageIcon}
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container direction={"column"} spacing={2}>
                            <Grid item xs={11}>

                                {staffMember.seen ? staffMember.name : <QuestionMarkIcon className="staff" />} on floor {staffMember.floor}
                                <br></br>
                                Defence: {defence}
                                <hr />
                                Attack: {attack}
                            </Grid >
                            <Grid item xs={1}>
                                {staffMember.seen ? staffMember.name : <QuestionMarkIcon className="staff" />}  is {Math.abs(staffMember.xDist - xPos)} away
                                {/* </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        {buttonVar}
                    </Grid>
                </Grid>

            </Paper >
        </Grid >
    )
}

export default StaffMember