import React from "react";
import GameProps from "../types/GameProps";
import PolarCards from "./PolarCards";
import Slider from "./Slider";
import Target from "./Target";

const PlayArea = (props: GameProps) => {
  const { goal, leftWord, rightWord } = props;
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
      {props.isPsychic && <div>{goal}</div>}
      {props.isPsychic ? <Target goal={goal} /> : <Slider goal={goal} />}
      <button
        style={{ backgroundColor: "#7effa9", color: "#000", width: "40%" }}
      >
        Guess
      </button>
    </div>
  );
};

export default PlayArea;
