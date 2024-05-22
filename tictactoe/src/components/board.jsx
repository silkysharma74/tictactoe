/* eslint-disable react/prop-types */

import Square from "./square";

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay, winningSquares }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square)) {
    status = "Result: Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const renderSquare = (i) => {
    const highlight = winningSquares && winningSquares.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        highlight={highlight}
      />
    );
  };

  const boardStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 34px)",
    gridGap: "5px",
    justifyContent: "center",
    margin: "20px 0",
  };

  const statusStyle = {
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "18px",
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={statusStyle}>{status}</div>
      <div style={boardStyle}>
        {squares.map((_, index) => renderSquare(index))}
      </div>
    </div>
  );
}

export default Board;
