import fillInAboard from "../utilities/fillInAboard";
import Cell from "./Cell";
import { useState } from "react";
import GameOver from "./GameOver";

//initializing the game board
const initilMinesNumber = 10;
const initilRows = 10;
const initilCols = 10;
const array2D = fillInAboard(initilRows, initilCols, initilMinesNumber);

export default function GameBoard() {
  console.log(array2D);

  const [gameBoard, setGameBoard] = useState(array2D);
  const [numberOfFlags, setNumberOfFlags] = useState(initilMinesNumber);


  function handleRestart() {
    setGameBoard(fillInAboard(initilRows, initilCols, initilMinesNumber));
  }

  function handleSelectCell(event, row, col) {
    setGameBoard((prevGameBoard) => {
      //preventing the default right click 
      event.preventDefault();
      const updatedGameBoard = JSON.parse(JSON.stringify(prevGameBoard));

      const updatedCell = { ...updatedGameBoard[row][col] };

      // Check if it's a right click
      if (event.button === 2) {
        console.log("Right click detected");
        setNumberOfFlags((prevFlagNumber)=>{
            let newFlagNumber = prevFlagNumber
            if (updatedCell.hasFlag){newFlagNumber--}
            else newFlagNumber++
            return newFlagNumber
        })
        updatedCell.hasFlag = !updatedCell.hasFlag;
        updatedGameBoard[row][col] = updatedCell;

      //otherwise its left click and needs to be opened in any case
      } else {
        updatedCell.isOpen = true;

        updatedGameBoard[row][col] = updatedCell;
        //if the cell has no mines ajestence, recursive function 
        //of revealing will be called.
        if (updatedCell.minesAroundMe === 0) {
          revealEmptyNeighbors(updatedGameBoard, row, col);
        }
      }
      return updatedGameBoard;
    });
  }

  function revealEmptyNeighbors(board, row, col) {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (isValidCell(board, newRow, newCol) && !board[newRow][newCol].isOpen) {
        board[newRow][newCol].isOpen = true;
        board[newRow][newCol].hasFlag = false;
        // If the neighbor is also empty, recursively reveal its neighbors
        if (board[newRow][newCol].minesAroundMe === 0) {
          revealEmptyNeighbors(board, newRow, newCol); 
        }
      }
    }
  }

  //check if not out of bound
  function isValidCell(board, row, col) {
    return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
  }

  // Check if the game is over
  const isGameOver = gameBoard.some((row) =>
    row.some((cell) => cell.hasMine && cell.isOpen)
  );
  // Check if the game is won
  const isGameWon = gameBoard.every((row) =>
    row.every((cell) => (cell.hasMine ? !cell.isOpen : cell.isOpen))
  );

  return (
    <div className="center">
      <h1>Minesweeper</h1>

      <ol id="headers">
        <li>
          <span>Flags Remaining</span>
          <span>{numberOfFlags}</span>
        </li>
        <button onClick={handleRestart}>Rematch!</button>
      </ol>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(10,30px)`,
          gridTemplateColumns: `repeat(10,30px)`,
        }}
      >
        {gameBoard.map((row, i) =>
          row.map((col, j) => (
            <Cell
              key={`${i}-${j}`}
              cell={gameBoard[i][j]}
              gameBoard={gameBoard}
              handleSelectCell={(event) => handleSelectCell(event, i, j)}
            ></Cell>
          ))
        )}
        {(isGameOver || isGameWon) && (
          <GameOver onRestart={handleRestart} isGameWon={isGameWon} />
        )}
      </div>
    </div>
  );
}
