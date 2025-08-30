import { memo, useEffect, useState } from 'react';
import './App.css';
import bgimage from '../public/board.jpg';
import { v4 as uuidv4 } from 'uuid';

function App() {
  //falseが先手でtrueが後手
  // const [toggle, setToggle] = useState<boolean>(true);

  const [turn, setTurn] = useState<boolean>(false);
  //6かけ6の盤面をとりあえず作る。
  //0は何もない、1は設置完了,2は白、3は黒
  const [color, setColor] = useState<string>('');
  const [board, setBoard] = useState<string[][]>([
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '2', '3', '0', '0', '0'],
    ['0', '0', '0', '3', '2', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
  ]);
  const prevBoard = [...board];
  let count: number = 0;
  //black, Whiteの関数内に、挟むための駒が存在するかを判定させる。
  //黒のコマを置く場合、黒のコマが発生する前に白があればいい
  //クリックしたときに反転させるプログラム
  const BlackLeftRight = () => {};
  // const BlackAllowReverse = (i: number, j: number) => {
  //   const saveBoard = [...board];
  //   if (board[i][j + 1] == '3') {
  //     for (let outer = 0; board[i][j + outer + 1] !== '2'; outer++) {
  //       if (
  //         //i = 0, j = 2 + 0 + 1
  //         board[i][j + outer] == '0' ||
  //         board[i][j + outer] == undefined
  //       ) {
  //         setBoard(saveBoard);
  //         break;
  //       } else if (
  //         board[i][j + outer + 1] === '3' &&
  //         board[i][j + outer] !== undefined
  //       ) {
  //         prevBoard[i][j + outer + 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackFirst:', board, 'number', j + outer + 1);
  //       }
  //     }
  //   }
  //   //i = 0, j = 5,
  //   //[0,3,2,2,2,1,2,0]右から左
  //   if (board[i][j - 1] == '3') {
  //     for (let outer = 0; board[i][j - outer - 1] !== '2'; outer++) {
  //       const saveBoard = [...board];
  //       if (board[i][j - outer] == '0' || board[i][j - outer] == undefined) {
  //         setBoard(saveBoard);
  //         break;
  //       } else if (
  //         board[i][j - outer - 1] == '3' &&
  //         board[i][j - outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i][j - outer - 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackSecond', board);
  //         //}
  //       }
  //     }
  //   }
  //   /*[ i= 1 j =1
  //       i= 2 j = 2
  //       i= 3 j = 3
  //       i= 4 j = 4
  //      0,0,0,0,0
  //      0,1,0,0,0
  //      0,0,2,0,0
  //      0,0,0,2,0
  //      0,0,0,0,3
  //   ] */
  //   //左上から右下
  //   if (board[i + 1][j + 1] == '3') {
  //     const memoryBoard = [...prevBoard];
  //     console.log('memoryBoard', memoryBoard);
  //     console.log('konn');
  //     for (
  //       let outer = 0;
  //       board[i + outer + 1][j + outer + 1] !== '2';
  //       outer++
  //     ) {
  //       // i = 3, j = 2 outer = 0,
  //       // board[4][3]
  //       if (
  //         board[i + outer][j + outer + 1] == '0' ||
  //         board[i + outer][j + outer + 1] == undefined
  //       ) {
  //         setBoard(memoryBoard);
  //         console.log('board', board);
  //         break;
  //       } else if (
  //         board[i + outer + 1][j + outer + 1] == '3' &&
  //         board[i + outer][j + outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i + outer + 1][j + outer + 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackThird', board);
  //         //}
  //       }
  //     }
  //   }
  //   //右下から左上
  //   if (board[i - 1][j - 1] == '3') {
  //     for (
  //       let outer = 0;
  //       board[i - outer - 1][j - outer - 1] !== '2';
  //       outer++
  //     ) {
  //       if (
  //         board[i - outer][j - outer] == '0' ||
  //         board[i - outer][j - outer] == undefined
  //       ) {
  //         setBoard(saveBoard);
  //         break;
  //       } else if (
  //         board[i - outer - 1][j - outer - 1] == '3' &&
  //         board[i - outer][j - outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i - outer - 1][j - outer - 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackFourth', board);

  //         //}
  //       }
  //     }
  //   }
  //   /*[ i= 3 j = 1
  //       i= 2 j = 2
  //       i= 1 j = 3
  //       i= 0 j = 4
  //      0,0,0,0,3
  //      0,0,0,2,0
  //      0,0,2,0,0
  //      0,1,0,0,0
  //      0,0,0,0,0
  //   ] */
  //   //左下から右上
  //   if (board[i - 1][j + 1] == '3') {
  //     for (
  //       let outer = 0;
  //       board[i - outer - 1][j + outer + 1] !== '2';
  //       outer++
  //     ) {
  //       if (
  //         board[i - outer][j + outer] == '0' ||
  //         board[i - outer][j + outer] == undefined
  //       ) {
  //         setBoard(saveBoard);
  //         break;
  //       } else if (
  //         board[i - outer - 1][j + outer + 1] == '3' &&
  //         board[i - outer][j + outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i - outer - 1][j + outer + 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackFifth', board);

  //         //}
  //       }
  //     }
  //   }
  //   /*[ i= 3 j = 1
  //       i= 2 j = 2
  //       i= 1 j = 3
  //       i= 0 j = 4
  //      0,0,0,0,3
  //      0,0,0,2,0
  //      0,0,2,0,0
  //      0,1,0,0,0
  //      0,0,0,0,0
  //   ] */
  //   //右上から左下
  //   if (board[i + 1][j - 1] == '3') {
  //     for (
  //       let outer = 0;
  //       board[i + outer + 1][j - outer - 1] !== '2';
  //       outer++
  //     ) {
  //       if (
  //         board[i + outer][j - outer] == '0' ||
  //         board[i + outer][j - outer] == undefined
  //       ) {
  //         setBoard(saveBoard);
  //         break;
  //       } else if (
  //         board[i + outer + 1][j - outer - 1] == '3' &&
  //         board[i + outer][j - outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i + outer + 1][j - outer - 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackSixth', board);

  //         //}
  //       }
  //     }
  //   }
  // };

  const BlackAllowReverse = (i: number, j: number) => {
    let toggle: boolean = true;
    //3を2にする
    //console.log('Black', board);
    //左から右
    if (board[i][j + 1] == '3') {
      //[0,3,2]⚪︎ [0,3,3,3,0]罰　[0,3,3,0,2]罰
      //左から右
      //左から右へ流れる時の列に、ちゃんと対象の2が存在することを確認したい。
      //2が存在したらfalseのままにする。
      for (let inner = 0; board[i][j + inner + 1] !== '2'; inner++) {
        if (board[i][j + inner] == '0' || board[i][j + inner] == null) {
          toggle = !toggle;
          console.log('探索した結果不適切でした。', toggle);
          break;
        }
        console.log('YooHoo', toggle);
      }
      console.log('Hollow', toggle);
      if (toggle) {
        for (let outer = 0; board[i][j + outer + 1] == '2'; outer++) {
          console.log('hello');
          if (board[i][j + outer] == '0' || board[i][j + outer] == undefined) {
            console.log('j:', j, 'outer:', outer);
            break;
          } else if (
            board[i][j + outer + 1] === '3' &&
            board[i][j + outer] !== undefined
          ) {
            prevBoard[i][j + outer + 1] = '2';
            setBoard(prevBoard);
            console.log('BlackFirst:', board, 'number', j + outer + 1);
          }
        }
      }
    }
    //i = 0, j = 5,
    //[0,3,2,2,2,1,2,0]右から左
    if (board[i][j - 1] == '3') {
      for (let outer = 0; board[i][j - outer] !== null; outer++) {
        if (
          board[i][j - outer - 1] == '2' ||
          board[i][j - outer] == '0' ||
          board[i][j - outer] == undefined
        ) {
          break;
        } else if (
          board[i][j - outer - 1] == '3' &&
          board[i][j - outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i][j - outer - 1] = '2';
          setBoard(prevBoard);
          console.log('BlackSecond', board);
          //}
        }
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
    if (board[i + 1][j + 1] == '3') {
      for (let outer = 0; board[i + outer][j + outer] !== null; outer++) {
        if (
          board[i + outer + 1][j + outer + 1] == '2' ||
          board[i + outer][j + outer] == '0' ||
          board[i + outer][j + outer] == undefined
        ) {
          break;
        } else if (
          board[i + outer + 1][j + outer + 1] == '3' &&
          board[i + outer][j + outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i + outer + 1][j + outer + 1] = '2';
          setBoard(prevBoard);
          console.log('BlackThird', board);
          //}
        }
      }
    }
    //右下から左上
    if (board[i - 1][j - 1] == '3') {
      for (let outer = 0; board[i - outer][j - outer] !== null; outer++) {
        if (
          board[i - outer - 1][j - outer - 1] == '2' ||
          board[i - outer][j - outer] == '0' ||
          board[i - outer][j - outer] == undefined
        ) {
          break;
        } else if (
          board[i - outer - 1][j - outer - 1] == '3' &&
          board[i - outer][j - outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i - outer - 1][j - outer - 1] = '2';
          setBoard(prevBoard);
          console.log('BlackFourth', board);

          //}
        }
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
    if (board[i - 1][j + 1] == '3') {
      for (let outer = 0; board[i - outer][j + outer] !== null; outer++) {
        if (
          board[i - outer - 1][j + outer + 1] == '2' ||
          board[i - outer][j + outer] == '0' ||
          board[i - outer][j + outer] == undefined
        ) {
          break;
        } else if (
          board[i - outer - 1][j + outer + 1] == '3' &&
          board[i - outer][j + outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i - outer - 1][j + outer + 1] = '2';
          setBoard(prevBoard);
          console.log('BlackFifth', board);

          //}
        }
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
    if (board[i + 1][j - 1] == '3') {
      for (let outer = 0; board[i + outer][j - outer] !== null; outer++) {
        if (
          board[i + outer + 1][j - outer - 1] == '2' ||
          board[i + outer][j - outer] == '0' ||
          board[i + outer][j - outer] == undefined
        ) {
          break;
        } else if (
          board[i + outer + 1][j - outer - 1] == '3' &&
          board[i + outer][j - outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i + outer + 1][j - outer - 1] = '2';
          setBoard(prevBoard);
          console.log('BlackSixth', board);

          //}
        }
      }
    }
  };

  const WhiteAllowReverse = (i: number, j: number) => {
    //3を2にする
    console.log('White', board);
    //左から右[0,2,2,2,0,3]罰
    //       [0,2,2,3]丸
    //       []
    if (board[i][j + 1] == '2') {
      const memoryBoard = [...board];
      for (let outer = 0; board[i][j + outer + 1] !== '3'; outer++) {
        if (
          //水平に3の前に2があることが条件 0,2,2,3
          board[i][j + outer] == '0' ||
          board[i][j + outer] == undefined
        ) {
          setBoard(memoryBoard);
          break;
        } else if (
          board[i][j + outer + 1] == '2' &&
          board[i][j + outer] !== undefined
        ) {
          prevBoard[i][j + outer + 1] = '3';
          setBoard(prevBoard);
          console.log('WhiteFirst', board);
        }
      }
    }

    //[      ⚪︎]
    //[3,2,3,2,3,3,1,0,0]

    if (board[i][j - 1] == '2') {
      const memoryBoard = [...board];
      for (let outer = 0; board[i][j - outer - 1] !== '3'; outer++) {
        if (board[i][j - outer] == '0' || board[i][j - outer] == undefined) {
          setBoard(memoryBoard);
          break;
        } else if (
          board[i][j - outer - 1] == '2' &&
          board[i][j - outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i][j - outer - 1] = '3';
          setBoard(prevBoard);
          console.log('WhiteSecond', board);
          //}
        }
      }
    }
    //右から左

    //左上から右下
    //[0,2,3 i=0, j=0をクリック
    // 2,2,2]
    if (board[i + 1][j + 1] == '2') {
      const memoryBoard = [...board];
      for (
        let outer = 0;
        board[i + outer + 1][j + outer + 1] !== '3';
        outer++
      ) {
        if (
          board[i + outer][j + outer] == '0' ||
          board[i + outer][j + outer] == undefined
        ) {
          setBoard(memoryBoard);
          break;
        } else if (
          board[i + outer + 1][j + outer + 1] == '2' &&
          board[i + outer][j + outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i + outer + 1][j + outer + 1] = '3';
          setBoard(prevBoard);
          console.log('WhiteThird', board);
          //}
        }
      }
    }

    if (board[i - 1][j - 1] == '2') {
      const memoryBoard = [...board];
      for (
        let outer = 0;
        board[i - outer - 1][j - outer - 1] !== '3';
        outer++
      ) {
        if (
          board[i - outer][j - outer] == '0' ||
          board[i - outer][j - outer] == undefined
        ) {
          setBoard(memoryBoard);
          break;
        } else if (
          board[i - outer - 1][j - outer - 1] == '2' &&
          board[i - outer][j - outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i - outer - 1][j - outer - 1] = '3';
          setBoard(prevBoard);
          console.log('WhiteFourth', board);
          //}
        }
      }
    }
    //右下から左上

    if (board[i - 1][j + 1] == '2') {
      const memoryBoard = [...board];
      for (
        let outer = 0;
        board[i - outer - 1][j + outer + 1] !== '3';
        outer++
      ) {
        if (
          board[i - outer][j + outer] == '0' ||
          board[i - outer][j + outer] == undefined
        ) {
          setBoard(memoryBoard);
          break;
        } else if (
          board[i - outer - 1][j + outer + 1] == '2' &&
          board[i - outer][j + outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i - outer - 1][j + outer + 1] = '3';
          setBoard(prevBoard);
          console.log('WhiteFifth', board);
          //}
        }
      }
    }
    //左下から右上

    //右上から左下
    if (board[i + 1][j - 1] == '2') {
      const memoryBoard = [...board];
      for (
        let outer = 0;
        board[i + outer + 1][j - outer - 1] !== '3';
        outer++
      ) {
        if (
          board[i + outer][j - outer] == '0' ||
          board[i + outer][j - outer] == undefined
        ) {
          setBoard(memoryBoard);
          break;
        } else if (
          board[i + outer + 1][j - outer - 1] == '2' &&
          board[i + outer][j - outer] !== undefined
        ) {
          //for (let k = j; k < j + outer; k++) {
          prevBoard[i + outer + 1][j - outer - 1] = '3';
          setBoard(prevBoard);
          console.log('WhiteSixth', board);
          //}
        }
      }
    }
  };

  //   const BlackAllowReverse = (i: number, j: number) => {
  //   //3を2にする
  //   console.log('Black', board);
  //   //左から右
  //   if (board[i][j + 1] == '3') {
  //     console.log('Hello');
  //     //[0,3,2]
  //     for (let outer = 0; board[i][j + outer] !== null; outer++) {
  //       if (
  //         //i = 0, j = 2 + 0 + 1
  //         board[i][j + outer + 1] == '2' ||
  //         board[i][j + outer] == '0' ||
  //         board[i][j + outer] == undefined
  //       ) {
  //         console.log('j:', j, 'outer:', outer);
  //         break;
  //       } else if (
  //         board[i][j + outer + 1] === '3' &&
  //         board[i][j + outer] !== undefined
  //       ) {
  //         prevBoard[i][j + outer + 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackFirst:', board, 'number', j + outer + 1);
  //       }
  //     }
  //   }
  //   //i = 0, j = 5,
  //   //[0,3,2,2,2,1,2,0]右から左
  //   if (board[i][j - 1] == '3') {
  //     for (let outer = 0; board[i][j - outer] !== null; outer++) {
  //       if (
  //         board[i][j - outer - 1] == '2' ||
  //         board[i][j - outer] == '0' ||
  //         board[i][j - outer] == undefined
  //       ) {
  //         break;
  //       } else if (
  //         board[i][j - outer - 1] == '3' &&
  //         board[i][j - outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i][j - outer - 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackSecond', board);
  //         //}
  //       }
  //     }
  //   }
  //   /*[ i= 1 j =1
  //       i= 2 j = 2
  //       i= 3 j = 3
  //       i= 4 j = 4
  //      0,0,0,0,0
  //      0,1,0,0,0
  //      0,0,2,0,0
  //      0,0,0,2,0
  //      0,0,0,0,3
  //   ] */
  //   //左上から右下
  //   if (board[i + 1][j + 1] == '3') {
  //     for (let outer = 0; board[i + outer][j + outer] !== null; outer++) {
  //       if (
  //         board[i + outer + 1][j + outer + 1] == '2' ||
  //         board[i + outer][j + outer] == '0' ||
  //         board[i + outer][j + outer] == undefined
  //       ) {
  //         break;
  //       } else if (
  //         board[i + outer + 1][j + outer + 1] == '3' &&
  //         board[i + outer][j + outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i + outer + 1][j + outer + 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackThird', board);
  //         //}
  //       }
  //     }
  //   }
  //   //右下から左上
  //   if (board[i - 1][j - 1] == '3') {
  //     for (let outer = 0; board[i - outer][j - outer] !== null; outer++) {
  //       if (
  //         board[i - outer - 1][j - outer - 1] == '2' ||
  //         board[i - outer][j - outer] == '0' ||
  //         board[i - outer][j - outer] == undefined
  //       ) {
  //         break;
  //       } else if (
  //         board[i - outer - 1][j - outer - 1] == '3' &&
  //         board[i - outer][j - outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i - outer - 1][j - outer - 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackFourth', board);

  //         //}
  //       }
  //     }
  //   }
  //   /*[ i= 3 j = 1
  //       i= 2 j = 2
  //       i= 1 j = 3
  //       i= 0 j = 4
  //      0,0,0,0,3
  //      0,0,0,2,0
  //      0,0,2,0,0
  //      0,1,0,0,0
  //      0,0,0,0,0
  //   ] */
  //   //左下から右上
  //   if (board[i - 1][j + 1] == '3') {
  //     for (let outer = 0; board[i - outer][j + outer] !== null; outer++) {
  //       if (
  //         board[i - outer - 1][j + outer + 1] == '2' ||
  //         board[i - outer][j + outer] == '0' ||
  //         board[i - outer][j + outer] == undefined
  //       ) {
  //         break;
  //       } else if (
  //         board[i - outer - 1][j + outer + 1] == '3' &&
  //         board[i - outer][j + outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i - outer - 1][j + outer + 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackFifth', board);

  //         //}
  //       }
  //     }
  //   }
  //   /*[ i= 3 j = 1
  //       i= 2 j = 2
  //       i= 1 j = 3
  //       i= 0 j = 4
  //      0,0,0,0,3
  //      0,0,0,2,0
  //      0,0,2,0,0
  //      0,1,0,0,0
  //      0,0,0,0,0
  //   ] */
  //   //右上から左下
  //   if (board[i + 1][j - 1] == '3') {
  //     for (let outer = 0; board[i + outer][j - outer] !== null; outer++) {
  //       if (
  //         board[i + outer + 1][j - outer - 1] == '2' ||
  //         board[i + outer][j - outer] == '0' ||
  //         board[i + outer][j - outer] == undefined
  //       ) {
  //         break;
  //       } else if (
  //         board[i + outer + 1][j - outer - 1] == '3' &&
  //         board[i + outer][j - outer] !== undefined
  //       ) {
  //         //for (let k = j; k < j + outer; k++) {
  //         prevBoard[i + outer + 1][j - outer - 1] = '2';
  //         setBoard(prevBoard);
  //         console.log('BlackSixth', board);

  //         //}
  //       }
  //     }
  //   }
  // };

  // const WhiteAllowReverse = (i: number, j: number) => {
  //   //3を2にする
  //   console.log('White', board);
  //   //左から右[0,2,2,2,0,3]罰
  //   //       [0,2,2,3]丸
  //   //       []
  //   for (let outer = 0; board[i][j + outer] !== null; outer++) {
  //     if (
  //       //水平に3の前に2があることが条件 0,2,2,3
  //       board[i][j + outer + 1] == '3' ||
  //       board[i][j + outer] == '0' ||
  //       board[i][j + outer] == undefined
  //     ) {
  //       break;
  //     } else if (
  //       board[i][j + outer + 1] == '2' &&
  //       board[i][j + outer] !== undefined
  //     ) {
  //       prevBoard[i][j + outer + 1] = '3';
  //       setBoard(prevBoard);
  //       console.log('WhiteFirst', board);
  //     }
  //   }
  //   //[      ⚪︎]
  //   //[3,2,3,2,3,3,1,0,0]

  //   //右から左
  //   for (let outer = 0; board[i][j - outer] !== null; outer++) {
  //     if (
  //       board[i][j - outer - 1] == '3' ||
  //       board[i][j - outer] == '0' ||
  //       board[i][j - outer] == undefined
  //     ) {
  //       break;
  //     } else if (
  //       board[i][j - outer - 1] == '2' &&
  //       board[i][j - outer] !== undefined
  //     ) {
  //       //for (let k = j; k < j + outer; k++) {
  //       prevBoard[i][j - outer - 1] = '3';
  //       setBoard(prevBoard);
  //       console.log('WhiteSecond', board);
  //       //}
  //     }
  //   }
  //   //左上から右下
  //   //[0,2,3 i=0, j=0をクリック
  //   // 2,2,2]
  //   for (let outer = 0; board[i + outer][j + outer] !== null; outer++) {
  //     if (
  //       board[i + outer + 1][j + outer + 1] == '3' ||
  //       board[i + outer][j + outer] == '0' ||
  //       board[i + outer][j + outer] == undefined
  //     ) {
  //       break;
  //     } else if (
  //       board[i + outer + 1][j + outer + 1] == '2' &&
  //       board[i + outer][j + outer] !== undefined
  //     ) {
  //       //for (let k = j; k < j + outer; k++) {
  //       prevBoard[i + outer + 1][j + outer + 1] = '3';
  //       setBoard(prevBoard);
  //       console.log('WhiteThird', board);
  //       //}
  //     }
  //   }
  //   //右下から左上
  //   for (let outer = 0; board[i - outer][j - outer] !== null; outer++) {
  //     if (
  //       board[i - outer - 1][j - outer - 1] == '3' ||
  //       board[i - outer][j - outer] == '0' ||
  //       board[i - outer][j - outer] == undefined
  //     ) {
  //       break;
  //     } else if (
  //       board[i - outer - 1][j - outer - 1] == '2' &&
  //       board[i - outer][j - outer] !== undefined
  //     ) {
  //       //for (let k = j; k < j + outer; k++) {
  //       prevBoard[i - outer - 1][j - outer - 1] = '3';
  //       setBoard(prevBoard);
  //       console.log('WhiteFourth', board);
  //       //}
  //     }
  //   }
  //   //左下から右上
  //   for (let outer = 0; board[i - outer][j + outer] !== null; outer++) {
  //     if (
  //       board[i - outer - 1][j + outer + 1] == '3' ||
  //       board[i - outer][j + outer] == '0' ||
  //       board[i - outer][j + outer] == undefined
  //     ) {
  //       break;
  //     } else if (
  //       board[i - outer - 1][j + outer + 1] == '2' &&
  //       board[i - outer][j + outer] !== undefined
  //     ) {
  //       //for (let k = j; k < j + outer; k++) {
  //       prevBoard[i - outer - 1][j + outer + 1] = '3';
  //       setBoard(prevBoard);
  //       console.log('WhiteFifth', board);
  //       //}
  //     }
  //   }
  //   //右上から左下
  //   for (let outer = 0; board[i + outer][j - outer] !== null; outer++) {
  //     if (
  //       board[i + outer + 1][j - outer - 1] == '3' ||
  //       board[i + outer][j - outer] == '0' ||
  //       board[i + outer][j - outer] == undefined
  //     ) {
  //       break;
  //     } else if (
  //       board[i + outer + 1][j - outer - 1] == '2' &&
  //       board[i + outer][j - outer] !== undefined
  //     ) {
  //       //for (let k = j; k < j + outer; k++) {
  //       prevBoard[i + outer + 1][j - outer - 1] = '3';
  //       setBoard(prevBoard);
  //       console.log('WhiteSixth', board);
  //       //}
  //     }
  //   }
  // };

  const BlackCheckBoard = () => {
    for (let inner = 0; inner < 8; inner++) {
      for (let outer = 0; outer < 8; outer++) {
        if (board[inner][outer] == '2') {
          if (board[inner - 1][outer - 1] !== null) {
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

  const handleClick = (i: number, j: number) => {
    //白編
    console.log(turn);
    if (!turn && board[i][j] == '0') {
      prevBoard[i][j] = '2';
      BlackAllowReverse(i, j);
      setBoard(prevBoard);
      // for (let inner = 0; inner < 8; inner++) {
      //   for (let outer = 0; outer < 8; outer++) {
      //     if (board[inner][outer] == '1') {
      //       prevBoard[inner][outer] = '0';
      //       setBoard(prevBoard);
      //     }
      //   }
      // }
      setTurn(!turn);
      //ここにcheckHorizontalで1を出現させたい。
      //BlackCheckBoard();
    }
    if (turn && board[i][j] == '0') {
      //黒編
      prevBoard[i][j] = '3';
      WhiteAllowReverse(i, j);
      setBoard(prevBoard);

      // for (let inner = 0; inner < 8; inner++) {
      //   for (let outer = 0; outer < 8; outer++) {
      //     if (board[inner][outer] == '1') {
      //       // const prevBoard = [...board];
      //       prevBoard[inner][outer] = '0';
      //       setBoard(prevBoard);
      //     }
      //   }
      // }
      setTurn(!turn);
      //ここにcheckHorizontalで１を出現させたい。
      //WhiteCheckBoard();
    }
  };

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
