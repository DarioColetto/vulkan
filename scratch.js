const wrapper = document.querySelector(".layer-wrapper");

for (let i = 0; i < 3; i++) {
  const container = document.createElement("div");
  container.className = "particles-container";
  container.id = `container${i}`;
  container.style.zIndex = -i;
  wrapper.appendChild(container);
}

const containers = document.querySelectorAll(".particles-container");

containers.forEach((container) => {
  for (let i = 0; i < 100; i++) {
    const particle = document.createElement("div");
    const duration = Math.random() + 10 + "s";
    particle.className = "particle";
    particle.style.position = "relative";
    particle.style.height = "10px";
    particle.style.width = "10px";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = Math.random() * 100 + "vh";
    particle.style.borderRadius = "50%";

    particle.style.animationDuration = duration;
    particle.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(particle);
  }
});


let isRunning = false;
let prevCoords = { x: 0, y: 0 };
let currentCoords = { x: 0, y: 0 };
let difCoor = { x: 0, y: 0 };


window.addEventListener("mousemove", (e) => {

  currentCoords = { x: e.clientX, y: e.clientY };

  if (isRunning == false) {
    console.log("start running");
    isRunning = true;
    initPrev(e);
    delay(e);
  } else {
    
    console.log("still running...", currentCoords);
  }
});

function initPrev(e) {
  prevCoords = { x: e.clientX, y: e.clientY };
 console.log("init: ", prevCoords)
}

function getDiference() {
  difCoor.x=currentCoords.x - prevCoords.x;
   difCoor.y= currentCoords.y - prevCoords.y
   console.log('dif:', difCoor)
  
}

function updateCoordinates() {
  prevCoords = { ...currentCoords };
  console.log("desp ", prevCoords);
}

function delay(e) {
  

  setTimeout(() => {
    getDiference(e);
    updateCoordinates(e);
    console.log("stopped");
    updateElementPosition();
    isRunning = false;
  }, 100);
}

function sumCoordinates(){

  return difCoor.x + difCoor.y

}

function checkNotZero(){
  let notZero = sumCoordinates() != 0;
  console.log('not zero: ' ,notZero)
  return notZero;
}

function checkPixelFloor(floor){
  let bool = Math.abs(sumCoordinates()) > floor;
  console.log('pixelfloor: ', bool)
  
  return bool


};


function updateElementPosition(){
  
  console.log('updating')


  
   if(checkNotZero() && checkPixelFloor(3) ){

    let moving1 = movingAmount(difCoor, 0.1);
    let moving2 = movingAmount(difCoor, 0.3);
    let moving3 = movingAmount(difCoor, 0.5);

    console.log('moving;', moving1)
    

  containers[0].style.transform = `translate(${Math.floor(moving1.x)}px, ${
    Math.floor(moving1.y) 
  }px)`;
  containers[1].style.transform = `translate(${moving2.x}px, ${
    moving2.y
  }px)`;
  containers[2].style.transform = `translate(${moving3.x}px, ${
    moving3.y
  }px)`;

}

}



function movingAmount(coordinates, factor){

  let roundX = Math.round(coordinates.x*factor)
  let roundY = Math.round(coordinates.y * factor)

  return {x: roundX,  y:roundY}

}




// const element = document.querySelector('.animate');

// function getRandomDelay() {
//   let duration = Math.floor(Math.random() * (7 - 2 + 1)) + 3;
//   duration *= 1000; // Convert seconds to milliseconds
//   return duration;
// }

// function restartAnimation() {
//   element.style.animation = 'none'; // Reset the animation
//   void element.offsetWidth; // Trigger reflow to apply the reset
//   element.style.animation = ''; // Reapply the animation

//   setTimeout(restartAnimation, getRandomDelay());
// }

// // Initial start of animation
// restartAnimation();
