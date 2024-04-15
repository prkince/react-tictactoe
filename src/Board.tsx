import {useState} from "react";

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

const initialState = Array(9).fill(null);


function Square({ value, onSquareClick }: SquareProps) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  // @ts-ignore
  const [squares, setSquares] = useState(initialState);
  const winner = calculateWinner(squares);

  function handleClick(index: number): any {
    if (squares[index] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  let status;
  let restartButton = false;

  const nullValues = squares.filter(value => value === null);

  if (winner) {
    status = "Winner: " + winner;
    restartButton = true;
  } else if (nullValues.length === 0) {
    status = "End of the Game, no winner!";
    restartButton = true;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let button

  if (restartButton) {
    const resetState = () => {
      setSquares(initialState);
    };
    button = (
      <button onClick={resetState}>Restart the Game</button>
    );
  }

  return (
    <>
      <h1>Welcome to The TicTacToe Game</h1>
      <div className="tictactoe">
        <h1>{status}</h1>
        {button}
        <div className="board">
          <div>
            <div className="board-row">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
              <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
              <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
              <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
              <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
              <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
              <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    // @ts-ignore
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // @ts-ignore
      return squares[a];
    }
  }

  return null;
}
