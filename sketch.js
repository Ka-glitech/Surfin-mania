var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var life=0;
var score = 0;

var form, player, game;

var surfers, surfer1, surfer2,heart1,heart2,heart3, heartImg;
var ob1Img, ob2Img, ob3Img, ob4Img,bg,surfer1Img,bg;
var islandgroup;
var coin, coinImg, coinGroup;

function preload(){
  bg= loadImage("images/seaBg.jpg");
  ob1Img = loadImage("images/obstacle1-removebg-preview.png")
  ob2Img = loadImage("images/obstacle2-removebg-preview.png")
  ob3Img = loadImage("images/obstacle3-removebg-preview.png");
  ob4Img = loadImage("images/obstacle4-removebg-preview.png");
  surfer1Img = loadImage("images/Surfer-removebg-preview (1).png")
  heartImg = loadImage("images/heart.png")
  coinImg = loadImage("images/coin.png")
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  islandgroup=new Group();
  obstaclesGroup=new Group(); 
  coinGroup=new Group();



}


function draw(){

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();

  }
  if(gameState === 2){
    game.end();
  }
  if(obstaclesGroup.isTouching(surfer1)||obstaclesGroup.isTouching(surfer2)){
    obstaclesGroup.destroyEach();
      life = life + 1;

      }

      if(coinGroup.isTouching(surfer1)||coinGroup.isTouching(surfer2)) {
        coinGroup.destroyEach();
        score=score+1
      }

      fill(black);
      textSize=23
      text("score= ")
draw_island();
spawnObstacles();
spawnCoins()

//display score,add heart image,add coin
fill(black);
      textSize=23
      text("score= ")


}

function draw_island(){
  if(frameCount%40===0){

    island=createSprite(Math.round(random(0,displayWidth)),Math.round(random(-3000,3000)),40,40);
    island.scale=0.5
    island.velocityY=1;
    island.addImage(ob3Img )
    islandgroup.add(island);
    island.lifetime=300;
}


}
function spawnCoins(){
  if(frameCount%35===0){

    coin=createSprite(Math.round(random(0,displayWidth)),Math.round(random(-3000,3000)),40,40);
    coin.scale=0.1;
    coin.velocityY=1;
    coin.addImage(coinImg )
    coinGroup.add(coin);
    coin.lifetime=300;
}
}

function spawnObstacles() {
  if(frameCount % 30=== 0) {
    var obstacle = createSprite(Math.round(random(0,displayWidth)),Math.round(random(-3000,3000)),40,40);
    surfer1.setCollider("circle",0,0,40);
      // obstacle.debug=true;
    //obstacle.debug = true;
    //obstacle.velocityX = -(6 + 3*score/100);
    var rand1=Math.round(random(1,3));
    if (rand1===1){
      obstacle.velocityY=2
      obstacle.velocityX=-3
    }
    else if (rand1===2){
      obstacle.velocityY=1
      obstacle.velocityX=3
    }

    else{
      obstacle.velocityY=2
    }
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(ob1Img);
              break;
      case 2: obstacle.addImage(ob2Img);
              break;
      case 3: obstacle.addImage(ob3Img);

      default: break;
    }

    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.5;
    obstacle.lifetime = 900;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
