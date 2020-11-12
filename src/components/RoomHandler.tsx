import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GameState from "../types/GameState";
import RoomData from "../types/RoomData";
import NotStarted from "./NotStarted";
import Room from "./Room";
import socket from "./Socket";
import "../styles/Modals.css";
import GameProps from "../types/GameProps";
import GuesserPlayArea from "./GuesserPlayArea";
type RoomHandlerProps = {
  match: any;
};

type Team = "left" | "right";

const RoomHandler = (props: RoomHandlerProps) => {
  let [gameState, setGameState] = useState(GameState["TEAM1_END"]);

  const history = useHistory();
  let [leftWord, setLeftWord] = useState("");
  let [rightWord, setRightWord] = useState("");
  let [leftTeam, setLeftTeam] = useState([] as string[]);
  let [rightTeam, setRightTeam] = useState([] as string[]);
  let [isPsychic, setIsPsychic] = useState(false);
  let [currPsychic, setCurrPsychic] = useState("");
  let [leftTurn, setLeftTurn] = useState(true);
  let [currTeam, setCurrTeam] = useState("" as Team);
  let [goal, setGoal] = useState(0);
  let [name, setName] = useState("");
  let [opacity, setOpacity] = useState(1);
  let [notJoined, setNotJoined] = useState(true);
  let [userList, setUserList] = useState([] as string[]);
  const roomName = props.match.params.room;

  const submit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (!name) return;
    setOpacity(0);
    setTimeout(() => setNotJoined(false), 300);

    const setData = (data: RoomData) => {
      setLeftWord(data.leftWord);
      setRightWord(data.rightWord);
      setGoal(data.goal);
      setGameState(data.gameState);
      setUserList(data.userList);
      setLeftTeam(data.leftTeam);
      setCurrPsychic(data.currPsychic);
      console.log(data);
    };

    socket.emit("joinroom", roomName, name, (data: RoomData, team: Team) => {
      setData(data);
      setCurrTeam(team);
    });
  };

  const handleTeamChange = () => {
    socket.emit(
      "changetoteam",
      roomName,
      currTeam === "left" ? "right" : "left",
      name,
      () => {
        setCurrTeam(currTeam === "left" ? "right" : "left");
      }
    );
  };

  const startGame = () => {
    socket.emit("startgame", roomName);
  };

  useEffect(() => {
    const setData = (data: RoomData) => {
      setLeftWord(data.leftWord);
      setRightWord(data.rightWord);
      setGoal(data.goal);
    };
    socket.on("generated", (data: RoomData) => {
      setData(data);
    });
    socket.on("updateuserlist", (userList: string[]) => {
      setUserList(userList);
      console.log(userList);
    });
    socket.on("updateteams", (leftTeam: string[], rightTeam: string[]) => {
      setLeftTeam(leftTeam);
      setRightTeam(rightTeam);
      console.log("left: " + leftTeam);
      console.log("right: " + rightTeam);
    });
    socket.on("startedgame", (gameState: GameState) => {
      setGameState(gameState);
    });
    socket.on("youarepsychic", () => {
      setIsPsychic(true);
    });
    socket.on("psychicchosen", (left: boolean, name: string) => {
      setLeftTurn(left);
      setCurrPsychic(name);
    });
  }, [roomName, setGoal]);

  let renderVal;
  let roomProps: GameProps = {
    goal: goal,
    leftWord: leftWord,
    rightWord: rightWord,
    isPsychic: isPsychic,
    currPsychic: currPsychic,
    currTeam: currTeam,
    userList: userList,
    rightTeam: rightTeam,
    leftTeam: leftTeam,
    roomName: roomName,
    leftTurn: leftTurn,
  };

  let data: RoomData = {
    ...roomProps,
    gameState: gameState,
  };
  switch (gameState) {
    case GameState["GAME_OVER"]:
    case GameState["NOT_STARTED"]:
      renderVal = (
        <NotStarted
          roomName={roomName}
          data={data}
          currTeam={currTeam}
          handleTeamChange={handleTeamChange}
          start={startGame}
        />
      );
      break;
    default:
      renderVal = <Room {...roomProps} />;
      break;
  }

  return (
    <div>
      {/* Modal */}
      {notJoined ? (
        <div className="backdrop" style={{ opacity: opacity }}>
          <form className="form">
            <h1 style={{ borderBottom: "1px solid #c4c4c4" }}>
              What's Your Name?{" "}
            </h1>
            <input
              style={{ fontFamily: "Catamaran", margin: "20px" }}
              placeholder="Name"
              onSubmit={submit}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button style={{ backgroundColor: "#7effa9" }} onClick={submit}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        renderVal
      )}
    </div>
  );
};

export default RoomHandler;
