import React from "react";
import target from "../assets/target.svg";
import "../styles/Spinner.css";
type TargetProps = { goal: number; value: number; bg: number };

const EndSlider = (props: TargetProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        WebkitAppearance: "none",
        width: "calc(100% - 10px)",
        maxHeight: "100px",
        minHeight: "50px",
        height: "10vh",
        background: "#f5f6fa",
        borderRadius: "5px",
        marginTop: "20px",
        marginBottom: "20px",
        outline: "none",
      }}
      className="slider-container"
    >
      <div
        style={{
          backgroundImage: `url(${target})`,
          opacity: props.bg,
          transition: "opacity 1s",
          maxHeight: "100px",
          minHeight: "50px",
          height: "10vh",
          backgroundSize: "100%",
          backgroundRepeat: "repeat-y",
          transform: `translateX(${props.goal - 50}vw)`,
          border: "none",
        }}
      ></div>
      <input
        className="slider"
        type="range"
        min="0"
        max="100"
        step={0.00001}
        value={props.value}
        style={{
          height: "calc(10vh - 2px)",
          position: "absolute",
          bottom: 0,
          border: "1px solid black",
          margin: 0,
          backgroundColor: "rgba(255,255,255,0)",
        }}
      />
    </div>
  );
};

export default EndSlider;
