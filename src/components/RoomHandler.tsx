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
import WinScreen from "./WinScreen";
type RoomHandlerProps = {
  match: any;
};

export type WinState = "tie" | "left" | "right" | "neither";

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
  let [leftScore, setLeftScore] = useState(0);
  let [rightScore, setRightScore] = useState(0);
  let [steal, setSteal] = useState(false);
  let [end, setEnd] = useState(false);
  let [value, setValue] = useState(50);
  let [winner, setWinner] = useState("neither" as WinState);

  const roomName = props.match.params.room.toLowerCase();

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

  const startGame = (maxScore: number) => {
    if (Number.isNaN(maxScore)) maxScore = 10;
    else if (maxScore >= 40) maxScore = 40;
    socket.emit("startgame", roomName, maxScore);
  };

  useEffect(() => {
    switch (gameState) {
      case GameState["TEAM1_END"]:
      case GameState["TEAM2_END"]:
        setEnd(true);
        setSteal(false);
        break;
      case GameState["TEAM1_GUESS"]:
      case GameState["TEAM2_GUESS"]:
        setEnd(false);
        setSteal(false);
        break;
      case GameState["TEAM1_STEAL"]:
      case GameState["TEAM2_STEAL"]:
        setEnd(false);
        setSteal(true);
    }
  }, [gameState]);

  useEffect(() => {
    const setData = (data: RoomData) => {
      setLeftWord(data.leftWord);
      setRightWord(data.rightWord);
      setGoal(data.goal);
    };
    const setAllData = (data: RoomData) => {
      setLeftWord(data.leftWord);
      setRightWord(data.rightWord);
      setGoal(data.goal);
      setGameState(data.gameState);
      setUserList(data.userList);
      setLeftTeam(data.leftTeam);
      setCurrPsychic(data.currPsychic);
      console.log(data);
    };
    socket.on("restarted", (data: RoomData) => {
      setAllData(data);
      setWinner("neither");
      console.log(data);
    });

    socket.on("winner", (winner: WinState) => {
      setWinner(winner);
    });

    socket.on("valuechanged", (value: number) => {
      setValue(value);
    });

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

    socket.on("setgamestate", (gameState: GameState) => {
      setGameState(gameState);
    });

    socket.on("youarepsychic", () => {
      setIsPsychic(true);
    });

    socket.on("psychicchosen", (left: boolean, name: string) => {
      setLeftTurn(left);
      setCurrPsychic(name);
    });

    socket.on("updatescore", (left: number, right: number) => {
      setTimeout(() => {
        setLeftScore(left);
        setRightScore(right);
      }, 500);
    });

    socket.on("updatestate", (state: GameState) => {
      setGameState(state);
    });

    socket.on("showingtarget", () => {
      setIsPsychic(false);
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
    steal: steal,
    end: end,
    value: value,
  };

  let data: RoomData = {
    ...roomProps,
    gameState: gameState,
  };

  if (winner !== "neither")
    return <WinScreen winner={winner} roomName={roomName} />;

  switch (gameState) {
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
      renderVal = (
        <Room leftScore={leftScore} rightScore={rightScore} {...roomProps} />
      );
      break;
  }

  return (
    <div style={{ maxHeight: "100vh", maxWidth: "100vw", overflowX: "hidden" }}>
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
