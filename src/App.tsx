import { useState } from 'react';
import './App.css';
import bgimage from '../public/board.jpg';
import { v4 as uuidv4 } from 'uuid';

function App() {
  //falseが先手でtrueが後手
  const [turn, setTurn] = useState<boolean>(false);
  //6かけ6の盤面をとりあえず作る。
  //0は何もない、1は設置完了,2は白、3は黒
  const [color, setColor] = useState<string>('');
  const [board, setBoard] = useState<string[][]>([
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '1', '0', '0', '0'],
    ['0', '0', '0', '2', '3', '1', '0', '0'],
    ['0', '0', '1', '3', '2', '0', '0', '0'],
    ['0', '0', '0', '1', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
  ]);
  const prevBoard = [...board];

  const WhiteCheckBoard = () => {
    //白の時のチェック
    for (let inner = 0; inner < 8; inner++) {
      for (let outer = 0; outer < 8; outer++) {
        //inner = 0 outer = 1
        //画面外の時は参照しない
        if (board[inner][outer] == '3') {
          if (
            board[inner - 1][outer - 1] === '0' &&
            board[inner - 1][outer - 1] !== undefined
          ) {
            //左上
            prevBoard[inner - 1][outer - 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner - 1][outer] === '0' &&
            board[inner - 1][outer] !== undefined
          ) {
            //上
            prevBoard[inner - 1][outer] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner - 1][outer + 1] === '0' &&
            board[inner - 1][outer + 1] !== undefined
          ) {
            //右上
            prevBoard[inner - 1][outer + 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner][outer - 1] === '0' &&
            board[inner][outer - 1] !== undefined
          ) {
            //左
            prevBoard[inner][outer - 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner][outer + 1] === '0' &&
            board[inner][outer + 1] !== undefined
          ) {
            //右
            prevBoard[inner][outer + 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner + 1][outer - 1] === '0' &&
            board[inner + 1][outer - 1] !== undefined
          ) {
            //左下
            prevBoard[inner + 1][outer - 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner + 1][outer] === '0' &&
            board[inner + 1][outer] !== undefined
          ) {
            //下
            prevBoard[inner + 1][outer] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner + 1][outer + 1] === '0' &&
            board[inner + 1][outer + 1] !== undefined
          ) {
            //右下
            prevBoard[inner + 1][outer + 1] = '1';
            setBoard(prevBoard);
          }
        }
      }
    }
  };

  const BlackCheckBoard = () => {
    for (let inner = 0; inner < 8; inner++) {
      for (let outer = 0; outer < 8; outer++) {
        if (board[inner][outer] == '2') {
          if (
            board[inner - 1][outer - 1] === '0' &&
            board[inner - 1][outer - 1] !== undefined
          ) {
            //左上
            prevBoard[inner - 1][outer - 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner - 1][outer] === '0' &&
            board[inner - 1][outer] !== undefined
          ) {
            //上
            prevBoard[inner - 1][outer] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner - 1][outer + 1] === '0' &&
            board[inner - 1][outer + 1] !== undefined
          ) {
            //右上
            prevBoard[inner - 1][outer + 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner][outer - 1] === '0' &&
            board[inner][outer - 1] !== undefined
          ) {
            //左
            prevBoard[inner][outer - 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner][outer + 1] === '0' &&
            board[inner][outer + 1] !== undefined
          ) {
            //右
            prevBoard[inner][outer + 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner + 1][outer - 1] === '0' &&
            board[inner + 1][outer - 1] !== undefined
          ) {
            //左下
            prevBoard[inner + 1][outer - 1] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner + 1][outer] === '0' &&
            board[inner + 1][outer] !== undefined
          ) {
            //下
            prevBoard[inner + 1][outer] = '1';
            setBoard(prevBoard);
          } else if (
            board[inner + 1][outer + 1] === '0' &&
            board[inner + 1][outer + 1] !== undefined
          ) {
            //右下
            prevBoard[inner + 1][outer + 1] = '1';
            setBoard(prevBoard);
          }
        }
      }
    }
  };

  const handleClick = (i: number, j: number) => {
    //白編
    if (!turn && board[i][j] == '1') {
      for (let inner = 0; inner < 8; inner++) {
        for (let outer = 0; outer < 8; outer++) {
          if (inner == i && outer == j) {
            prevBoard[inner][outer] = '2';
            setBoard(prevBoard);
          }
        }
      }
      for (let inner = 0; inner < 8; inner++) {
        for (let outer = 0; outer < 8; outer++) {
          if (board[inner][outer] == '1') {
            prevBoard[inner][outer] = '0';
            setBoard(prevBoard);
          }
        }
      }
      setTurn(!turn);
      //ここにcheckHorizontalで1を出現させたい。
      BlackCheckBoard();
    } else if (turn && board[i][j] == '1') {
      //黒編
      for (let inner = 0; inner < 8; inner++) {
        for (let outer = 0; outer < 8; outer++) {
          if (inner == i && outer == j) {
            prevBoard[inner][outer] = '3';
            setBoard(prevBoard);
          }
        }
      }
      for (let inner = 0; inner < 8; inner++) {
        for (let outer = 0; outer < 8; outer++) {
          if (board[inner][outer] == '1') {
            const prevBoard = [...board];
            prevBoard[inner][outer] = '0';
            setBoard(prevBoard);
          }
        }
      }
      setTurn(!turn);
      //ここにcheckHorizontalで１を出現させたい。
      WhiteCheckBoard();
    }
  };
  console.log(board);

  return (
    <>
      <div className='mt-10' />
      <h1>現在は</h1>
      {turn ? <p>黒です。</p> : <p>白です。</p>}
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
                      } else if (board[i][j] == '1') {
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
