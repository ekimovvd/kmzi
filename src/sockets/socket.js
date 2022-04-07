import io from "socket.io-client";

const WINDOW_NAMESPACE_NAME = "__socket";
const socket = io("http://localhost:3000");

if (!window[WINDOW_NAMESPACE_NAME]) {
  window[WINDOW_NAMESPACE_NAME] = socket;
  console.log("Socket.io connected");
}
