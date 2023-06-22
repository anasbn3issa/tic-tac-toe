import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Cell from './components/Cell';
import './App.css';

function App() {
  const [gridSize, setGridSize] = useState(0);
  const [grid, setGrid] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  // const [wins, setWins] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleCellClick = (x, y) => {
    if (grid[y][x] === null) {
      const newGrid = [...grid];
      newGrid[y][x] = currentPlayer;
      setGrid(newGrid);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const handleButtonClickSetGridSize = () => {
    const size = parseInt(inputValue);
    const newGrid = Array(size).fill(null).map(() => Array(size).fill(null));

    setGridSize(size);
    setGrid(newGrid);
  };

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
        return;
      }
    };

    checkWinner('X');
    checkWinner('O');
  }, [grid]);

  return (
    <div className="App">
      <label>Grid size:</label>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleButtonClickSetGridSize}>Enter</button>
      {gridSize > 0 && (
        <Board size={gridSize * 100} className="tictactoe">
          {grid.map((row, y) => row.map((cell, x) => (
            <Cell
              x={x * 100}
              y={y * 100}
              size={100}
              fill={cell === 'X' ? 'red' : cell === 'O' ? 'blue' : 'white'}
              key={`${x},${y}`}
              onClick={() => handleCellClick(x, y)}
            >
              {cell}
            </Cell>
          )))}
        </Board>
      )}

      <div>Current player: {currentPlayer}</div>
      <div>Grid size: {gridSize}</div>
      <div>Grid: {JSON.stringify(grid)}</div>
    </div>
  );
}

export default App;
