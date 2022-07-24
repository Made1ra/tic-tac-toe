import React from 'react';

type SquareProps = {
    winningSquare: boolean,
    value: number,
    onClick: React.MouseEventHandler<HTMLButtonElement>
};

function Square(props: SquareProps) {
    return (
        <button
            className="square"
            onClick={props.onClick}
            style={props.winningSquare ? { backgroundColor: "#ccc" } : {}}
        >
            {props.value}
        </button>
    );
}

export default Square;
