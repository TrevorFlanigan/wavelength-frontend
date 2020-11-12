import React from "react";
import target from "../assets/target.svg";
type TargetProps = { goal: number; value: number };

const Target = (props: TargetProps) => {
  return (
    <div
      // className="slider-container"
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
        // border: "1px solid grey",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        outline: "none",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${target})`,
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
          zIndex: 99999,
          position: "absolute",
          bottom: 0,
          backgroundColor: "rgba(255,255,255,0)",
        }}
      />
      {/* <div
        style={{
          width: "5px",
          borderRadius: "3px",
          height: "100%",
          backgroundColor: "red",
          // backgroundRepeat: "repeat-y",
          transform: `translateX(${props.value - 27}vw)`,
          zIndex: 999999,
          position: "absolute",
          bottom: 0,
        }}
      ></div> */}
    </div>
  );
};

export default Target;
