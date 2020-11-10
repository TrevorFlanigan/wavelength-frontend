import React from "react";
import socket from "./Socket";
type HomeProps = {};

const Home = (props: HomeProps) => {
  return (
    <div>
      <button
        onClick={() => {
          console.log("hi");
          socket.emit("message", "hi");
        }}
      >
        Hello
      </button>
    </div>
  );
};

export default Home;
