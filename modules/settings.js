const width=600,
      board={
        width,
        height:60,
        font: "normal 25px Arial, sans-serif",
        textScore:{x:60,y:19},
        textLevel:{x:500,y:19},
        apples:{x:15,y:15}
      },
      height=width+board.height,
      ceil=30,
      rows=width/ceil,

      popup={
        width:300,
        height:150,
        font:"normal 25px Arial, sans-serif"
      },

      colors={
        snakeHead: "#00ffff",
        snakeBody: "#1fb9dd",
        wall: "#425870",
        apples: "#d86464",
        popup: "#e0cd1e"
      },
      amountLevels =4;

export {width, height, rows, colors,board, ceil,popup,amountLevels};