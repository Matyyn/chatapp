import { io } from "socket.io-client";

const URL = "http://192.168.43.204:8080";
const socket = io.connect(URL);

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
