import React, { useEffect, useState } from "react";
import GameProps from "../types/GameProps";
import PolarCards from "./PolarCards";
import Slider from "./Slider";
import socket from "./Socket";

const StealerPlayArea = (props: GameProps) => {
  const { goal, leftWord, rightWord, value } = props;

  const handleSteal = (direction: "left" | "right") => {
    socket.emit("steal", props.roomName, direction, value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>{props.currPsychic} is up!</h2>
      <PolarCards leftWord={leftWord} rightWord={rightWord} />
      <p style={{ margin: 0 }}>
        It's your team's turn to <strong>STEAL</strong>
      </p>
      <Slider
        steal={props.steal}
        value={value}
        roomName={props.roomName}
        role="stealer"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <button
          style={{
            backgroundColor: "#7ED6FF",
            color: "#fff",
            width: "auto",
            marginRight: "5px",
          }}
          disabled={!props.steal}
          onClick={() => handleSteal("left")}
        >
          Left
        </button>
        <button
          style={{
            backgroundColor: "#FFA97E",
            color: "#fff",
            width: "auto",
            marginLeft: "5px",
          }}
          disabled={!props.steal}
          onClick={() => handleSteal("right")}
        >
          Right
        </button>
      </div>
    </div>
  );
};

export default StealerPlayArea;
