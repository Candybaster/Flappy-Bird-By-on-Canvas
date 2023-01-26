var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "/assets/img/bird.png";
bg.src = "/assets/img/bg.png";
fg.src = "/assets/img/fg.png";
pipeUp.src = "/assets/img/pipeUp.png";
pipeBottom.src = "/assets/img/pipeBottom.png";



// звуковые аудио

var fly  = new Audio();
var score_audio = new Audio();


fly.src = "/assets/audio/fly.mp3";
score_audio.src = "/assets/audio/score.mp3";




// (bg, 0, 0) - устанавливаем bg по центру;
// (pipeBottom, 100, 0 + pipeUp.height + gap - по x 
// увеличиваем на 100 пикселей ко второй переменной 
// прибавляем высоту pipeUp и прибавляем 90 пикселей у переменной геп, которую мы благополучно создали;)
// cvs.height - fg.height - меняем обьек местами с верху вниз

var gap = 90;

// событие при нажатии
document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -=25;
  fly.play();
}



// создание блоков 

var pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
}


var score = 0;

// позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for(var i= 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom,pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if(pipe[i].x ==125) {
      pipe.push({
      x : cvs.width,
      y : Math.floor(Math.random()* pipeUp.height) - pipeUp.height
      });
    }

    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // Перезагрузка страницы
    }
    if(pipe[i].x == 5) {
      score++;
      score_audio.play();
  }
}
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);
  // позицию по Y меняем на 1 постоянно, чтобы птичка падала, присвеваем yPos += grav. Благодаря этому с изначальной позиции Y, который равен 150 будет смена координаты на 1. У нас создается анимация падения птички, но необходимо прописать requestAnimationFrame в скобках название функции. 
  yPos += grav;
  requestAnimationFrame(draw);
}

// метот draw будет вызываться толко после загрузки img Bottom за это отвкчает свойство "onload"
pipeBottom.onload = draw; 
