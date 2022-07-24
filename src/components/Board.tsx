import React from 'react';
import Square from './Square';

function Board(props: any) {
    function renderSquare(i: number) {
        const winningSquare = props.winner && props.winner.includes(i) ? true : false;

        return (
            <Square
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                winningSquare={winningSquare}
            />
        );
    }

    const squares = [];
    for (let row = 0; row < 3; row++) {
        const rows = [];
        for (let column = 0; column < 3; column++) {
            rows.push(<span key={(row * 3) + column}>{renderSquare((row * 3) + column)}</span>)
        }

        squares.push(<div className="board-row" key={row}>{rows}</div>);
    }

    return (
        <div>
            {squares}
        </div>
    );
}

export default Board;
