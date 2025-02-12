import { WINNER_COMBOS } from "../constants.js";

const checkWinnerFrom = (boardToCheck) => {
  //revisar combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};

export { checkWinnerFrom, checkEndGame };
