import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
    return (
      <button
        className="square"
        onClick={ () => props.onClick() }>

        {props.value}
      </button>
    );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      replay: false,
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const history = this.state.history;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([squares]),
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  handleReplay(i) {
    const squares = this.state.history[i];
    this.setState({
      squares: squares,
      replay: true,
    })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={ () => this.handleClick(i) }
      />
    );
  }

  isClickable() { return this.state.squares.includes(null) }
  notReplay() { return !this.state.replay }

  render() {
    const winner = calculateWinner(this.state.squares);
    const canClick = this.isClickable() && this.notReplay();
    let status;
    if (winner) {
      status = 'Winner ' + winner;
    } else if (canClick) {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else {
      status = 'Game over!'
    }

    return (
      <div>
        <p>Board: {this.props.name} </p>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <ol>
          {
            this.state.history.map((el, i) => {
              return (
                <li key={i}>
                  <button onClick={(event) => { this.handleReplay(i) }}>
                    { 'step ' + i + ' => ' + el }
                  </button>
                </li>
              )
            })
          }
        </ol>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board-1"> <Board name="Board 1" /> </div>
        <hr />
        <div className="game-board-2"> <Board name="Board 2" /> </div>
      </div>
    );
  }
}

const calculateWinner = (squares) => {
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
