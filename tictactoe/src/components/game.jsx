import { useState } from "react";
import Board from "./board";

function calculateWinningSquares(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const moves = history.map((squares, move) => {
    const row = Math.floor(move / 3) + 1;
    const col = (move % 3) + 1;
    const desc = move
      ? `Go to move #${move} (${row}, ${col})`
      : "Go to game start";
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();
  const winningSquares = calculateWinningSquares(currentSquares);

  const gameStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const gameInfoStyle = {
    marginLeft: "20px",
  };

  return (
    <div className="game" style={gameStyle}>
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info" style={gameInfoStyle}>
        <button onClick={toggleSortOrder}>
          Sort moves {isAscending ? "Descending" : "Ascending"}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}
