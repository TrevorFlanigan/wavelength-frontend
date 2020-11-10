import React, { CSSProperties, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoomData from "../types/RoomData";
import toTitleCase from "../utils/toTitleCase";
import socket from "./Socket";

type RoomProps = {
  location: any;
  match?: any;
};

const scoreStyle: CSSProperties = {
  flex: "1 1 300px",
  textAlign: "center",
  color: "white",
};

const Room = (props: RoomProps) => {
  //make call to join / create the room
  const history = useHistory();
  let goal: number | undefined;
  let setGoal: React.Dispatch<React.SetStateAction<number | undefined>>;
  let [redScore, setRedScore] = useState(0);
  let [blueScore, setBlueScore] = useState(0);
  let [leftWord, setLeftWord] = useState("");
  let [rightWord, setRightWord] = useState("");
  [goal, setGoal] = useState();

  const roomName = props.match.params.room;
  useEffect(() => {
    const setData = (data: RoomData) => {
      setLeftWord(data.leftWord);
      setRightWord(data.rightWord);
      setGoal(data.goal);
    };
    socket.on("generated", (data: RoomData) => {
      setData(data);
    });

    socket.emit("joinroom", roomName, (data: RoomData) => {
      setData(data);
    });
  }, [roomName, setGoal]);

  const handleSetup = () => {
    socket.emit("generategame", roomName);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <h1 style={{ textAlign: "center" }}>
        Room Name: {props.match.params.room}
      </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <h1 style={{ backgroundColor: "red", ...scoreStyle }}>{redScore}</h1>
          <h1 style={{ backgroundColor: "blue", ...scoreStyle }}>
            {blueScore}
          </h1>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        Main play area
        <button onClick={handleSetup}>Get Words</button>
        <div>
          <h2>{toTitleCase(leftWord)}</h2>
          <h2>{toTitleCase(rightWord)}</h2>
        </div>
      </div>
    </div>
  );
};

export default Room;
