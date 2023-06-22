import React from 'react';

function Board({ size, onClick, className, children}) {
    return (
        <svg width={size} height={size} onClick={onClick} className={className}>
            {children}
        </svg>
    );
}

export default Board;
