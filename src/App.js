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
  const [isDraw, setIsDraw] = useState(false);
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
    setIsDraw(false);
    setInputValue("");
  };

  const handleResetNewRound = () => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));
    setGrid(newGrid);
    setIsDraw(false);
    setCurrentPlayer("X");
  };

  const makeComputerMove = () => {
    if (currentPlayer === "O") {
      if (gridSize === 0) {
        return;
      }
    let foundFreeCell = false;
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] === null) {
          const newGrid = [...grid];
          newGrid[y][x] = currentPlayer;
          setGrid(newGrid);
          setCurrentPlayer("X");
          foundFreeCell = true;
          break;
        }
      }
      if (foundFreeCell) {
        break;
      }
    }
    }
  };

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
          console.log("incremented winsO", winsO);
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

  // Check for winner
  useEffect(() => {
    if (gridSize === 0) return;

    if (currentPlayer === "O" && winsX !== 3 && winsO !== 3) {
      makeComputerMove();
    }
      checkWinner(currentPlayer);
      if (!isDraw && grid.every((row) => row.every((cell) => cell !== null))) {
        setIsDraw(true);
        handleResetNewRound();
      } 
  
    
  }, [grid]);

  // Check for wins
  useEffect(() => {
    // to start a new round
    if (winsX !== 3 && winsO !== 3) {
      handleResetNewRound();
      return;
    }

    // when its a draw
    if (isDraw) {
      alert('its a draw !');
    }
    // when one player wins 3 times
    if (winsX === 3) {
      alert(`Player X wins!`);
    }
    if (winsO === 3) {
      alert(`Player O wins!`);
    }
    handleResetAll();
  }, [winsX, winsO, isDraw]);

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
      <div className="info">
        <div>Current player: {currentPlayer}</div>
        <div>Grid size: {gridSize}</div>
        <div>Grid: {JSON.stringify(grid)}</div>
        <div>Wins X: {winsX}</div>
        <div>Wins O: {winsO}</div>
      </div>

      <button onClick={handleResetAll}>Reset All</button>
    </div>
  );
}

export default App;
