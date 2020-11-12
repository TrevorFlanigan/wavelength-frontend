import React, { useEffect, useState } from "react";
import "../styles/Slider.css";
import target from "../assets/target.svg";
import socket from "./Socket";
type SliderProps = {
  role: "stealer" | "guesser";
  roomName: string;
  value: number;
};

const Slider = (props: SliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (props.role === "stealer") return;
    if (props.role === "guesser") {
      socket.emit(
        "changevalue",
        props.roomName,
        Number.parseFloat(e.target.value)
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <input
        className="slider"
        type="range"
        min="0"
        max="100"
        step={0.00001}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Slider;
