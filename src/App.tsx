import { useState } from 'react';
import './App.css';
import bgimage from '../public/board.jpg';

function App() {
  //falseが先手でtrueが後手
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

  //タスク
  //ターン制（true, false)
  const handleClick = (i: number, j: number) => {
    //console.log(i, j);
    //もしfalse(自分ターン)なら、黒設置
    // const [fruits, setFruits] = useState(['りんご', 'バナナ', 'いちご'])

    // const updateFruits = () => {
    //     setFruits(
    //         fruits.map((fruit, index) => (index === 2 ? 'ドリアン' : fruit))
    //     )
    // }

    if (turn && board[i][j] == '0') {
      //console.log(i, ':', j);
      // setBoard((prevBoard) => [...prevBoard, [(prevBoard[i][j] = '3')]]);
      // setBoard([...board, [(prevBoard[i][j] = '3')]]);
      // setBoard([...prevBoard, prevBoard])
      // setBoard(board[i][j] = "3")
      // setBoard(prevBoard);
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
      //もしtrue(相手ターン)なら、白設置
      // prevBoard[i][j] == '2';
      //console.log(i, ':', j);
      // setBoard([...board, [(prevBoard[i][j] = '2')]]); //スプレッド構文内の構文について、カッコが何個あればいいのかわからない8/20
      // setBoard((prevBoard) => [...prevBoard, [(prevBoard[i][j] = '2')]]);
      // setBoard(prevBoard);
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
  //
  return (
    <>
      <div className='boardindex'>
        {board.map((item: any, i: number) => {
          return (
            <div className='boardstyle'>
              {item.map((items: any, j: number) => {
                return (
                  <button
                    className={
                      'boardstyles' +
                      (color == 'white' ? 'whitestyles' : 'blackstyles')
                    }
                    onClick={() => handleClick(i, j)}
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
