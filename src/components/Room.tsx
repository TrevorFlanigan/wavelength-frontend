import React, { CSSProperties, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoomData from "../types/RoomData";
import toTitleCase from "../utils/toTitleCase";
import PlayArea from "./PlayArea";
import PolarCards from "./PolarCards";
import socket from "./Socket";
import "../styles/Modals.css";
import GameProps from "../types/GameProps";
import PsychicPlayArea from "./PsychicPlayArea";
import GuesserPlayArea from "./GuesserPlayArea";
import StealerPlayArea from "./StealerPlayArea";
import wavelength from "../assets/wavelength.jpg";
import wavegif from "../assets/wavelength.gif";

// type RoomProps = {
//   roomName: string;
//   data: RoomData;
//   currTeam: "left" | "right";
//   isPsychic: boolean;
//   currPsychic: string;
// };

const scoreStyle: CSSProperties = {
  flex: "1 1 300px",
  textAlign: "center",
  color: "white",
};
const Modals = {
  NAME: "name",
  NONE: "",
};

const Room = (props: GameProps) => {
  const history = useHistory();
  let [orangeScore, setOrangeScore] = useState(0);
  let [blueScore, setBlueScore] = useState(0);
  const roomName = props.roomName;

  const renderNames = (names: string[]) => {
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {names.map((name) => (
          <li style={{ fontWeight: "bold" }}>{name}</li>
        ))}
      </ul>
    );
  };

  const { leftTeam, rightTeam } = props;
  const guessing = props.currTeam === (props.leftTurn ? "left" : "right");

  const renderPlayArea = () => {
    if (props.isPsychic) return <PsychicPlayArea {...props} />;
    if (guessing) return <GuesserPlayArea {...props} />;
    else return <StealerPlayArea {...props} />;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        WAVELENGTH
      </h1>
      {/* <h1 style={{ textAlign: "center" }}>Room Name: {roomName}</h1> */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flex: "1 1 40%",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <h2>Team 1</h2>
          {renderNames(leftTeam)}
        </div>
        <div
          style={{
            display: "flex",
            placeItems: "center",
            justifyContent: "center",
            flex: "0 1 10%",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            VS
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            flex: "1 1 40%",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <h2>Team 2</h2>
          {renderNames(rightTeam)}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <h1 style={{ backgroundColor: "#FFA97E", ...scoreStyle }}>
            {orangeScore}
          </h1>
          <h1 style={{ backgroundColor: "#7ED6FF", ...scoreStyle }}>
            {blueScore}
          </h1>
        </div>
      </div>

      {renderPlayArea()}
    </div>
  );
};

export default Room;
