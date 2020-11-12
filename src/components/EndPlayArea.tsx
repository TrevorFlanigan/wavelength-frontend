import React, { useEffect, useState } from "react";
import GameProps from "../types/GameProps";
import EndSlider from "./EndSlider";
import PolarCards from "./PolarCards";
import socket from "./Socket";

const EndPlayArea = (props: GameProps) => {
  const { goal, leftWord, rightWord, value } = props;
  let [bg, setBg] = useState(0);
  let [showNext, setShowNext] = useState(false);
  let [disabled, setDisabled] = useState(true);

  useEffect(() => {
    socket.on("showingtarget", () => {
      setBg(1);
      setShowNext(true);
      setTimeout(() => {
        setDisabled(false);
      }, 1200);
    });
  }, []);

  const handleContinue = () => {
    console.log("continue");
    socket.emit("continue", props.roomName);
  };
  const handleShow = () => {
    socket.emit("show", props.roomName);
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
      <EndSlider value={value} goal={goal} bg={bg} lockedIn={props.lockedIn} />
      {showNext ? (
        <button
          style={{ backgroundColor: "#7effa9", color: "#000", width: "40%" }}
          onClick={() => handleContinue()}
          disabled={disabled}
        >
          Continue
        </button>
      ) : (
        <button
          style={{ backgroundColor: "#7effa9", color: "#000", width: "40%" }}
          onClick={() => handleShow()}
        >
          Show
        </button>
      )}
      {showNext && disabled && <div className="lds-dual-ring" />}
    </div>
  );
};

export default EndPlayArea;
