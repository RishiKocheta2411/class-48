var player,playerImg;
var ground;
var enemy,enemyImg,enemyBulletImg; 
var enemies;
var backgroundimg,bg;
var gameover,gameroverimg
var gamewin,gamewinimg
var bullet,bulletImg,bullets,bullet1;
var buttet1 =[]
var reset,resetimg;
var bulletleft = 25;
var gameState = "start"
var kills = 0
var game
var life = 3; 

function preload(){
  backgroundimg = loadImage("assets/background.png")
  playerImg = loadAnimation("assets/character1.png","assets/character2.png","assets/character3.png","assets/character4.png"
  ,"assets/character5.png","assets/character6.png","assets/character7.png","assets/character8.png","assets/character9.png"
  ,"assets/character10.png")
  bulletImg = loadImage("assets/playerbullet.png")
  enemyImg = loadAnimation("assets/enemy1.png","assets/enemy2.png","assets/enemy3.png","assets/enemy4.png","assets/enemy5.png","assets/enemy6.png",)
  enemyBulletImg = loadImage("assets/enemybullet.png")
  gameroverimg = loadImage("assets/gameover.png") 
  gamewinimg = loadImage("assets/game-win.png")
  resetimg = loadImage("assets/reset.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var bg = createSprite(displayWidth/2,displayHeight/2,20,20)
  bg.addImage(backgroundimg);
  bg.scale= 2.5;

  player = createSprite(50,displayHeight/2+120,50,50)
  player.addAnimation("running",playerImg); 
  player.visible = false

  gameover = createSprite(windowWidth/2,windowHeight/2 - 70,50,50);
  gameover.addImage(gameroverimg);
  gameover.visible = false;

  gamewin = createSprite(windowWidth/2,windowHeight/2 - 70,50,50)
  gamewin.addImage(gamewinimg);
  gamewin.visible = false

  reset = createSprite(windowWidth/2 + 5,windowHeight/2 + 150,50,50)
  reset.scale = 0.5;
  reset.addImage(resetimg);
  reset.visible = false

  game = new Game ()
   enemies = createGroup();

    bullets = createGroup();

    Bullet1 = createGroup();

   ground = createSprite(windowWidth/2,windowHeight/2 + 280,windowWidth,20);
   ground.visible = false

}

function draw() {
  background(0);
 
  game.display();
  game.handleStartButton();

  if (gameState === "play"){
   player.visible=true;
   spawnEnemy();
   if(keyDown("RIGHT_ARROW") && player.x <= windowWidth/2 + 400){
    player.x +=  3

  }

  if(keyDown("LEFT_ARROW") && player.x >= 50){
    player.x -=  3

  }

  if (keyDown("space")){
    player.velocityY= -8
  } player.velocityY = player.velocityY + 0.8


  if (mouseWentDown("leftButton")){
    shooting()
  }
  if(bulletleft === 0 || life === 0){
    gameState = "end"
  } 

  if (enemies.isTouching(bullets)){
    for (var i = 0 ; i<enemies.length ; i++){
      if (enemies[i].isTouching(bullets)){
        enemies[i].destroy();
        bullets.destroyEach();
        kills = kills + 1;
      }
    }
  }

  if(Bullet1.isTouching(player)){
    for (var i = 0 ; i<Bullet1.length ; i++){
      if(Bullet1[i].isTouching(player)){
        Bullet1[i].destroy();
        life = life - 1 
      }
    }

  }
  
  if(kills == 5){
    gameState = "won"
  }

  }

 
  
    player.collide(ground);
  
  drawSprites();

 

  textSize(20);
  fill ("black");
  text("KILLS : "+kills,50,50);
  text("Life : "+life,windowWidth - 100,50)

  if (gameState === "end"){
    gameover.visible = true
    player.destroy();
    bullets.destroyEach();
    enemies.destroyEach();
    reset.visible = true;
    gameState = "restart"

    if(mousePressedOver(reset)){
      restart();
    }
  }

  if (gameState === "won"){
    gamewin.visible = true
    player.destroy();
    bullets.destroyEach();
    enemies.destroyEach();
    reset.visible = true;
    gameState = "restart"

    if(mousePressedOver(reset)){
      restart();
    }

  }
}

function shooting(){
  //                                            shooting
        bullet = createSprite(player.x + 50,player.y + 15,10,10)
        bullet.addImage(bulletImg);
        bullet.velocityX = 20;
        bullet.scale = 0.1
        player.depth = bullet.depth;
        player.depth += 2;
        bullets.add(bullet);
        bulletleft = bulletleft - 1;
}

function spawnEnemy(){
  if(frameCount % 200 === 0){
    enemy = createSprite(windowWidth + 30,Math.round(random(200,windowHeight/2 + 200)),40,40)
    enemy.addAnimation("running",enemyImg);
    enemy.velocityX = -3 
    enemy.scale = 0.5 

   for (var i = 0 ; i<=2 ; i++){
    bullet1 = createSprite(enemy.x + (350 * i),enemy.y - 20,10,10)
    bullet1.addImage(enemyBulletImg);
    bullet1.velocityX = -20;
    bullet1.scale = 0.1;
    Bullet1.add(bullet1);

    enemy.depth = Bullet1.depth;
    enemy.depth += 2;
   }
   
   enemies.add(enemy);
  }

}

function restart(){
    kills = 0;
    life = 3;
   gameState = "start"
   reset.visible = false;
   gameover.visible = false;
   gamewin.visible = false;
}




