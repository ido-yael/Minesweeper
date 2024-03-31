export default function fillInAboard(rows, col, mines) {
  // create 2d grid for the board
  let board = [];
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < col; j++) {
      board[i].push({
        row: j,
        column: i,
        minesAroundMe: 0,
        isOpen: false,
        hasMine: false,
        hasFlag: false,
      });
    }
  }

  // Adding the mines randomly
  for (let i = 0; i < mines; i++) {
    let randomRow = Math.floor(Math.random() * rows);
    let randomCol = Math.floor(Math.random() * col);

    let cell = board[randomRow][randomCol];

    if (cell.hasMine) {
      // if it already has a mine send it back one in the loop and go to another random cell
      i--;
    } else {
      cell.hasMine = true;
      //for each mine selected we threat its neighbors
      minesAroundMeCalulaion(randomRow, randomCol);
    }
  }

  function minesAroundMeCalulaion(i, j) {
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++)
        // Check if the cell is within the bounds of the board
        if (
          i + row >= 0 &&
          i + row < board.length &&
          j + col >= 0 &&
          j + col < board[0].length
        ) {
          board[i + row][j + col].minesAroundMe++;
          console.log(i + row, j + col);
        }
    }
  }

  return board;
}
