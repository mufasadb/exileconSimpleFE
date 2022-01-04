import "./App.css";
import React, { useContext } from "react";
import { Route } from "wouter";
import { Grid } from "@mui/material";
import Game from "./components/Game"
// import io from "socket.io-client";

import { updateCards } from "./context/CardStore"
import { addRewards } from "./context/CardStore"
import { updateStaff } from "./context/StaffStore"
import { useDispatch } from "react-redux"
import { SocketContext } from "./context/Socket";
import { updatePlayerState, updateRewardOptions } from "./context/PlayerStore";
import { updateError } from "./context/UserStore"


// import settings from "./settings"


// const socket = io(Settings.baseURL)
const App = () => {

  const socket = useContext(SocketContext);

  const dispatch = useDispatch()

  socket.on("connect", () => {
    console.log("connected to websocket")
    // dispatch(updateSocket(socket))
  })


  socket.on('player', (data) => {

    // data.cards.sort((a, b) => { return (a.rarity === "magic") ? 1 : -1 })
    // data.cards.sort((a, b) => { return (a.rarity === "rare") ? 1 : -1 })
    // data.cards.sort((a, b) => { return (a.durability > b.durability) ? 1 : -1 })
    dispatch(updateCards(data.cards))
  })
  socket.on('staff', (data) => {
    dispatch(updateStaff(data))
  })

  socket.on("offerReward", (data) => {
    dispatch(updateRewardOptions(data.rewardCount))
    dispatch(addRewards(data.cards))
    dispatch(updatePlayerState("reward"))
  })

  socket.on("error", (data) => {
    dispatch(updateError(data))
  })


  return (
    <div className="App">
      <div className="App-content">
        <h1>Exilecon</h1>
        <Grid container rowSpacing={2} columnSpacing={0}>


          {/* <Grid item xs={4}>
            <Button variant="contained">
              <Link href="/">
                Characters
              </Link>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained">
              <Link href="/">
                Characters
              </Link>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained">
              <Link href="/">
                Characters
              </Link>
            </Button>
          </Grid> */}

          <Grid item xs={12}>
            <Route path="/" component={Game} > socket={socket}</Route>
          </Grid>

        </Grid>
        {/* <Route path="/items/:id">
          {(params) => <ItemDisplay id={params.id} />}
        </Route> */}
      </div>
    </div>
  );
};

export default App;
