enum GameState {
  "NOT_STARTED" = 0, //choose teams, people are joining, naming themselves, etc.
  "TEAM1_GUESS" = 1, //somebody presses the start button, first psychic gives word. team 1 is given a button that says submit
  "TEAM1_STEAL" = 2, //team 1 pressed submit, team 2 gets left or right buttons
  "TEAM1_END" = 3, //team 2 pressed left. Show the lobby where the target was. Grant points to teams
  "TEAM2_GUESS" = 4, //team 2 psychic gets to go. team 2 is shown submit button and can guess
  "TEAM2_STEAL" = 5, //team 2 has guessed, team 1 gets left/right buttons
  "TEAM2_END" = 6, //team 1 has pressed left/right. Show lobby the target. Go to team1guess
  "GAME_OVER" = 7, //a team has scored enough to win. Show all targets and guesses? on submit -> go to not started
}

export default GameState;
