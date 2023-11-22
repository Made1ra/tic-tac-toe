export default function Square({
    value,
    onSquareClick
}: {
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
}) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}
