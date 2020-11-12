import React, { useEffect, useState } from "react";
import GameProps from "../types/GameProps";
import PolarCards from "./PolarCards";
import socket from "./Socket";
import Target from "./Target";

const PsychicPlayArea = (props: GameProps) => {
  const { goal, leftWord, rightWord } = props;

  let [value, setValue] = useState(50);
  useEffect(() => {
    socket.on("valuechanged", (value: number) => {
      setValue(value);
    });
  }, []);

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
        You're the <strong>PSYCHIC</strong>
      </p>
      <Target goal={goal} value={value} />
    </div>
  );
};

export default PsychicPlayArea;
