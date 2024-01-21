
let box2=document.querySelector(".box-2");
let time=60;
let randomHit=1;
let Score=0;
let height=window.innerHeight;
let width=window.innerWidth;
console.log(height,width);

let loseMusic=new Audio("./music/lose.wav");
let moveSound=new Audio("./music/move.mp3");
let winMusic=new Audio("./music/win.wav");


function generateRandom(){
  let rand=Math.ceil(Math.random()*9);
  return rand;
  
}
// creating boxes
function createBoard(){

  console.log(height,width);
  let boardH=height*0.85;
  let boardW=width*0.7-(0.03* width);

  let small=height*(0.1);

  let noOfElemInRow=(boardW/small);
  let noOfElemInARow=(boardW/small);


  let val=(boardH*boardW)/(small*small);
  console.log(boardH,boardW,small,val,noOfElemInRow,noOfElemInARow);

  box2.innerHTML="";
  for(let i=0;i<=(val);i++){
    let div=document.createElement('div');
    div.className="playbox";
    let random=generateRandom();
    div.innerHTML= `${random}`;
    box2.append(div);
  }
}
document.querySelector(".start").addEventListener("click",()=>{

  document.querySelector(".start").style.display="none";
  document.querySelector("#timer").style.visibility="visible";
  createBoard();
  Timer();

})
function RandomHit(){
  randomHit=generateRandom();
  document.querySelector("#hit").innerText=randomHit;
}
function Timer(){
  let timerId=setInterval(()=>{
    if(time>0){
      time=time-1;
      document.querySelector("#time").innerHTML=time;
    }
    else{
      clearInterval(timerId);
      box2.innerHTML="";
      box2.innerHTML=`<div class="GameOver">Game Over Your Score is : ${Score}</div>`;

    }
    
  },1000)
}

box2.addEventListener("click",(det)=>{
  moveSound.play();
  ToCheckWin(det);
})
function ToCheckWin(det){
  
  let clickedVal=Number.parseInt(det.target.innerText);
  if(clickedVal === randomHit){
    moveSound.pause();
    loseMusic.pause();
    winMusic.play();
   Score += 10;
   document.querySelector("#score").innerText=Score;
   console.log(Score);
   RandomHit();
   createBoard();
  }
  else{
    if(Score>0){
      winMusic.pause();
      moveSound.pause();
      loseMusic.play();
      Score -= 10;
      document.querySelector("#score").innerText=Score;
    }
  }
}