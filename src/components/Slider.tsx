import React, { useEffect, useState } from "react";
import "../styles/Slider.css";
import target from "../assets/target.svg";
type SliderProps = { goal: number };

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
const Slider = (props: SliderProps) => {
  // let windowDimensions = useWindowDimensions();
  let [value, setValue] = useState(50);

  // let bgTranslate = (windowDimensions.width * (props.goal - 50)) / 100;
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
        style={{
          backgroundImage: `url(${target})`,
          backgroundSize: "100%",
          backgroundRepeat: "repeat-y",
          // backgroundPositionX: `${bgTranslate}px`,
        }}
        value={value}
        onChange={(e) => setValue(Number.parseFloat(e.target.value))}
      />
    </div>
  );
};

export default Slider;
