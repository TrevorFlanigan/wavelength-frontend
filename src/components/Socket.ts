import io from "socket.io-client";

/**TODO fix this for local dev */

let socket = io();
if (process.env.NODE_ENV !== "production") {
  socket = io("http://localhost:4000", { transports: ["websocket"] });
}

export default socket;
