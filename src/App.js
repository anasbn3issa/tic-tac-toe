import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Cell from "./components/Cell";
import "./App.css";

function App() {
  const [gridSize, setGridSize] = useState(0);
  const [grid, setGrid] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winsX, setWinsX] = useState(0);
  const [winsO, setWinsO] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleCellClick = (x, y) => {
    if (grid[y][x] === null) {
      const newGrid = [...grid];
      newGrid[y][x] = currentPlayer;
      setGrid(newGrid);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleButtonClickSetGridSize = () => {
    const size = parseInt(inputValue);
    const newGrid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    setGridSize(size);
    setGrid(newGrid);
  };

  // Reset grid
  const handleResetAll = () => {
    setGridSize(0);
    setGrid([]);
    setCurrentPlayer("X");
    setWinsX(0);
    setWinsO(0);
    setInputValue("");
  };

  const handleResetNewRound = () => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));
    setGrid(newGrid);
    setCurrentPlayer("X");
  };

  const makeComputerMove = () => {
    if (currentPlayer === 'O') {
      if(gridSize === 0 ) {
        return;
      }
      let x, y;
      do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
      } while (grid[y][x] !== null);

      const newGrid = [...grid];
      newGrid[y][x] = currentPlayer;
      setGrid(newGrid);
      setCurrentPlayer('X');
    }
  };


  // Check for winner
  useEffect(() => {
    const checkWinner = (player) => {
      // Check rows
      for (let i = 0; i < gridSize; i++) {
        let hasWon = true;
        for (let j = 0; j < gridSize; j++) {
          if (grid[i][j] !== player) {
            hasWon = false;
            break;
          }
        }
        if (hasWon) {
          console.log(`Player ${player} wins!`);
          if (player === "X") {
            setWinsX((winsX) => winsX + 1);
          } else {
            setWinsO((winsO) => winsO + 1);
          }
          return;
        }
      }

      // Check columns
      for (let i = 0; i < gridSize; i++) {
        let hasWon = true;
        for (let j = 0; j < gridSize; j++) {
          if (grid[j][i] !== player) {
            hasWon = false;
            break;
          }
        }
        if (hasWon) {
          console.log(`Player ${player} wins!`);
          if (player === "X") {
            setWinsX((winsX) => winsX + 1);
          } else {
            setWinsO((winsO) => winsO + 1);
          }
          return;
        }
      }

      // Check diagonals
      let hasWon = true;
      for (let i = 0; i < gridSize; i++) {
        if (grid[i][i] !== player) {
          hasWon = false;
          break;
        }
      }
      if (hasWon) {
        console.log(`Player ${player} wins!`);
        if (player === "X") {
          setWinsX((winsX) => winsX + 1);
        } else {
          setWinsO((winsO) => winsO + 1);
        }
        return;
      }

      hasWon = true;
      for (let i = 0; i < gridSize; i++) {
        if (grid[i][gridSize - 1 - i] !== player) {
          hasWon = false;
          break;
        }
      }
      if (hasWon) {
        console.log(`Player ${player} wins!`);
        if (player === "X") {
          setWinsX((winsX) => winsX + 1);
        } else {
          setWinsO((winsO) => winsO + 1);
        }
        return;
      }
    };

    if (gridSize === 0) return;
    checkWinner("X");
    checkWinner("O");

    if(currentPlayer=== 'O') {
      makeComputerMove();
    }


  }, [grid]);

  // Check for wins
  useEffect(() => {
    // to start a new round
    if (winsX !== 3 && winsO !== 3) {
      handleResetNewRound();
      return;
    }
    // when one player wins 3 times
    if (winsX === 3) {
      alert(`Player X wins!`);
    }
    if (winsO === 3) {
      alert(`Player O wins!`);
    }
    handleResetAll();
  }, [winsX, winsO]);

  return (
    <div className="App">
      <div className="input-size">
        <label>Grid size:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleButtonClickSetGridSize}>Enter</button>
      </div>

      {gridSize > 0 && (
        <Board size={gridSize * 100} className="tictactoe">
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                x={x * 100}
                y={y * 100}
                size={100}
                fill={cell === "X" ? "red" : cell === "O" ? "blue" : "white"}
                key={`${x},${y}`}
                onClick={() => handleCellClick(x, y)}
              >
                {cell}
              </Cell>
            ))
          )}
        </Board>
      )}
      <div>
        <div>Current player: {currentPlayer}</div>
        <div>Grid size: {gridSize}</div>
        <div>Grid: {JSON.stringify(grid)}</div>
        <div>Wins X: {winsX}</div>
        <div>Wins O: {winsO}</div>
      </div>

      <button onClick={handleResetAll}>Reset</button>
    </div>
  );
}

export default App;
