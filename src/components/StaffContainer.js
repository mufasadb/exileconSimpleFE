import React from "react";
import { Grid } from "@mui/material"
import StaffMember from "./StaffMember";
import { useSelector } from "react-redux"


const CardContainer = ({ addTime }) => {


    const { staff, fighting } = useSelector(state => state.staff)
    const { floor, state } = useSelector(state => state.player)


    // const filteredStaff = staff.filter(staffMember => { return staffMember.floor === player.floor })
    const floor1 = []
    const floor2 = []
    const floor0 = []

    for (let staffMember of staff) {
        if (1 === staffMember.floor) { floor1.push(staffMember) }
        else if (2 === staffMember.floor) { floor2.push(staffMember) }
        else if (0 === staffMember.floor) { floor0.push(staffMember) }
    }
    let filteredStaff = []
    if (state === "searching" || state === "walking") {
        if (floor === 1) { filteredStaff = floor1 }
        else if (floor === 2) { filteredStaff = floor2 }
        else { filteredStaff = floor0 }
    } else if (state === "queueing" || state === "preparingForFight") {
        filteredStaff = [fighting]
    }



    function select(selectedId) {
        console.log(`staffMember ${selectedId} was selected`)

    }

    return (

        <Grid container direction="column" className="staff-container">

            <ul>
                {filteredStaff.map((staffMember) => { return (<li key={staffMember.id}><StaffMember addTime={addTime} select={select} key={staffMember.id} staffMember={staffMember} /></li>) })}
            </ul>
        </Grid>

    )
}

export default CardContainer;