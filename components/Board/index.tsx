import React from "react";

export interface winnerData {
    player: string,
    data: number[]
}

interface BoardProps {
    winnerData?: winnerData;
    name: any;
    data: any;
    toggle: any;
    key?: string
}

const Board = ({ data, winnerData, name, toggle, key }: BoardProps) => {
    return (
        <div className="board" key={key}>
            <div className="col">
                <div className={`boxes ${winnerData?.data.includes(0) && "winner"}  ${name === 0 && "opacity"} ${data[0] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 0) }}>{data[0]}</div>
                <div className={`boxes ${winnerData?.data.includes(1) && "winner"}  ${name === 1 && "opacity"} ${data[1] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 1) }}>{data[1]}</div>
                <div className={`boxes ${winnerData?.data.includes(2) && "winner"}  ${name === 2 && "opacity"} ${data[2] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 2) }}>{data[2]}</div>
            </div>
            <div className="col">
                <div className={`boxes ${winnerData?.data.includes(3) && "winner"}  ${name === 3 && "opacity"} ${data[3] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 3) }}>{data[3]}</div>
                <div className={`boxes ${winnerData?.data.includes(4) && "winner"}  ${name === 4 && "opacity"} ${data[4] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 4) }}>{data[4]}</div>
                <div className={`boxes ${winnerData?.data.includes(5) && "winner"}  ${name === 5 && "opacity"} ${data[5] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 5) }}>{data[5]}</div>
            </div>
            <div className="col">
                <div className={`boxes ${winnerData?.data.includes(6) && "winner"}  ${name === 6 && "opacity"} ${data[6] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 6) }}>{data[6]}</div>
                <div className={`boxes ${winnerData?.data.includes(7) && "winner"}  ${name === 7 && "opacity"} ${data[7] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 7) }}>{data[7]}</div>
                <div className={`boxes ${winnerData?.data.includes(8) && "winner"}  ${name === 8 && "opacity"} ${data[8] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 8) }}>{data[8]}</div>
            </div>
        </div>
    )
}

export default Board;