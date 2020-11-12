import React, { useEffect, useState } from "react";
import "../styles/Slider.css";
import target from "../assets/target.svg";
import socket from "./Socket";
import _ from "lodash";
type SliderProps = {
  role: "stealer" | "guesser";
  roomName: string;
  value: number;
  steal: boolean;
};

const Slider = (props: SliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (props.role === "stealer" || props.steal) return;
    if (props.role === "guesser") {
      socket.emit(
        "changevalue",
        props.roomName,
        Number.parseFloat(e.target.value)
      );
    }
    console.log("change");
  };

  const [throttledCall] = useState(() =>
    _.debounce((e) => handleChange(e), 10)
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
      }}
      className="slider-container"
    >
      <input
        className="slider"
        type="range"
        min="0"
        max="100"
        step={0.00001}
        value={props.value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Slider;
