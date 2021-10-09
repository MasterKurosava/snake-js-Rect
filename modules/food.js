import { state } from "./state.js"

export const addNewFood=()=>{
  const cordsNewFood= _getFreeSpace();
  if(cordsNewFood){
    state.food.didAte=false;
    state.food.apples.x=cordsNewFood.x;
    state.food.apples.y=cordsNewFood.y;
  }
}
const _getRandomPosition=(num)=>{
  return Math.floor(Math.random()*num)
}

const _getFreeSpace=()=>{
  const {snake,food,level,maps} = state;
  const {tail} = snake;
  const {didAte} = food;
  const map = maps[`map${level}`];
  let isNewCordsFood= true,
      x,y;

  if(!didAte){
    return false;
  }
  while(isNewCordsFood){
    x= _getRandomPosition(20);
    y= _getRandomPosition(20);
    //проверяем тело
    for(let t=0; t<tail.length-1; t++){
      if(tail[t].x === x && tail[t].y=== y){
        isNewCordsFood= true;
        break;
      }else{
        isNewCordsFood=false;
      }
    }
    if(isNewCordsFood){
      continue;
    }
    //проверяем припятствия
    for(let m=0; m < map.cords.length;m++){
      if(map.cords[m].x === x && map.cords[m].y === y){
        isNewCordsFood= true;
        break;
      }else{
        isNewCordsFood=false;
      }
    }
  }
  return {x,y}
}