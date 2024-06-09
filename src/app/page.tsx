"use client"
import { use, useEffect, useState } from "react";

class Queue<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  // Add element to the back of the queue
  enqueue(element: T): void {
    this.items.push(element);
  }

  // Remove and return the front element of the queue
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  // Return the front element of the queue without removing it
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the queue
  size(): number {
    return this.items.length;
  }
}


interface winnerData {
  player: string,
  data: number[]
}

export default function Home() {
  const [data, setData] = useState(new Array(9).fill(""));
  const [playerO, setPlayerO] = useState<Queue<number>>(new Queue<number>());
  const [playerX, setPlayerX] = useState<Queue<number>>(new Queue<number>());
  const [lock, setLock] = useState(false);
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState("X");
  const [name, setname] = useState<number>();
  const [winner, setWinnerData] = useState<winnerData | null>();

  const toggle = (e: any, index: number) => {
    if (lock) {
      return 0;
    }
    const length = playerO.size() + playerX.size();
    if (count % 2 == 0 && data[index] == "") {
      // e.target.innerHTML = "X";
      setTurn("O");
      data[index] = "X";
      setData(data);
      setPlayerX(prevQueue => {
        const newQueue = new Queue<number>();
        prevQueue.items.forEach(item => newQueue.enqueue(item));
        newQueue.enqueue(index);
        return newQueue;
      });
      setCount(count + 1);
      if (length > 5 && playerX.front() != undefined) {
        // @ts-ignore
        data[playerX.front()] = "";
        setData(data)
        playerX.dequeue()
      }
    } else if (count % 2 == 1 && data[index] == "") {
      data[index] = "O";
      setTurn("X");
      setPlayerO(prevQueue => {
        const newQueue = new Queue<number>();
        prevQueue.items.forEach(item => newQueue.enqueue(item));
        newQueue.enqueue(index);
        return newQueue;
      });
      setCount(count + 1);
      if (length > 5 && playerO.front() != undefined) {
        // @ts-ignore
        data[playerO.front()] = "";
        setData(data)
        playerO.dequeue()
      }
      // if (length === 5) {
      //   setname(playerX.front())
      // }
    }
    // console.log(data, playerO.front(), playerX.front(), length, index)
    checkWin()
  }

  useEffect(() => {
    const length = playerO.size() + playerX.size();
    console.log("length ", length, "playerO ", playerO.front(), "playerX ", playerX.front(), "which player turn", count % 2, data);

    if (!lock) {
      if (count % 2 == 0 && length === 6) {
        setname(playerX.front());
      }
      if (count % 2 != 0 && length === 6) {
        setname(playerO.front());
      }
    } else {
      setname(undefined)
    }
  }, [playerO, playerX, lock])

  const checkWin = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ]

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (data[a] == data[b] && data[b] == data[c] && data[c] !== "") {
        won(data[c], combo);
      }
    }
  }


  const won = (winner: string, data: number[]) => {
    setLock(true);
    setWinnerData({ player: winner, data })
  }

  const reset = () => {
    console.log(name)
    setData(new Array(9).fill(""));
    setLock(false);
    setname(undefined);
    setPlayerO(new Queue<number>());
    setPlayerX(new Queue<number>());
    setTurn("X");
    setCount(0);
    setWinnerData(null);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {lock ? <div className="header">
        Player <span className={`player${winner?.player}`} >{winner?.player}</span> Won
      </div> : <div className="header">
        Player <span className={`player${turn}`} >{turn}</span> Turn
      </div>}
      {lock && <button className="reset" onClick={reset} >Reset</button>}
      <div className="board">
        <div className="col">
          <div className={`boxes ${winner?.data.includes(0) && "winner"}  ${name === 0 && "opacity"} ${data[0] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 0) }}>{data[0]}</div>
          <div className={`boxes ${winner?.data.includes(1) && "winner"}  ${name === 1 && "opacity"} ${data[1] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 1) }}>{data[1]}</div>
          <div className={`boxes ${winner?.data.includes(2) && "winner"}  ${name === 2 && "opacity"} ${data[2] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 2) }}>{data[2]}</div>
        </div>
        <div className="col">
          <div className={`boxes ${winner?.data.includes(3) && "winner"}  ${name === 3 && "opacity"} ${data[3] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 3) }}>{data[3]}</div>
          <div className={`boxes ${winner?.data.includes(4) && "winner"}  ${name === 4 && "opacity"} ${data[4] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 4) }}>{data[4]}</div>
          <div className={`boxes ${winner?.data.includes(5) && "winner"}  ${name === 5 && "opacity"} ${data[5] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 5) }}>{data[5]}</div>
        </div>
        <div className="col">
          <div className={`boxes ${winner?.data.includes(6) && "winner"}  ${name === 6 && "opacity"} ${data[6] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 6) }}>{data[6]}</div>
          <div className={`boxes ${winner?.data.includes(7) && "winner"}  ${name === 7 && "opacity"} ${data[7] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 7) }}>{data[7]}</div>
          <div className={`boxes ${winner?.data.includes(8) && "winner"}  ${name === 8 && "opacity"} ${data[8] == "X" ? "playerX" : "playerO"}`} onClick={(e) => { toggle(e, 8) }}>{data[8]}</div>
        </div>
      </div>
    </main>
  );
}
