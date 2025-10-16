"use strict";


const timer = document.getElementById("timer");
const start = document.getElementById("start");
const startSound = document.getElementById("startAudio");
const stop = document.getElementById("stop");
const stop1Sound = document.getElementById("stop1Audio");
const stop2Sound = document.getElementById("stop2Audio");
const reset = document.getElementById("reset");
const resetSound = document.getElementById("resetAudio");
const body = document.querySelector("body");

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間


// ボタンを"初期"状態とする
setButtonStateInitial()

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click",
  function () {
    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
    startSound.play();
  }, false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click",
  function () {
    // タイマーを"停止中"状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime;
    if (timer.innerText.substring(0, 5) === "00:10") {
      stop2Sound.play();

      body.style.backgroundColor = "transparent";
      body.style.backgroundImage = "url('img/fireworks.gif')";
      body.style.backgroundPosition = "center";
      body.style.backgroundSize = "cover";
    } else {
      stop1Sound.play();
    }
  }, false
);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click",
  function () {
    // ボタンを"初期"状態とする
    setButtonStateInitial();
    timer.textContent = "00:00.000";
    stopTime = 0;
    resetSound.play();


    body.style.backgroundColor = "rgba(233, 168, 227, 0.6)";
    body.style.backgroundImage = "url()";
  }
);


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  start.classList.add("js-inactive");   // 非活性
  stop.classList.remove("js-inactive");  // 活性
  reset.classList.add("js-inactive");   // 非活性
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add(".timer_appear"); //時間をゆっくり表示
  start.classList.add("js-inactive"); // 活性
  stop.classList.add("js-inactive");    // 非活性
  reset.classList.remove("js-inactive"); // 活性
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
} 