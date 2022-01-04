import { createSlice } from "@reduxjs/toolkit"


export const gameSlice = createSlice({
    name: "player",
    initialState: {
        floor: 1,
        class: "normalGuy",
        speed: 50,
        luckRating: 1,
        state: "searching",
        reward: {
            rewardCount: null,
            staffMemberId: null,
        },
        time: 0,
        day: 0,
        progressing: false,
        xPos: 0,
        newXPos: 0
    },
    reducers: {
        updateXPos: (state, action) => {
            state.newXPos = action.payload
            state.state = "walking"
        },
        resolveMove: (state) => {
            state.xPos = state.newXPos
            state.state = "searching"
        },
        beginTime: (state) => {
            if (!state.progressing) { state.progressing = true }
        },
        stopTime: (state) => {
            if (state.progressing) { state.progressing = false }
        },
        progressTime: (state, action) => {
            console.log("progressTime  initiated")
            if (state.day === 0) { state.day = 1 }
            if (state.time < 121) {
                state.time = state.time + action.payload
            }
            if (state.time > 121) {
                if (state.day === 1) { state.time = 0; state.day = 2; }
                else { stopTime() }
            }
        },
        updatePlayer: (state, action) => {
            state.speed = action.payload.class.speed
            state.luckRating = action.payload.luckRating
        },
        changeFloor: (state, action) => {
            let newFloor = state.floor + action.payload
            if (newFloor > -1 && newFloor < 3) {
                state.floor = newFloor
            }
        },
        updatePlayerState: (state, action) => {
            if (acceptableStates.includes(action.payload)) {
                state.state = action.payload
            }
            console.log(state.state)
        },
        updateRewardOptions: (state, action) => {
            console.log("updating reward count")
            state.reward.rewardCount = action.payload
        }
    }
})



const acceptableStates = ["searching", "walking", "queueing", "fighting", "preparingForFight", "reward"]

export const { updatePlayer, changeFloor, updatePlayerState, updateRewardOptions, progressTime, beginTime, stopTime, updateXPos, resolveMove } = gameSlice.actions

export default gameSlice.reducer;