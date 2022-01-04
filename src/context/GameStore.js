import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./CardStore"
import staffReducer from "./StaffStore"
import playerReducer from "./PlayerStore"
import userReducer from "./UserStore"

export default configureStore({
    reducer: {
        cards: cardsReducer,
        staff: staffReducer,
        player: playerReducer,
        user: userReducer
    }
});