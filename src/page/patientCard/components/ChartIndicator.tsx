interface Props {
    isActive: boolean
}

function ChartIndicator({ isActive }: Props) {
    return (
        <div
            style={{
                width: "25px",
                height: "25px",
                margin: "0 5px",
                backgroundColor: isActive ? '#228B22' : 'white'
            }}
            className="border border-dark rounded-1">
        </div>
    );
}

export default ChartIndicator;