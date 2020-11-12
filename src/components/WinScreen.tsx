import { WinState } from "./RoomHandler";
import React, { CSSProperties, useState } from "react";
import { useHistory } from "react-router-dom";
import RoomData from "../types/RoomData";
import socket from "./Socket";
import bg from "../assets/wavelength.gif";

type ScreenBaseProps = { winner: string; roomName: string };

const ScreenBase = (props: ScreenBaseProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginTop: 0,
          paddingTop: 20,
          textAlign: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        WAVELENGTH
      </h1>
      <div style={{ display: "flex", flexDirection: "row", margin: "20px" }}>
        <div
          style={{
            display: "flex",
            flex: "1 1 40%",
            textAlign: "center",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          flex: "1 1 300px",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        {props.winner !== "tie" && (
          <h1 style={{ color: "white" }}>
            {props.winner === "left" ? "Orange" : "Blue"} Wins!
          </h1>
        )}
        {props.winner === "tie" && (
          <h1 style={{ color: "white" }}>It's a Tie!</h1>
        )}

        <button
          style={{ backgroundColor: "#7effa9", marginTop: "20px" }}
          onClick={() => {
            socket.emit("restart", props.roomName);
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ScreenBase;
