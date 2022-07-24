import React from 'react';
import Board from './components/Board';

function calculateWinner(squares: number[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winningSquare: lines[i],
            }
        }
    }

    return null;
}

type MyState = {
    history:
    {
        squares: any,
        clickedSquare: number[]
    }[],
    stepNumber: number,
    xIsNext: boolean,
    ascending: boolean
};

class App extends React.Component<{}, MyState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    clickedSquare: [0, 0],
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            ascending: true,
        };
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    clickedSquare: [Math.floor((i % 3) + 1), Math.floor((i / 3) + 1)],
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    sortMoves() {
        this.setState({
            ascending: !this.state.ascending,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const ascending = this.state.ascending;

        const moves = history.map((step: { clickedSquare: any; }, move: number) => {
            const clickedSquare = step.clickedSquare;
            const desc = move ?
                `Go to move #${move} (${clickedSquare[0]}, ${clickedSquare[1]})` :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        style={this.state.stepNumber === move ? { fontWeight: "bold" } : {}}
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        let status: string;
        if (winner) {
            status = 'Winner: ' + winner.winner;
        } else if (this.state.stepNumber === 9 && !winner) {
            status = 'Draw';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i: number) => this.handleClick(i)}
                        winner={winner && winner.winningSquare}
                    />
                    <br />
                    <button onClick={() => this.sortMoves()}>Toggle the sort order</button>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{ascending ? moves : moves.reverse()}</ol>
                </div>
            </div>
        );
    }
}

export default App;
