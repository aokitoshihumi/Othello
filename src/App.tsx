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
          }
          if (
            board[inner - 1][outer] === '0' &&
            board[inner - 1][outer] !== undefined
          ) {
            //上
            prevBoard[inner - 1][outer] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner - 1][outer + 1] === '0' &&
            board[inner - 1][outer + 1] !== undefined
          ) {
            //右上
            prevBoard[inner - 1][outer + 1] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner][outer - 1] === '0' &&
            board[inner][outer - 1] !== undefined
          ) {
            //左
            prevBoard[inner][outer - 1] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner][outer + 1] === '0' &&
            board[inner][outer + 1] !== undefined
          ) {
            //右
            prevBoard[inner][outer + 1] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner + 1][outer - 1] === '0' &&
            board[inner + 1][outer - 1] !== undefined
          ) {
            //左下
            prevBoard[inner + 1][outer - 1] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner + 1][outer] === '0' &&
            board[inner + 1][outer] !== undefined
          ) {
            //下
            prevBoard[inner + 1][outer] = '1';
            setBoard(prevBoard);
          }
          if (
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

  //black, Whiteの関数内に、挟むための駒が存在するかを判定させる。
  //黒のコマを置く場合、黒のコマが発生する前に白があればいい
  //クリックしたときに反転させるプログラム
  const BlackAllowReverse = (i: number, j: number) => {
    //黒の場合 Horizontal
    //console.log('iは', i);
    //[0,0,1,3,3,2,3,0,0]
    //[0,0,1,3,3,2,3,0,0]
    //左から右
    console.log(i, j);
    //3を2にする
    for (let outer = 0; board[i][outer] !== null; outer++) {
      if (
        board[i][j + outer] == '2' ||
        board[i][j + outer] == '0' ||
        board[i][j + outer] == undefined
      ) {
        break;
      } else if (
        board[i][j + outer] == '3' &&
        board[i][j + outer] !== undefined
      ) {
        //for (let k = j; k < j + outer; k++) {
        prevBoard[i][j + outer] == '2';
        setBoard(prevBoard);
        //}
      }
    }
    //[      ⚪︎]
    //[3,2,3,2,3,3,1,0,0]

    //右から左
    for (let outer = 0; board[i][outer] !== null; outer++) {
      if (
        board[i][j - outer] == '2' ||
        board[i][j - outer] == '0' ||
        board[i][j - outer] == undefined
      ) {
        break;
      } else if (
        board[i][j - outer] == '3' &&
        board[i][j - outer] !== undefined
      ) {
        //for (let k = j; k < j + outer; k++) {
        prevBoard[i][j - outer] == '2';
        setBoard(prevBoard);
        //}
      }
    }
    /*[ i= 1 j =1
        i= 2 j = 2
        i= 3 j = 3
        i= 4 j = 4
       0,0,0,0,0
       0,1,0,0,0
       0,0,2,0,0
       0,0,0,2,0
       0,0,0,0,3
    ] */
    //左上から右下
    for (let outer = 0; board[i + outer][j + outer] !== null; outer++) {
      if (
        board[i + outer][j + outer] == '3' ||
        board[i + outer][j + outer] == '0' ||
        board[i + outer][j + outer] == undefined
      ) {
        break;
      } else if (
        board[i + outer][j + outer] == '2' &&
        board[i + outer][j + outer] !== undefined
      ) {
        //for (let k = j; k < j + outer; k++) {
        prevBoard[i + outer][j + outer] == '2';
        setBoard(prevBoard);
        //}
      }
    }
    //右下から左上
    for (let outer = 0; board[i - outer][j - outer] !== null; outer++) {
      if (
        board[i - outer][j - outer] == '3' ||
        board[i - outer][j - outer] == '0' ||
        board[i - outer][j - outer] == undefined
      ) {
        break;
      } else if (
        board[i - outer][j - outer] == '2' &&
        board[i - outer][j - outer] !== undefined
      ) {
        //for (let k = j; k < j + outer; k++) {
        prevBoard[i - outer][j - outer] == '2';
        setBoard(prevBoard);
        //}
      }
    }
    /*[ i= 3 j = 1
        i= 2 j = 2
        i= 1 j = 3
        i= 0 j = 4
       0,0,0,0,3
       0,0,0,2,0
       0,0,2,0,0
       0,1,0,0,0
       0,0,0,0,0
    ] */
    //左下から右上
    for (let outer = 0; board[i - outer][j + outer] !== null; outer++) {
      if (
        board[i - outer][j + outer] == '3' ||
        board[i - outer][j + outer] == '0' ||
        board[i - outer][j + outer] == undefined
      ) {
        break;
      } else if (
        board[i - outer][j + outer] == '2' &&
        board[i - outer][j + outer] !== undefined
      ) {
        //for (let k = j; k < j + outer; k++) {
        prevBoard[i - outer][j + outer] == '2';
        setBoard(prevBoard);
        //}
      }
    }
    /*[ i= 3 j = 1
        i= 2 j = 2
        i= 1 j = 3
        i= 0 j = 4
       0,0,0,0,3
       0,0,0,2,0
       0,0,2,0,0
       0,1,0,0,0
       0,0,0,0,0
    ] */
    //右上から左下
    for (let outer = 0; board[i + outer][j - outer] !== null; outer++) {
      if (
        board[i + outer][j - outer] == '3' ||
        board[i + outer][j - outer] == '0' ||
        board[i + outer][j - outer] == undefined
      ) {
        break;
      } else if (
        board[i + outer][j - outer] == '2' &&
        board[i + outer][j - outer] !== undefined
      ) {
        //for (let k = j; k < j + outer; k++) {
        prevBoard[i + outer][j - outer] == '2';
        setBoard(prevBoard);
        //}
      }
    }
    // for (let outer = 0; outer < 8; outer++) {
    //   if (board[i][outer] == '2') {
    //     for(let inner=0; )
    //   }
    // }
    // for (let inner = 0; inner < 8; inner++) {
    //   for (let outer = 0; outer < 8; outer++) {
    //     //左から右
    //     //board[1][0]
    //     if(board[inner][outer] == '1'){
    //       for(let i = 0; i < 8; i ++){
    //         if(board[inner][i] == '3'){
    //           //board[1][3]
    //           for(let j = outer; j < i; j++){
    //             prevBoard[inner][j] = '2';
    //             setBoard(prevBoard);
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
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
          }
          if (
            board[inner - 1][outer] === '0' &&
            board[inner - 1][outer] !== undefined
          ) {
            //上
            prevBoard[inner - 1][outer] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner - 1][outer + 1] === '0' &&
            board[inner - 1][outer + 1] !== undefined
          ) {
            //右上
            prevBoard[inner - 1][outer + 1] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner][outer - 1] === '0' &&
            board[inner][outer - 1] !== undefined
          ) {
            //左
            prevBoard[inner][outer - 1] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner][outer + 1] === '0' &&
            board[inner][outer + 1] !== undefined
          ) {
            //右
            prevBoard[inner][outer + 1] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner + 1][outer - 1] === '0' &&
            board[inner + 1][outer - 1] !== undefined
          ) {
            //左下
            prevBoard[inner + 1][outer - 1] = '1';
            setBoard(prevBoard);
          }
          if (
            board[inner + 1][outer] === '0' &&
            board[inner + 1][outer] !== undefined
          ) {
            //下
            prevBoard[inner + 1][outer] = '1';
            setBoard(prevBoard);
          }
          if (
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
            BlackAllowReverse(i, j);
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
