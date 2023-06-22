import React from 'react';

function Cell({ x, y, size, fill, onClick, children }) {
    const half = size / 2;
    const padding = size / 10;
    const quarter = size / 4;

    return (
        <svg x={x} y={y} width={size} height={size} onClick={onClick}>
            <rect width={size} height={size} fill={fill} />
            {children === 'X' && (
                <>
                    <line x1={padding} y1={padding} x2={size - padding} y2={size - padding} stroke="black" />
                    <line x1={padding} y1={size - padding} x2={size - padding} y2={padding} stroke="black" />
                </>
            )}
            {children === 'O' && (
                <circle cx={half} cy={half} r={quarter} stroke="black" fill="none" />
            )}
        </svg>
    );
}

export default Cell;
