import React, { CSSProperties, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoomData from "../types/RoomData";
import socket from "./Socket";

type NotStartedProps = {
  roomName: string;
  name?: string;
  data: RoomData;
  currTeam: "left" | "right";
  handleTeamChange?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  start?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Modals = {
  NAME: "name",
  NONE: "",
};
const buttonStyle: CSSProperties = {
  width: "75%",
};

const NotStarted = (props: NotStartedProps) => {
  const history = useHistory();
  const roomName = props.roomName;
  const data = props.data;

  const renderNames = (names: string[]) => {
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {names.map((name) => (
          <li style={{ fontWeight: "bold" }}>{name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {/* <button>Start the Game</button> */}
      <div style={{ display: "flex", flexDirection: "row", margin: "20px" }}>
        <div
          style={{
            display: "flex",
            flex: "1 1 40%",
            textAlign: "center",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            disabled={props.currTeam !== "right"}
            style={{ ...buttonStyle, backgroundColor: "#FFA97E" }}
            onClick={props.handleTeamChange}
          >
            Join
          </button>
          <h2 style={{ color: "#FFA97E" }}>Team 1</h2>
          {renderNames(data.leftTeam)}
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
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            disabled={props.currTeam !== "left"}
            style={{ ...buttonStyle, backgroundColor: "#7ED6FF" }}
            onClick={props.handleTeamChange}
          >
            Join
          </button>
          <h2 style={{ color: "#7ED6FF" }}>Team 2</h2>
          {renderNames(data.rightTeam)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: "1 1 300px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={props.start}
          style={{
            backgroundColor: "#7effa9",
          }}
        >
          start
        </button>
      </div>
    </div>
  );
};

export default NotStarted;
