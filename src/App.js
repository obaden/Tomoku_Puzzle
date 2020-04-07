import React from "react";
import Node from "./Node";
import "./App.css";

const NodeType = {
  empty: 0,
  square: 1,
  verticalTop: 2,
  verticalBottom: 3,
  horizontalLeft: 4,
  horizontalRight: 5,
};

const small_board = {
  rowSquares: [3, 0, 1, 2],
  colSquares: [3, 0, 0, 0, 1, 1, 1],
  vertBoxes: [0, 1, 1, 1, 0, 0, 1],
  horzBoxes: [1, 2, 2, 2],
};

const medium_board = {
  rowSquares: [2, 0, 0, 1, 1, 2],
  colSquares: [1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  vertBoxes: [2, 1, 2, 2, 3, 2, 1, 1, 2, 3, 2, 2],
  horzBoxes: [3, 2, 1, 0, 1, 3],
};

const large_board = {
  rowSquares: [3, 2, 0, 0, 0, 1, 1, 0, 3],
  colSquares: [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4],
  vertBoxes: [3, 2, 2, 1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1],
  horzBoxes: [3, 1, 2, 3, 4, 3, 3, 4, 4],
};

class App extends React.Component {
  constructor() {
    super();

    // default board is the small board
    let currentBoard = small_board;
    this.state = {
      board: this.emptyGrid(
        currentBoard.rowSquares.length,
        currentBoard.colSquares.length
      ),
      cornerCount: this.emptyGrid(
        currentBoard.rowSquares.length + 1,
        currentBoard.colSquares.length + 1
      ),
      rowSquares: currentBoard.rowSquares.slice(),
      colSquares: currentBoard.colSquares.slice(),
      vertBoxes: currentBoard.vertBoxes.slice(),
      horzBoxes: currentBoard.horzBoxes.slice(),

      currentBoard: currentBoard,
      draggingFrom: null,
      solving: false,
      stop: false,
    };
  }

  // sets the board to a board passed to it. The board is only made up of which pieces
  // are available in the rows and columns.
  // Can also be used to reset the board by passing it the same board being displayed
  setBoard = (board) => {
    this.setState({
      board: this.emptyGrid(board.rowSquares.length, board.colSquares.length),
      cornerCount: this.emptyGrid(
        board.rowSquares.length + 1,
        board.colSquares.length + 1
      ),
      rowSquares: board.rowSquares.slice(),
      colSquares: board.colSquares.slice(),
      vertBoxes: board.vertBoxes.slice(),
      horzBoxes: board.horzBoxes.slice(),
      currentBoard: board,
    });
  };

  // creates and returns new empty board of given dimensions
  emptyGrid = (rows, cols) => {
    let board = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(NodeType.empty);
      }
      board.push(row);
    }
    return board;
  };

  // the method a node calls when it's clicked on.
  // adds a square if node is empty. Otherwise removes the piece at that node.
  // also sets the node as the one currently being dragged from for creating horizontal and vertical pieces
  handleMouseDown = (row, col) => {
    const { board, solving } = this.state;
    if (!solving) {
      if (board[row][col] === NodeType.empty) {
        this.addPiece(row, col, NodeType.square);
        this.setState({ draggingFrom: [row, col] });
      } else {
        this.removePiece(row, col);
      }
    }
  };

  // resets node being dragged from when mouse click is released
  handleMouseUp = () => {
    this.setState({ draggingFrom: null });
  };

  // if the user is dragging into a valid node, creates a vertical or horizontal piece and
  // removes the square piece that was placed at drag start
  handleMouseEnter = (row, col) => {
    if (!this.state.solving) {
      let prevLoc = this.state.draggingFrom;
      if (
        this.state.draggingFrom &&
        this.state.board[row][col] === NodeType.empty
      ) {
        if (row === prevLoc[0]) {
          if (col === prevLoc[1] - 1) {
            this.removePiece(prevLoc[0], prevLoc[1]);
            this.addPiece(row, col, NodeType.horizontalLeft);
            this.handleMouseUp();
          } else if (col === prevLoc[1] + 1) {
            this.removePiece(prevLoc[0], prevLoc[1]);
            this.addPiece(prevLoc[0], prevLoc[1], NodeType.horizontalLeft);
            this.handleMouseUp();
          }
        } else if (col === prevLoc[1]) {
          if (row === prevLoc[0] - 1) {
            this.removePiece(prevLoc[0], prevLoc[1]);
            this.addPiece(row, col, NodeType.verticalTop);
            this.handleMouseUp();
          } else if (row === prevLoc[0] + 1) {
            this.removePiece(prevLoc[0], prevLoc[1]);
            this.addPiece(prevLoc[0], prevLoc[1], NodeType.verticalTop);
            this.handleMouseUp();
          }
        }
      }
    }
  };

  // returns a copy of a given 2D grid.
  copyGrid = (grid) => {
    let newGrid = [];
    grid.forEach((row) => {
      newGrid.push(row.slice());
    });
    return newGrid;
  };

  // places a piece of the given type at given position. type must be verticalTop, horizontalLeft or square.
  // updates the available piece count and the corner count at the corners for checking if board is valid
  addPiece = (row, col, type) => {
    const {
      board,
      colSquares,
      rowSquares,
      vertBoxes,
      horzBoxes,
      cornerCount,
    } = this.state;
    let newBoard = this.copyGrid(board);

    switch (type) {
      case NodeType.square:
        if (colSquares[col] > 0 && rowSquares[row] > 0) {
          newBoard[row][col] = NodeType.square;
          cornerCount[row][col]++;
          cornerCount[row][col + 1]++;
          cornerCount[row + 1][col + 1]++;
          cornerCount[row + 1][col]++;
          colSquares[col]--;
          rowSquares[row]--;
        } else {
          return false;
        }
        break;
      case NodeType.horizontalLeft:
        if (horzBoxes[row] > 0) {
          newBoard[row][col] = NodeType.horizontalLeft;
          newBoard[row][col + 1] = NodeType.horizontalRight;
          cornerCount[row][col]++;
          cornerCount[row][col + 2]++;
          cornerCount[row + 1][col + 2]++;
          cornerCount[row + 1][col]++;
          horzBoxes[row]--;
        } else {
          return false;
        }
        break;
      case NodeType.verticalTop:
        if (vertBoxes[col] > 0) {
          newBoard[row][col] = NodeType.verticalTop;
          newBoard[row + 1][col] = NodeType.verticalBottom;
          cornerCount[row][col]++;
          cornerCount[row][col + 1]++;
          cornerCount[row + 2][col + 1]++;
          cornerCount[row + 2][col]++;
          vertBoxes[col]--;
        } else {
          return false;
        }
        break;
      default:
        return;
    }
    this.setState({
      board: newBoard,
    });
    return true;
  };

  // remove the piece at a given position. This may effect other positions when removing longer pieces.
  // updates the available piece count and the corner count at the corners for checking if board is valid
  removePiece = (row, col) => {
    const {
      board,
      colSquares,
      rowSquares,
      vertBoxes,
      horzBoxes,
      cornerCount,
    } = this.state;
    let newBoard = this.copyGrid(board);

    switch (newBoard[row][col]) {
      case NodeType.horizontalLeft:
        newBoard[row][col + 1] = NodeType.empty;
        cornerCount[row][col]--;
        cornerCount[row][col + 2]--;
        cornerCount[row + 1][col + 2]--;
        cornerCount[row + 1][col]--;
        horzBoxes[row]++;
        break;
      case NodeType.horizontalRight:
        newBoard[row][col - 1] = NodeType.empty;
        cornerCount[row][col - 1]--;
        cornerCount[row][col + 1]--;
        cornerCount[row + 1][col + 1]--;
        cornerCount[row + 1][col - 1]--;
        horzBoxes[row]++;
        break;
      case NodeType.verticalTop:
        newBoard[row + 1][col] = NodeType.empty;
        cornerCount[row][col]--;
        cornerCount[row][col + 1]--;
        cornerCount[row + 2][col + 1]--;
        cornerCount[row + 2][col]--;
        vertBoxes[col]++;
        break;
      case NodeType.verticalBottom:
        newBoard[row - 1][col] = NodeType.empty;
        cornerCount[row - 1][col]--;
        cornerCount[row - 1][col + 1]--;
        cornerCount[row + 1][col + 1]--;
        cornerCount[row + 1][col]--;
        vertBoxes[col]++;
        break;
      case NodeType.square:
        cornerCount[row][col]--;
        cornerCount[row][col + 1]--;
        cornerCount[row + 1][col + 1]--;
        cornerCount[row + 1][col]--;
        colSquares[col]++;
        rowSquares[row]++;
        break;
      default:
        break;
    }
    newBoard[row][col] = NodeType.empty;
    this.setState({
      board: newBoard,
    });
  };

  // starts solving from the top left of the board using a backtracking apprach.
  async solve(delay) {
    // sets solving to be true which disables user input
    this.setState({ solving: true });
    //resets the board, discarding any changes the user made to it.
    this.setBoard(this.state.currentBoard);
    await this.sleep(40);

    // start at position 0, 0 and add valid moves to the stack
    let moves = [];
    let position = { row: 0, col: 0 };
    moves = moves.concat(this.getValidMoves(position));
    let move;

    // as long as there are available moves continue.
    while (moves.length > 0) {
      // stop solving if the user has set solving to be false.
      if (this.state.stop) {
        this.setState({ stop: false, solving: false });
        return;
      }

      // pop the next move of the move stack.
      move = moves.pop();

      // if the move is supposed to be at the current position we can make that move
      if (move.row === position.row && move.col === position.col) {
        this.addPiece(move.row, move.col, move.type);
        // pause to make algorithm visual
        await this.sleep(delay);

        // if the board is valid after the move has been made, push the move back on
        // the stack, update the position to the next available one, check if we have reached the end of the
        // board which would tell us that we have found a solution and we break out. If we're not at the end,
        // get all valid moves at that position and push them to the move stack
        if (this.isValid()) {
          moves.push(move);
          position = this.nextPos(position);
          if (position.col >= this.state.board[0].length) {
            break;
          } else moves = moves.concat(this.getValidMoves(position));
        } else {
          // is the board is not valid after adding the piece, we remove it again.
          this.removePiece(move.row, move.col);
          await this.sleep(delay);
        }
      } else {
        // if the move position is not the current position, we know that we have tried all moves at our
        // current position so we undo the move from the stack and set our position to where that move was made.
        this.removePiece(move.row, move.col);
        await this.sleep(delay);
        position = { row: move.row, col: move.col };
      }
    }
    // after solving is finished we change the state to enable user input again
    this.setState({ solving: false });
  }

  // function that waits a set amount of milliseconds used for visualizing the algorithm
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // given a position on the board, checks the available pieces and if they would fit then returns a
  // list of all the available moves at that position as an object in the form
  // {row, col, pieceType}
  getValidMoves = (position) => {
    const { rowSquares, colSquares, vertBoxes, horzBoxes, board } = this.state;
    let moves = [];

    if (horzBoxes[position.row] > 0 && board[0].length > position.col + 1) {
      moves.push({
        row: position.row,
        col: position.col,
        type: NodeType.horizontalLeft,
      });
    }

    if (
      vertBoxes[position.col] > 0 &&
      board.length > position.row + 1 &&
      board[position.row + 1][position.col] === NodeType.empty
    ) {
      moves.push({
        row: position.row,
        col: position.col,
        type: NodeType.verticalTop,
      });
    }
    if (rowSquares[position.row] > 0 && colSquares[position.col] > 0) {
      moves.push({
        row: position.row,
        col: position.col,
        type: NodeType.square,
      });
    }
    return moves;
  };

  // given a position on the board, goes down the columns and then along the rows until it finds an empty
  // node or reaches the end and returns that position
  nextPos = (currentPos) => {
    const board = this.state.board;
    do {
      if (currentPos.row === board.length - 1) {
        currentPos.col++;
      }
      // currentPos.col += Math.floor(currentPos.row + 1 / board.length);
      currentPos.row = (currentPos.row + 1) % board.length;
      // console.log(currentPos);
    } while (
      currentPos.col < board[0].length &&
      board[currentPos.row][currentPos.col] !== NodeType.empty
    );
    return currentPos;
  };

  // checks if the board is correct
  // it's sufficient to check that we have exactly zero of each piece type available
  isCorrect = () => {
    const { rowSquares, colSquares, vertBoxes, horzBoxes } = this.state;
    for (let i = 0; i < rowSquares.length; i++) {
      if (rowSquares[i] !== 0) return false;
    }
    for (let i = 0; i < colSquares.length; i++) {
      if (colSquares[i] !== 0) return false;
    }
    for (let i = 0; i < vertBoxes.length; i++) {
      if (vertBoxes[i] !== 0) return false;
    }
    for (let i = 0; i < horzBoxes.length; i++) {
      if (horzBoxes[i] !== 0) return false;
    }
    return true;
  };

  // checks if there are 3 or more pieces at any corner in which case the board becomes invalid
  isValid = () => {
    const cornerCount = this.state.cornerCount;
    for (let row = 0; row < cornerCount.length; row++) {
      for (let col = 0; col < cornerCount[0].length; col++) {
        if (cornerCount[row][col] >= 3) {
          return false;
        }
      }
    }
    return true;
  };

  render() {
    const {
      board,
      rowSquares,
      colSquares,
      vertBoxes,
      horzBoxes,
      solving,
    } = this.state;
    let columns = [];
    if (this.state.colSquares) {
      for (let col = 0; col < colSquares.length; col++) {
        let column = [];
        for (let i = 0; i < vertBoxes[col]; i++) {
          column.push(<div className="tallBox" key={2 * i}></div>);
        }
        for (let i = 0; i < colSquares[col]; i++) {
          column.push(<div className="box" key={2 * i + 1}></div>);
        }
        columns.push(column);
      }
    }

    let rows = [];
    if (this.state.rowSquares) {
      for (let row = 0; row < rowSquares.length; row++) {
        let currnetRow = [];
        for (let i = 0; i < horzBoxes[row]; i++) {
          currnetRow.push(<div className="longBox" key={2 * i}></div>);
        }
        for (let i = 0; i < rowSquares[row]; i++) {
          currnetRow.push(<div className="box" key={2 * i + 1}></div>);
        }
        rows.push(currnetRow);
      }
    }
    let correctText = <h2 id="correct">Correct!</h2>;
    let invalidText = <h2 id="invalid">Invalid! too many corners touching</h2>;

    return (
      <div className="contents">
        <div className="Menu">
          <div className="control">
            <button
              onClick={() => {
                if (solving) {
                  this.setState({ stop: true });
                } else {
                  this.solve(20);
                }
              }}>
              {solving ? "Stop" : "Solve"}
            </button>
            <button
              disabled={solving}
              onClick={() => {
                this.setState(this.setBoard(this.state.currentBoard));
              }}>
              Reset Board
            </button>
          </div>
          <div className="board-select">
            Select board
            <button
              disabled={solving}
              onClick={() => this.setBoard(small_board)}>
              Small
            </button>
            <button
              disabled={solving}
              onClick={() => this.setBoard(medium_board)}>
              Medium
            </button>
            <button
              disabled={solving}
              onClick={() => this.setBoard(large_board)}>
              Large
            </button>
          </div>

          <div className="message">
            {solving
              ? ""
              : this.isCorrect()
              ? correctText
              : this.isValid()
              ? ""
              : invalidText}
          </div>
        </div>
        <div style={{ height: board.length * 2 * 50 + "px" }} className="Board">
          {board.map((row, rowIndex) => {
            return (
              <div className="Row" key={rowIndex}>
                {row.map((value, colIndex) => {
                  return (
                    <Node
                      handleMouseUp={this.handleMouseUp}
                      handleMouseDown={() => {
                        this.handleMouseDown(rowIndex, colIndex);
                      }}
                      handleMouseEnter={() => {
                        this.handleMouseEnter(rowIndex, colIndex);
                      }}
                      type={value}
                      key={colIndex}></Node>
                  );
                })}
                <div className="AvailableRow">{rows[rowIndex]}</div>
              </div>
            );
          })}
          <div className="verticalItems">
            {this.state.board[0].map((col, colIndex) => {
              return (
                <div className="AvailableCol" key={colIndex}>
                  {columns[colIndex]}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Instructions">
          <h1>Instructions</h1>
          <p>
            Tomoku is a puzzle game where the goal is to place all available
            pieces shown along the edges, into the grid. The pieces need to be
            placed into the grid in such a way that there are never 4 corners
            meeting at a single point
          </p>
          <img
            src="./images/invalid.png"
            alt="example of 4 corners touching"></img>
          <p>
            The above is an example of an invalid arrangement since there are 4
            corners touching at the point circled in red
          </p>
          <p>
            You can only place pieces onto the board at locations where there
            are pieces available. The available pieces are listed along the
            sides and are unique to that row/column. The below image shows the
            available pieces for the first row. As you can see, it must contain
            a single horizontal box and three square. The rest of the empty
            spaces will then need to be filled with vertical boxes since they
            are not displayed here. If i placed a horizontal box in row 1, I
            would not be able to place another one in that row since we see that
            there is only one available
          </p>
          <img src="./images/available.jpg" alt="first row"></img>
          <p>
            Horizontal and vertical boxes can be placed anywhere within their
            rows or columns respectively. However, squares are counted in both
            the row and the column, so in order to place a square at a given
            position, there must be one available in both the given row and the
            column.
          </p>
          <h3>Controls</h3>
          <p>
            To place a square, simply click on a valid position on the board.
            <br></br>To place a horizontal or vertical box, click where you want
            the box to start and drag onto the other point of the box while
            holding down the mouse. A box will only be placed if there is one
            available for that location.
          </p>
          <img
            height="100x"
            src="./images/horizontal.gif"
            alt="animation showing how to place box"></img>
          <p>To remove a box, simply click on it again.</p>
          <img
            height="100x"
            src="./images/remove.gif"
            alt="animation showing how to remove box"></img>
          <p>
            Different boards can be selected at the top. But be careful since
            progress on your current board will not be saved.<br></br>
            You can also press solve and the computer will start solving the
            board visually using backtracking.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
