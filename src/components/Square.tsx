import React from 'react';

function Square(props: any) {
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
