import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from "@mui/material/styles/"
import GameStore from "./context/GameStore";
import { Provider } from "react-redux"
import { SocketContext, socket } from "./context/Socket"



const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  root: {
    margin: '6px'
  }
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={GameStore}>
      <ThemeProvider theme={darkTheme}  >
        <SocketContext.Provider value={socket}>
          <App />
        </SocketContext.Provider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
