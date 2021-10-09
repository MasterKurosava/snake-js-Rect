import {width, height, rows, colors} from "./settings.js";
import {state} from "./state.js";
import {animateRAFInteval} from "./utils/animateRAFInterval.js";
import { changeDirection,moveSnake } from "./snake.js";
import { addNewFood } from "./food.js";

const onload= () =>{
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  const renderGame= () =>{
    ctx.clearRect(0,0,width,height);

    for(let y = 0; y < rows; y++){
      for(let x = 0; x < rows; x++){
        //добавдяем змейку
        state.snake.tail.forEach(s=>{
          if(s.x === x && s.y === y){
            ctx.fillStyle = colors.snakeBody;
            ctx.fillRect(x*30,y*30, 30, 30)
            if(s.h){
              ctx.fillStyle = colors.snakeHead;
              ctx.fillRect(x*30,y*30, 30, 30)
            }
          }
        });
        //добавляем припятствия
        state.maps[`map${state.level}`].cords.forEach(m=>{
          if(m.x===x && m.y===y){
            ctx.fillStyle = colors.wall;
            ctx.fillRect(x*30,y*30, 30, 30)
          }
        });
        //добавляем яблоки
        if(state.food.apples.x ===x && state.food.apples.y ===y){
          ctx.fillStyle = colors.apples;
            ctx.fillRect(x*30,y*30, 20, 20)
        }
      }
    }
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
      moveSnake();
      addNewFood();
      renderGame();
    }
  })
  const onkeyDown=(e)=>{
    changeDirection(e.keyCode);
  }
  document.addEventListener("keydown", onkeyDown)
}
window.addEventListener('load', onload)