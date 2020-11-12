import React, { useEffect, useState } from "react";
import GameProps from "../types/GameProps";
import PolarCards from "./PolarCards";
import Target from "./Target";

const PsychicPlayArea = (props: GameProps) => {
  const { goal, leftWord, rightWord, value } = props;

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
      <Target goal={goal} value={value} lockedIn={props.lockedIn} />
    </div>
  );
};

export default PsychicPlayArea;
