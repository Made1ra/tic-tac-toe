export default function Square({
    winningSquare,
    value,
    onSquareClick
}: {
    winningSquare: boolean | null;
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
}) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
            style={winningSquare ? { backgroundColor: '#ccc' } : {}}
        >
            {value}
        </button>
    );
}
