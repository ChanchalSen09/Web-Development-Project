let timer = 60;
let score = 0;
var ran = 0;
function increaseScore() {
  score += 10;
  document.querySelector("#scoreid").textContent = score;
}
function getNewHit() {
  ran = Math.floor(Math.random() * 10);
  document.querySelector("#hitval").textContent = ran;
}
function makebubble() {
  let clutter = " ";
  let numberOfBubbles = 276;

  if (window.innerWidth < 768) {
    numberOfBubbles = 70;
  }

  for (let i = 1; i <= numberOfBubbles; i++) {
    let rand = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${rand}</div>`;
  }

  document.querySelector("#pbtm").innerHTML = clutter;
}
function runtimer() {
  let timer1 = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector("#timerval").textContent = timer;
    } else {
      clearInterval(timer1);
      document.querySelector("#pbtm").innerHTML = `
      <a>Created By <a><h2>Chanchal Sen<h2>`;
    }
  }, 1000);
}
document.querySelector("#pbtm").addEventListener("click", function (dets) {
  let clickednum = Number(dets.target.textContent);
  if (clickednum === ran) {
    increaseScore();
    makebubble();
    getNewHit();
  }
});

runtimer();
makebubble();
getNewHit();
