import React, { useEffect, useState } from "react";
import GameProps from "../types/GameProps";
import PolarCards from "./PolarCards";
import Slider from "./Slider";
import socket from "./Socket";

const GuesserPlayArea = (props: GameProps) => {
  const { goal, leftWord, rightWord, value } = props;

  const handleGuess = () => {
    socket.emit("guess", props.roomName, value);
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
        It's your team's turn to <strong>GUESS</strong>
      </p>
      <Slider
        roomName={props.roomName}
        role="guesser"
        value={value}
        steal={props.steal}
      />
      <button
        style={{ backgroundColor: "#7effa9", color: "#000", width: "40%" }}
        disabled={props.steal}
        onClick={handleGuess}
      >
        Guess
      </button>
    </div>
  );
};

export default GuesserPlayArea;
