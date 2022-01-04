import { createSlice } from "@reduxjs/toolkit"


export const gameSlice = createSlice({
    name: "staff",
    initialState: {
        staff: [],
        fighting: null,
        forgetOrder: []
    },
    reducers: {
        clearFighting: (state) => { state.fighting = null },
        updateStaff: (state, action) => {
            state.staff = action.payload;
            for (let staffMember of state.staff) {
                staffMember.seen = false
            }
        },
        queueForMember: (state, action) => {
            state.fighting = action.payload
        },
        seeStaffMember: (state, action) => {
            let memberIndex = state.staff.findIndex(staffMember => { return staffMember.id === action.payload })
            let members = state.staff
            members[memberIndex].seen = true
            state.forgetOrder.push(members[memberIndex].id)
            if (state.forgetOrder.length > 4) {
                let forgettable = state.forgetOrder[0]
                let memberIndex = state.staff.findIndex(staffMember => { return staffMember.id === forgettable })
                members[memberIndex].seen = false
                state.forgetOrder.shift();
            }

            state.staff = members
            // state.staff.map(memb => { return console.log(memb.seen) })

        }
    }
})


export const { updateStaff, seeStaffMember, queueForMember, clearFighting } = gameSlice.actions

export default gameSlice.reducer;