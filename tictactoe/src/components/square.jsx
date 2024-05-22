/* eslint-disable react/prop-types */

function Square({ value, onSquareClick, highlight }) {
  const squareStyle = {
    background: highlight ? "yellow" : "#fff",
    border: "1px solid #999",
    fontSize: "24px",
    fontWeight: "bold",
    lineHeight: "34px",
    height: "34px",
    padding: "0",
    textAlign: "center",
    width: "34px",
    cursor: "pointer",
    color: value === "X" ? "blue" : "red",
    transition: "background 0.3s",
  };

  return (
    <button style={squareStyle} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
