import maps from "./map.js"
export const state={
  snake:{
    tail: [
      {x:1, y:1, d:"right", h: false},
      {x:2, y:1, d:"right", h: false},
      {x:3, y:1, d:"right", h: false},
      {x:4, y:1, d:"right", h: true},
    ],
    direction: "right",
    lastPosTail:{},
    speed:200
  },
  food:{
    didAte:true,
    apples: {}
  },
  level: 4,
  maps:{
    "map1":maps.map1,
    "map2":maps.map2,
    "map3":maps.map3,
    "map4":maps.map4,
  }
}
