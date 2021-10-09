const animateRAFInteval = {
  id: null,
  start: null,
  canseled: false,
  cancel(){
    if(!this.id){
      return false;
    }
    cancelAnimationFrame(this.id);
    this.id = null;
    this.canceled= true;
  }
};
const startRAFInterval = (cb)=>{
  if(!cb || typeof cb !=="function"){
    throw new Error('Callback is not found or not a function')
  }

  animateRAFInteval.canceled=false;

  const animate=()=>{
    cb();
    if(!animateRAFInteval.canceled){
      animateRAFInteval.id=requestAnimationFrame(animate);
    }
  } 

  if(!animateRAFInteval.canceled){
    animateRAFInteval.id=requestAnimationFrame(animate);
  }
}

animateRAFInteval.start=startRAFInterval;

export {animateRAFInteval}