import { useState } from 'react';
import './App.css';
import bgimage from '../public/board.jpg';
import { v4 as uuidv4 } from 'uuid';

function App() {
  //falseが先手でtrueが後手
  const id = uuidv4();
  const [turn, setTurn] = useState<boolean>(false);
  //6かけ6の盤面をとりあえず作る。
  //0は何もない、1は設置完了,2は白、3は黒
  const [color, setColor] = useState<string>('');
  const [board, setBoard] = useState<string[][]>([
    ['0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0'],
  ]);
  //const prevBoard = [...board];
  //2ならホワイト、3ならブラック　完了
  //タスク
  //ターン制（true, false)
  const handleClick = (i: number, j: number) => {
    //黒
    if (turn && board[i][j] == '0') {
      setBoard((prevBoard) =>
        prevBoard.map((item: any, inner: number) =>
          item.map((items: any, outer: number) =>
            inner === i && outer === j ? '3' : items
          )
        )
      );
      setTurn(!turn);
      setColor('white');
    } else if (!turn && board[i][j] == '0') {
      //白
      setBoard((prevBoard) =>
        prevBoard.map((item: any, inner: number) =>
          item.map((items: any, outer: number) =>
            inner === i && outer === j ? '2' : items
          )
        )
      );
      setTurn(!turn);
      setColor('black');
    }
  };
  //盤面の評価、1は選択可能、2は白、3は黒
  //まぁとりあえず、
  //異なる色に挟まれたら反転する

  return (
    <>
      <div className='boardindex'>
        {/* おそらく親のidの中の子のidという形で識別をしてくれているのでは */}
        {board.map((item: any, i: number) => {
          return (
            <div className='boardstyle' key={i}>
              {item.map((items: any, j: number) => {
                return (
                  //2のボードだけ白、３のボードだけ黒
                  <button
                    onClick={() => handleClick(i, j)}
                    key={j}
                    className={(() => {
                      if (board[i][j] == '2') {
                        return 'whitestyles';
                      } else if (board[i][j] == '3') {
                        return 'blackstyles';
                      } else {
                        return 'boardstyles';
                      }
                    })()}
                  >
                    {board[i][j]}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
