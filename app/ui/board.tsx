import { calculateWinner } from '@/app/lib/utils';
import Square from '@/app/ui/square';

export default function Board({
    xIsNext,
    squares,
    onPlay
}: {
    xIsNext: boolean;
    squares: Array<'X' | 'O' | null>;
    onPlay: (squares: Array<'X' | 'O' | null>) => void;
}) {
    function handleClick(i: number, winner: 'X' | 'O' | null) {
        if (squares[i] || winner) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }

        onPlay(nextSquares);
    }

    const { winner, winningSquares } = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (squares.every((square) => square !== null)) {
        status = 'Draw';
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <>
            <div className="status">{status}</div>
            {[0, 1, 2].map((row) => (
                <div className="board-row" key={row}>
                    {[0, 1, 2].map((col) => (
                        <Square
                            key={row * 3 + col}
                            winningSquare={winningSquares ? winningSquares.includes(row * 3 + col) : false}
                            value={squares[row * 3 + col]}
                            onSquareClick={() => handleClick(row * 3 + col, winner)}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}
