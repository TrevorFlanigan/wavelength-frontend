type GameProps = {
  leftWord: string;
  rightWord: string;
  goal: number;
  isPsychic: boolean;
  currPsychic: string;
  currTeam: string;
  roomName: string;
  userList: string[];
  leftTeam: string[];
  rightTeam: string[];
  leftTurn: boolean;
};

export default GameProps;