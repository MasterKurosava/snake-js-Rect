import { rows } from "./settings.js";
import { state } from "./state.js";
import mapKeyCode from "./utils/mapKeyCode.js"

const changeDirection = (keyCode)=>{
  const direction = mapKeyCode(keyCode);
  if(_hasDirection(direction, state.snake)){
    state.snake.direction=direction;
  }
}
//движение змейки
const moveSnake = () =>{

  const headSnake = _getHeadSnake(state.snake);
  const direction = state.snake.direction;
  let newMovementSnake;
  
  if(direction === "left"){
    newMovementSnake= {x: headSnake.x-1, y: headSnake.y, d: direction, h: true}
  }
  if(direction === "right"){
    newMovementSnake= {x: headSnake.x+1, y: headSnake.y, d: direction, h: true}
  }
  if(direction === "up"){
    newMovementSnake= {x: headSnake.x, y: headSnake.y-1, d: direction, h: true}
  }
  if(direction === "down"){
    newMovementSnake= {x: headSnake.x, y: headSnake.y+1, d: direction, h: true}
  }
  if(_checkCollisionSnake(newMovementSnake)){
    return true;
  }

  newMovementSnake=_setTeleportSnake(state.snake, newMovementSnake);
  
  state.snake.lastPosTail= state.snake.tail.shift();
  headSnake.h =false;
  state.snake.tail.push(newMovementSnake);

  _checkGrowth();
}
//телепорт на другое поле
const _setTeleportSnake= (snake, newHeadSnake)=>{
  const {direction}=snake;
  const rowEdge = rows-1;

  if(newHeadSnake.x >rowEdge && direction === "right"){
    return {...newHeadSnake, x:0};
  }
  if(newHeadSnake.x <0 && direction === "left"){
    return {...newHeadSnake,x:rowEdge};
  }
  if(newHeadSnake.y > rowEdge && direction === "down"){
    return {...newHeadSnake,y:0};
  }
  if(newHeadSnake.y < 0 && direction === "up"){
    return {...newHeadSnake,y:rowEdge};
  }
  return {x:newHeadSnake.x, y:newHeadSnake.y, d:newHeadSnake.d, h: newHeadSnake.h};
}
//проверяем направление
const _hasDirection = (direction,snake)=>{
  const headSnake= _getHeadSnake(snake);
  if(
    (direction === "left" && headSnake.d !== "right") ||
    (direction === "right" && headSnake.d !== "left") ||
    (direction === "up" && headSnake.d !== "down") ||
    (direction === "down" && headSnake.d !== "up")
  ){return true}
  else{
    return false;
  }

}
const _checkGrowth=()=>{
  const {snake,food:{apples,}}=state;
  const headSnake=_getHeadSnake(snake);

  if(apples.x===headSnake.x && apples.y===headSnake.y){
    state.food.didAte=true;
    state.snake.tail.unshift(state.snake.lastPosTail);
    if(state.snake.speed>60){
      state.snake.speed-=1;
    }
  }
}

const _checkCollisionSnake=(headSnake)=>{
  const {snake,maps,level}=state;
  const {tail}=snake;
  const map = maps[`map${level}`];

  for(let t=0;t<tail.length;t++){
    if(headSnake.x===tail[t].x && headSnake.y===tail[t].y){
      return true;
    }
  }

  for(let c=0;c<map.cords.length;c++){
    if(map.cords[c].x===headSnake.x && map.cords[c].y===headSnake.y){
      return true;
    }
  }
}

const _getHeadSnake=(snake)=>{
  return snake.tail[snake.tail.length-1];
}

export {changeDirection,moveSnake};