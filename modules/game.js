import {width, height, rows, colors, board, ceil,popup} from "./settings.js";
import {state} from "./state.js";
import {animateRAFInteval} from "./utils/animateRAFInterval.js";
import { changeDirection,checkNextLevel,checkWin,moveSnake } from "./snake.js";
import { addNewFood } from "./food.js";

const onload= () =>{
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  const _renderSnake= (snake, x, y)=>{
    snake.tail.forEach(s=>{
      if(s.x === x && s.y === y){
        ctx.fillStyle = colors.snakeBody;
        ctx.fillRect(x*ceil, y*ceil+board.height, ceil, ceil)
        if(s.h){
          ctx.fillStyle = colors.snakeHead;
          ctx.fillRect(x*ceil, y*ceil+board.height, ceil, ceil)
        }
      }
    });
  }

  const _renderFood=(food, x, y)=>{
    if(food.apples.x ===x && food.apples.y ===y){
      ctx.fillStyle = colors.apples;
        ctx.fillRect(x*ceil,y*ceil+board.height, ceil, ceil)
    }
  }

  const _renderBlocks=(maps, x, y)=>{
    maps.cords.forEach(m=>{
      if(m.x===x && m.y===y){
        ctx.fillStyle = colors.wall;
        ctx.fillRect(x*ceil,y*ceil+board.height, ceil, ceil)
      }
    });
  }
  const _renderScoreBoard=(score, level)=>{
    ctx.fillStyle=colors.popup;
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle       = "black";
    ctx.font            = board.font;
    ctx.textAlign       = "left";
    ctx.textBaseline    = "top";
    ctx.fillText(score, board.textScore.x, board.textScore.y);

    ctx.fillStyle       = colors.apples;
    ctx.fillRect(board.apples.x, board.apples.y,30,30);

    ctx.fillStyle       = "black";
    ctx.font            = board.font;
    ctx.textAlign       = "text";
    ctx.fillText(`Level: ${level}`,board.textLevel.x, board.textLevel.y)
  }
  const _renderPopUp=(text)=>{
    const helfW=(width/2),
          helfH=(height/2),
          x    =helfW - (popup.width/2),
          y    =helfH - (popup.height/2);

    ctx.fillStyle = colors.popup;
    ctx.fillRect(x,y, popup.width, popup.height);
    
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = popup.font;
    ctx.fillText(text, helfW, helfH);
  }

  const renderGame= () =>{
    ctx.clearRect(0,0,width,height);

    const {snake, food, maps, level, score, gameStart,win,gameOver} = state;

    for(let y = 0; y < rows; y++){
      for(let x = 0; x < rows; x++){
        _renderSnake(snake, x, y);                   //добавдяем змейку
        _renderFood(food, x, y);                     //добавляем припятствия
        _renderBlocks(maps[`map${level}`], x, y);    //добавляем яблоки
      }
    }
    if(!gameStart){
      _renderPopUp('Press any key');
    }if(win){
      _renderPopUp('Win! Good job!');
    }if(gameOver){
      _renderPopUp('Game over');
    }
    _renderScoreBoard(score,level);
    
  }
  renderGame();
  
  let startTime = 0,
      currentTime=0,
      time=0,
      currentSecond=0;

  animateRAFInteval.start(()=>{
    if(startTime ===0) startTime= new Date().getTime(); 
    currentTime= new Date().getTime();
    time=currentTime - startTime;
    currentSecond = Math.floor(time/state.snake.speed);

    if(currentSecond > 0){
      startTime=0;
      if(state.gameStart){
        checkNextLevel();
        checkWin();

        moveSnake();
        addNewFood();

        renderGame();

        if(state.win || state.gameOver){
          animateRAFInteval.cancel();
          document.removeEventListener("keydown",onkeyDown);
        }
      }
    }
  })
  const onkeyDown=(e)=>{
    state.gameStart=true;
    changeDirection(e.keyCode);
  }
  document.addEventListener("keydown", onkeyDown)
}
window.addEventListener('load', onload)