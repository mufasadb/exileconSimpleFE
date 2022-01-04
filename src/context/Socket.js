import socketio from "socket.io-client"
import settings from "../settings"
import React from "react"



export const socket = socketio.connect(settings.baseURL);


export const SocketContext = React.createContext();