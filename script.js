'use strict'

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d"); //グラフィックを描画するためのメソッドやプロパティをもつオブジェクトを返す

// canvasで画像を使うため？
const bg = new Image();
const bg2 = new Image();
const bgGoal = new Image();
const bird = new Image();  
const doutor = new Image();
const flappecino = new Image();
const devilThis = new Image();
const bumped = new Image();
const devilPromise = new Image();
const gonge = new Image();

bg.src = "image/background.png";
bg2.src = "image/background2.png";
bgGoal.src = "image/bg_goal.png";
bird.src = "image/flogGirl.png";
doutor.src = "image/doutor.png";
flappecino.src = "image/flappecino.png";
devilThis.src = "image/this.png";
bumped.src = "image/bumped.png";
devilPromise.src = "image/promise.png";
gonge.src = "image/gonge.png";

// かえるサイズ
const frogHight= 30;
const frogWighth = 30;

// かえる初期位置
const earthHight = 42;
const firstHight = cvs.height - frogHight- earthHight;
let bX = 30;
let bY = firstHight;

// その他
let score = 0;
let endFlag = false;
let clearFlag = false;
let goalShowFlag = false;

const pipe = [];
pipe[0] = {
    x : cvs.width, //canvas幅
    y : 0
};
const staba = [];
staba[0] = {
    x : cvs.width, //canvas幅
    y : firstHight
};

const canvasWidth = 800;
const canvasHight = 480;
let bg1X = 0;
let bg2X = canvasWidth;
let bgGoalX;
let count = 0;
let cX;
let cY;
const stabaFirstArr = [];
const gongefirstArr = [];
const sideLength = 50;

const devilThisArr = [];
let devilThisWidth = 734 * 2 / 3;
let devilThisHight = 388 * 2 / 3;

const devilPromiseArr = [];
let devilPromiseWidth = 550 * 2 / 3;
let devilPromiseHight = 250 * 2 / 3;

const gongeArr = [];
const gongeWidth = 50;
const gongeHight = 50;
let gongeCount = 0; 
let gongeFlag =false;
let countThreshold;


// 設定
const crearPoint = 10;
let scrollSpeed = 1;
let devilThreshold = 400;
const gongeThreshold = 10;

const leftSpeed = 25;
const upSpeed = 25;
const rightSpeed = 25;
const downSpeed = 25;

// レベル設定
const level = document.getElementById("level_value");
function getlevel() {
  switch(level.value) {
    case "レベル1" : 
    countThreshold = 200;
    break ;
  case "レベル2" : 
    countThreshold = 110;
    break ;
  case "レベル3" : 
    countThreshold = 75;
    break ;    
  case "レベル4" : 
    countThreshold = 50;
    break ;
  case "レベル5" : 
    countThreshold = 25;
    break ;
  case "レベル鬼" : 
    countThreshold = 1;
    break ;
  }
}

// キーボード操作
document.addEventListener("keydown",move);
function move(e){
  document.getElementById("jump_sound").load();
  document.getElementById("jump_sound").play();
  switch(e.keyCode) {
    case 37 : //左
      bX -= leftSpeed;
      break ;
    case 38 : //上
      bY -= upSpeed;
      break ;
    case 39 : //右
      bX += rightSpeed;
      break ;
    case 40 : //下
      if (bY < firstHight) {
        if (bY + downSpeed < firstHight) {
          bY += downSpeed;
        } else {
          bY = firstHight;
        }
      }
      break ;
  }
}

// ボタン設定
const nextBtn = document.getElementById("next-btn");
const nextBtn2 = document.getElementById("next2-btn");
const nextBtn3 = document.getElementById("next3-btn");
const retryBtn = document.getElementById("retry-btn");

const firstImg = document.getElementById("first-img");
const after1Img = document.getElementById("after1-img");
const after2Img = document.getElementById("after2-img");
const overImg = document.getElementById("over-img");
const crearImg = document.getElementById("crear-img");
const levelForm = document.getElementById("level_form");


// 音量
document.getElementById("bgm1_sound").volume = 0.02;
document.getElementById("mario_sound").volume = 0.1;
document.getElementById("jump_sound").volume =  0.1;
document.getElementById("crear_sound").volume =  0.1;
document.getElementById("over_sound").volume =  0.1;
document.getElementById("push_sound").volume =  0.1;
document.getElementById("dump_sound").volume =  0.1;
document.getElementById("get_sound").volume =  0.1;
document.getElementById("gonge_sound").volume = 0.1;

// BGM
function soundBgm1(){
  document.getElementById("bgm1_sound").load();
  document.getElementById("bgm1_sound").play();
}

// ゲーム開始ボタン
nextBtn.addEventListener("click", () => {
  document.getElementById("mario_sound").load();
  document.getElementById("mario_sound").play();
  soundPush();
  setTimeout(gameStart, 400);
});

// ゲーム開始関数
function gameStart() {
  if (level.value === "レベル4" || level.value === "レベル5") {
    devilThisWidth = 734;
    devilThisHight = 388;
    devilPromiseWidth = 550;
    devilPromiseHight = 250;

  } else if (level.value === "レベル1" || level.value === "レベル2") {
    devilThisWidth = 734/3;
    devilThisHight = 388/3;
    devilPromiseWidth = 550/3;
    devilPromiseHight = 250/3;
  } else {
    devilThisWidth = 734 * 2 / 3;
    devilThisHight = 388 * 2 / 3;
    devilPromiseWidth = 550 * 2 / 3;
    devilPromiseHight = 250 * 2 / 3;
  }
  document.getElementById("bgm1_sound").pause();
  getlevel();
  firstImg.style.display = "none";
  cvs.style.display = "inline";
  nextBtn.style.display = "none";
  levelForm.style.display = "none";
  retryBtn.style.display = "inline";
  draw();
}


// ゲーム終了後ボタン１
nextBtn2.addEventListener("click", () => {
  soundPush();
  after1Img.style.display = "none";
  after2Img.style.display = "inline";
  nextBtn2.style.display = "none";
  nextBtn3.style.display = "inline";
  clearFlag = true;
});

// ゲーム終了後ボタン２
nextBtn3.addEventListener("click", () => {
  document.getElementById("bgm1_sound").pause();
  soundPush();
  crearImg.style.display = "inline";
  after2Img.style.display = "none";
  retryBtn.style.display = "inline";
  nextBtn3.style.display = "none";
  document.getElementById("crear_sound").load();
  document.getElementById("crear_sound").play();
});

// リトライ
retryBtn.addEventListener("click", () => {
  soundPush();
  setTimeout(retry, 200);
});

//リトライロード
function retry(){
  location.reload();
}

// 開始音楽
firstImg.addEventListener("click", () => {
  soundBgm1();
});

// ボタン音
function soundPush() {
  document.getElementById("push_sound").load();
  document.getElementById("push_sound").play();
}

// sleep
function sleep(waitMsec) {
  let startMsec = new Date();
  while (new Date() - startMsec < waitMsec);
}

// ゲームオーバー
function gameOver() {
  document.getElementById("mario_sound").pause();
  document.getElementById("dump_sound").load();
  document.getElementById("dump_sound").play();
  ctx.drawImage(bumped, bX - frogWighth/2, bY - frogHight/2, frogWighth * 2, frogHight * 2);
  endFlag = true;
  setTimeout(gameOvershow,1500);
}

// ゲームオーバー画面に遷移
function gameOvershow() {
  document.getElementById("over_sound").load();
  document.getElementById("over_sound").play();
  overImg.style.display = "inline";
  cvs.style.display = "none";
  retryBtn.style.display = "inline";
}

// ゲームクリア
function gameCrear(){
  document.getElementById("mario_sound").pause();
  soundBgm1();
  after1Img.style.display = "inline";
  cvs.style.display = "none";
  nextBtn2.style.display = "inline";
  endFlag = true;
}


// 描画関数
const draw = () => {
  //カエル中心座標の更新
  cX = bX + frogHight/2;
  cY = bY + frogWighth/2;

  // 描画
  ctx.drawImage(bg, bg1X, 0);
  ctx.drawImage(bg2,bg2X, 0);
  if (bgGoalX !== undefined) {
    ctx.drawImage(bgGoal, bgGoalX, 0);
    bgGoalX -= scrollSpeed;
  }
  ctx.drawImage(bird, bX, bY, frogWighth, frogHight);

  // フラペチーノ
  for(let i = 0 ; i < staba.length; i++){
    if (!stabaFirstArr[i]){
      ctx.drawImage(flappecino, staba[i].x, staba[i].y);
    }
    staba[i].x -= scrollSpeed;

    if(staba[i].x === canvasWidth - 200){ 
      staba.push({
          x : cvs.width,
          y : Math.floor(Math.random()*canvasHight)
      });
    }
    // スタバあたり判定
    if (staba[i].x <= cX && cX <= staba[i].x + sideLength && staba[i].y <= cY && cY <= staba[i].y + sideLength) {
      if(!stabaFirstArr[i]){
        stabaFirstArr[i] = true;
        document.getElementById("get_sound").load();
        document.getElementById("get_sound").play();
      }
    } 
  }

  // 権化
  for(let i = 0 ; i < gongeArr.length; i++){
    if (!gongefirstArr[i]){
      ctx.drawImage(gonge, gongeArr[i].x, gongeArr[i].y, gongeWidth, gongeHight);
    }
    if (level.value === "レベル1") {
      gongeArr[i].x -= scrollSpeed;
    } else if (level.value === "レベル2" || level.value === "レベル3") {
      gongeArr[i].x -= scrollSpeed * 2;
    } else {
      gongeArr[i].x -= scrollSpeed * 5;
    }

    if (count % 6 < 2) {
      gongeArr[i].y += scrollSpeed*5;
    } else if (count % 6 < 4){
      gongeArr[i].y -= scrollSpeed*5;
    }

    // 権化あたり判定
    if (gongeArr[i].x <= cX && cX <= gongeArr[i].x + gongeWidth && gongeArr[i].y <= cY && cY <= gongeArr[i].y + gongeHight) {
      if(!gongefirstArr[i]){
        gongefirstArr[i] = true;
        gongeCount = count;
        gongeFlag = true;
        document.getElementById("gonge_sound").load();
        document.getElementById("gonge_sound").play();
      }
    } 
  }

  if (gongeFlag && count - gongeCount >= gongeThreshold){
    gongeFlag = false;
  }

  // スコア計算
  score = 0;
  for (const flag of stabaFirstArr) {
    if (flag) {
      score++;
    }
  }

  // ドトール追加
  if(count % countThreshold === 0){ 
    pipe.push({
      x : cvs.width,
      y : Math.floor(Math.random() * (canvasHight - sideLength))
    });
  }
  // this,promiseの追加
  if (count % (devilThreshold * 3) ===0 && count >= devilThreshold * 3) {
    devilThisArr.push({
      x : cvs.width,
      y : Math.floor(Math.random()*(canvasHight-devilThisHight))
    });
  } else if (count % devilThreshold ===0 && count >= devilThreshold) {
    devilPromiseArr.push({
      x : cvs.width,
      y : Math.floor(Math.random()*canvasHight)
    });
  }
  // 権化の追加
  if(count % (devilThreshold * 1) ===0 && count >= devilThreshold * 1){ 
    gongeArr.push({
      x : cvs.width,
      y : Math.floor(Math.random()*(canvasHight - gongeHight)) 
    });
  }

  // ドトール
  for(let i = 0 ; i < pipe.length; i++){
    if (gongeFlag){
      pipe[i].x = -sideLength;
    }
    // if (!gongeFlag) {
      ctx.drawImage(doutor, pipe[i].x, pipe[i].y);

      // ゲームオーバー
      if (pipe[i].x <= cX && cX <= pipe[i].x + sideLength && pipe[i].y <= cY && cY <= pipe[i].y + sideLength) {
        gameOver();
        break;
      }
    // }

    pipe[i].x -= scrollSpeed;

    if (i % 5 === 0) {
      pipe[i].y -= scrollSpeed / 10;
    } else if (i % 5 === 1) {
      pipe[i].y += scrollSpeed / 10;
      pipe[i].x -= scrollSpeed;
    } else if (i % 5 === 2) {
      pipe[i].y -= scrollSpeed / 5;
      pipe[i].x -= scrollSpeed;
    } else if (i % 5 === 3) {
      pipe[i].y -= scrollSpeed / 5;
    }
  }

  // this
  for(let i = 0 ; i < devilThisArr.length; i++){
    if (gongeFlag){
      devilThisArr[i].x = -devilThisWidth;
    }

    // if (!gongeFlag) {
      ctx.drawImage(devilThis, devilThisArr[i].x, devilThisArr[i].y, devilThisWidth, devilThisHight);

      // ゲームオーバー
      if (devilThisArr[i].x <= cX && cX <= devilThisArr[i].x + devilThisWidth && devilThisArr[i].y <= cY && cY <= devilThisArr[i].y + devilThisHight) {
        gameOver();
        break;
      }
    // }
    devilThisArr[i].x -= scrollSpeed;
    devilThisArr[i].y += scrollSpeed / 20; 
  }

  // promise
  for(let i = 0 ; i < devilPromiseArr.length; i++){
    if (gongeFlag){
      devilPromiseArr[i].x = -devilPromiseWidth;
    }
    // if (!gongeFlag) {
      ctx.drawImage(devilPromise, devilPromiseArr[i].x, devilPromiseArr[i].y, devilPromiseWidth, devilPromiseHight);
      // ゲームオーバー
      if (devilPromiseArr[i].x <= cX && cX <= devilPromiseArr[i].x + devilPromiseWidth && devilPromiseArr[i].y <= cY && cY <= devilPromiseArr[i].y + devilPromiseHight) {
        gameOver();
        break;
      }
    // }

    devilPromiseArr[i].x -= scrollSpeed;
    if (i % 5 === 0) {
      devilPromiseArr[i].y -= scrollSpeed / 10;
      devilPromiseArr[i].x -= scrollSpeed*2;
    } else if (i % 5 === 1) {
      devilPromiseArr[i].y += scrollSpeed / 10;
      devilPromiseArr[i].x -= scrollSpeed* 3;
    } else if (i % 5 === 2) {
      devilPromiseArr[i].y -= scrollSpeed / 5;
      devilPromiseArr[i].x += scrollSpeed/3;
    } else if (i % 5 === 3) {
      devilPromiseArr[i].y -= scrollSpeed / 5;
      devilPromiseArr[i].x += scrollSpeed;
    } else {
      devilPromiseArr[i].y -= scrollSpeed / 20;
      devilPromiseArr[i].x -= scrollSpeed * 4;
    }
  }

  // 重力
  if (bY < firstHight) {
    bY += 1;
  }

  // カウント
  count += 0.5;

  // 背景移動
  bg1X -= scrollSpeed;
  bg2X -= scrollSpeed;

  // 背景繰り返し
  if (bg1X === -canvasWidth) {
    if (goalShowFlag) {
      bgGoalX = canvasWidth;
    } else {
      bg1X = canvasWidth;
    }
  }
  if (bg2X === -canvasWidth) {
    bg2X = canvasWidth;
  }

  // ゴールしたか
  if (bgGoalX + 750 < bX && !clearFlag) {
    gameCrear();
  }

  // ポイント表示
  if(score >= crearPoint) {
    goalShowFlag = true;
    ctx.fillStyle = "red"; //カラー
    ctx.font = "32px"; //大きさ
    ctx.fillText("点数 : " + score + ' point あと少しでスタバが見えてくるよ', 10, cvs.height - 20);
  } else {
    ctx.fillStyle = "#000"; //カラー
    ctx.font = "16px"; //大きさ
    ctx.fillText("点数 : " + score + ' point  (目標 :' + crearPoint +" point, "+ level.value + ")", 10, cvs.height - 20);
  }
  
  // 繰り返し
  if(!endFlag) {
    requestAnimationFrame(draw);
  }
}

soundBgm1();
  // setTimeout(soundBgm1,100);

// module.export = { draw };
  // export { frogHight };
// module.export = frogHight;



// window.addEventListener('unload', function(e){
//   setTimeout(soundBgm1,10);
// });







