import { createSlice } from "@reduxjs/toolkit"


export const gameSlice = createSlice({
    name: "user",
    initialState: {
        error: null,
        event: null
    },
    reducers: {
        updateEvent: (state, action) => {

        },
        clearEvent: (state) => { state.error = null },
        updateError: (state, action) => {
            state.error = action.payload
        },
        clearError: (state) => { state.error = null }
    }
})



export const { updateError, clearError, updateEvent, clearEvent } = gameSlice.actions

export default gameSlice.reducer;