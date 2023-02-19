var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet;
var bulletImg;
var bullets=10;
var zombieGroup;
var zombie, zombieImg;
var bulletGroup;
var gamestate = "play";
var life = 3;
var score = 0;
var heart1;
var heart2;
var heart3;
var heart1Sprite;
var heart2Sprite;
var heart3Sprite;
var loseSound;
var explosionSound;
var winSound;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImg = loadImage("assets/bullet.png")
  zombieImg = loadImage ("assets/zombie.png")
 heart1 = loadImage ("assets/heart_1.png")
 heart2 = loadImage ("assets/heart_2.png")
 heart3 = loadImage ("assets/heart_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  loseSound = loadSound("assets/lose.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
  winSound = loadSound("assets/win.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bulletGroup = new Group();
zombieGroup = new Group();
bg.addImage(bgImg)
bg.scale = 1.1
heart1Sprite=createSprite(displayWidth-150,40,20,20);
heart1Sprite.visible=false;
heart1Sprite.addImage(heart1);
heart1Sprite.scale=0.5;

heart2Sprite=createSprite(displayWidth-150,40,20,20);
heart2Sprite.visible=false;
heart2Sprite.addImage(heart2);
heart2Sprite.scale=0.5;

heart3Sprite=createSprite(displayWidth-170,40,20,20);
heart3Sprite.visible=true;
heart3Sprite.addImage(heart3);
heart3Sprite.scale=0.5;

  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 


if (gamestate==="play"){
  spawnZombies();
 if (life===3){
  heart3Sprite.visible=true;
  heart2Sprite.visible=false;
  heart1Sprite.visible=false;
 }
 if (life===2){
  heart3Sprite.visible=false;
  heart2Sprite.visible=true;
  heart1Sprite.visible=false;
 }
 if(life===1){
  heart3Sprite.visible=false;
  heart2Sprite.visible=false;
  heart1Sprite.visible=true;
 }
 if(life===0){
  heart3Sprite.visible=false;
  heart2Sprite.visible=false;
  heart1Sprite.visible=false;
 }

}

if (life===0){
gamestate="lost";
}
if (score===6){
  gamestate="win";
  winSound.play();
}


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 bullet=createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.addImage(bulletImg)
 bullet.scale=0.06
 bulletGroup.add(bullet)
 

 //bullet.shapeColor="black"
 bullet.velocityX=20
bullet.depth=player.depth
player.depth=player.depth+1
explosionSound.play();

if (bullets>0){
  bullets=bullets-1
}
 
}
if (bullets===0){
  gamestate="outofbullet";
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if (zombieGroup.isTouching(bulletGroup)){
  for (var i=0;i<zombieGroup.length;i++){
    if (zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
      score=score+2;
      explosionSound.play();
    }
  }

}

if (zombieGroup.isTouching(player)){
  for (var i=0;i<zombieGroup.length;i++){
    if (zombieGroup[i].isTouching(player)){
      zombieGroup.destroyEach();
      life=life-1;
      loseSound.play();
    }
  }

}
drawSprites();
textSize(20);
fill("white");
text("life:"+life,displayWidth-210,displayHeight/2-280)
text("score:"+score,displayWidth-210,displayHeight/2-220)
text("bullets:"+bullets,displayWidth-210,displayHeight/2-250)
if (gamestate==="win"){
  textSize(100);
  fill("green");
  text("You Won!",550,400);
  player.destroy();
  zombieGroup.destroyEach();
}
if (gamestate==="lost"){
  textSize(100);
  fill("red");
  text("You Lost!",550,400);
  player.destroy();
  zombieGroup.destroyEach();
}
if (gamestate==="outofbullet"){
  textSize(100);
  fill("blue");
  text("You ran out of bullets!",250,400);
  player.destroy();
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
}
}

function spawnZombies (){
  if (frameCount%60===0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.velocityX=-3
    zombie.scale=0.15
    zombie.lifetime=500
    zombieGroup.add(zombie)
    zombie.setCollider("rectangle",0,0,400,900)
    zombie.debug=false;
  }
}