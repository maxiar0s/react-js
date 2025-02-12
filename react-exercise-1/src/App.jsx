import "./App.css";
import { useState, useEffect, use } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import WinnerModal from "./components/WinnerModal";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";

function App() {
  //console.log("render");

  const [board, setBoard] = useState(() => {
    //console.log("inicializar estado de board");
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });
  const [winner, setWinner] = useState(null); // null=ningun ganador, false=empate, x/o=ganador

  const updateBoard = (index) => {
    //actualizar el tablero
    const newBoard = [...board];

    //no actualizar si ya hay un valor en la casilla
    if (board[index] || winner) return;
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    //verificar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    }

    //checkear si el juego terminó
    if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    //remover partida guardada
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  useEffect(() => {
    console.log("useEffect");
  }, [winner]);

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
