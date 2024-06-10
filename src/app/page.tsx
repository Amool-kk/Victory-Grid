"use client"
import { use, useEffect, useState } from "react";
import Board, { winnerData } from "../../components/Board";
import { Queue } from "../../utils/queue";



export default function Home() {
  const [data, setData] = useState(new Array(9).fill(""));
  const [playerO, setPlayerO] = useState<Queue<number>>(new Queue<number>());
  const [playerX, setPlayerX] = useState<Queue<number>>(new Queue<number>());
  const [lock, setLock] = useState(false);
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState("X");
  const [name, setname] = useState<number>();
  const [winner, setWinnerData] = useState<winnerData>();

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
    }
    checkWin()
  }

  useEffect(() => {
    const length = playerO.size() + playerX.size();

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
    setWinnerData(undefined);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {lock ? <div className="header">
        Player <span className={`player${winner?.player}`} >{winner?.player}</span> Won
      </div> : <div className="header">
        Player <span className={`player${turn}`} >{turn}</span> Turn
      </div>}
      {lock && <button className="reset" onClick={reset} >Reset</button>}
      <Board data={data} name={name} toggle={toggle} winnerData={winner} key={"board"} />
    </main>
  );
}
