/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let y = 0; y < HEIGHT; y++ ){
    board.push([]);
    for(let x = 0; x < WIDTH; x++){
        board[y].push(null);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // creates an row and adds the attributes for the top boxes

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
    // set attributes for top boxes
  }
  htmlBoard.append(top);
  // adds the newly created row to the htmlBoard element

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");//each row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);// attributes for each cell in board
      row.append(cell);
    }
    htmlBoard.append(row);
  }
  // 
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let y = 5;
  while(y >= 0){
    if(board[y][x] === null){
        break;
    }
    y -= 1;
  }
  if(y > -1){
    return y;
  }
  return null;
      
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const tableSpot = document.getElementById(`${y}-${x}`);
  const piece = document.createElement('div');
  piece.setAttribute('class', `piece p${currPlayer}`);
  tableSpot.append(piece);
  


}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  return alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;
//   console.log(board);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(checkForTie()){
    return endGame(`It's TIED!!!`);
  };
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 2){
    currPlayer = 1;
  } else {
    currPlayer = 2;
  }
}

function checkForTie() {
    const bottom = board[5].every((cell) => cell !== null);
    const row5 = board[4].every((cell) => cell !== null);
    const row4 = board[3].every((cell) => cell !== null);
    const row3 = board[2].every((cell) => cell !== null);
    const row2 = board[1].every((cell) => cell !== null);
    const top = board[0].every((cell) => cell !== null);
    if(top && row2 && row3 && row4 && row5 && bottom){
        return true;
    }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { // building potential winning positions
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // checks if either returns true to dertermine if a condition was met
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
