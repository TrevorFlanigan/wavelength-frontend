import GameState from "./GameState";

type RoomData = {
  goal: number;
  leftWord: string;
  rightWord: string;
  userList: string[];
  gameState: GameState;
  leftTeam: string[];
  rightTeam: string[];
};

export default RoomData;
