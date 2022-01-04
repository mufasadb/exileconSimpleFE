import React from "react"
import { Grid, Button } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { changeFloor, resolveMove, updateXPos } from "../context/PlayerStore"
import { seeStaffMember } from "../context/StaffStore"
import { Transition } from "react-transition-group"
// import { Spring } from "react-spring"


const Floor = () => {

    const { floor, xPos, state, newXPos, speed } = useSelector(state => state.player)
    const { staff } = useSelector(state => state.staff)

    let isWalking = (state === "walking") ? true : false
    const filteredList = staff.filter(staffMember => { return staffMember.floor === floor })

    const dispatch = useDispatch()

    let duration = Math.abs(xPos - newXPos) * 5000 / speed
    let translatedXPos = ((xPos - 48) / 3.3) + 4
    let translatedNewXPos = ((newXPos - 48) / 3.3) + 4


    function see(staffMember) {
        dispatch(updateXPos(staffMember.xDist))
        setTimeout(() => { dispatch(seeStaffMember(staffMember.id)) },( duration * 1.3))
    }

    function moveToStairs(stair) {

    }

    let floorName = "Middle"
    if (floor === 0) { floorName = "Bottom" }
    if (floor === 2) { floorName = "Top" }



    function finishPlace(node) {
        node.style.transform = `translateX(${translatedNewXPos}vw)`
        setTimeout(() => { dispatch(resolveMove()) }, duration * 1.3)
        node.style.transition = `all ${duration}ms ease-in`
        console.log(xPos, newXPos)
    }

    function doStair(stair) {
        if (stair === "up") {
            if (xPos === 0) {
                dispatch(changeFloor(1))
            } else {
                dispatch(updateXPos(0))
            }
        } else {
            if (xPos === 100) {
                dispatch(changeFloor(-1))
            } else {
                dispatch(updateXPos(100))
            }
        }
    }

    return (
        <Grid>
            {floorName} Floor   currently: {state} <br></br>
            <Grid container justifyContent="center" spacing={2} direction="row">
                {filteredList.map((staffMember) => {
                    return (
                        staffMember.seen ?
                            <img style={{ position: "absolute", left: `${((staffMember.xDist / 3.3) + 33)}vw`, top: "55vh", width: "3vw", zIndex: 0 }} className="staff" key={staffMember.id + "floor"} src={`https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/StaffImage/${staffMember.name.replaceAll(" ", "_")}.png`} alt={staffMember.name} />
                            :
                            <Button key={staffMember.id + "floor"} disabled={(state === "walking") ? true : false} onClick={() => { see(staffMember) }} style={{ position: "absolute", left: `${((staffMember.xDist) / 3.3) + 33}vw`, top: "58vh", width: "1vw", zIndex: 1 }}><QuestionMarkIcon /></Button>
                    )
                })}
            </Grid>
            <Grid>
                <Transition
                    in={isWalking}
                    appear={true}
                    onEntered={finishPlace}
                    classNames="custom"
                >
                    <img alt="player" className="player" style={{ width: "5vw", transform: `translateX(${translatedXPos}vw)`, position: "relative", top: "11vh" }} src="https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/character/sprite.gif" />
                </Transition>
                <Button key="stairsUp" style={{ position: "relative", left: "-15vw", top: "15vh" }} onClick={() => { doStair("up") }} ><img className="stairs" src={"https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/stairsUp.png"} alt="stairs up" /></Button>
                <Button ley="stairsDown" style={{ position: "relative", left: "10vw", top: "15vh" }} onClick={() => { doStair("down") }}> <img className="stairs" src={"https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/icons/stairsDown.png"} alt="stairs down" /> </Button>
            </Grid>
        </Grid >
    )
}

export default Floor