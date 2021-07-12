var cap, copRunning, copStanding, copLeft, copLeftRunning;
var robber, robberRunning, robberStanding, robberLeft, robberLeftRunning;
var house, houseImage;
var edges;
var gem1, gem1Image, gemsGroup;
var ladder, ladderImage;
var gameState = "play";
var floor1, floor2;
var score = 0;

function preload() {
  copRunning = loadAnimation("images/cop1.png", "images/cop2.png", "images/cop3.png", "images/cop4.png");
  copStanding = loadAnimation("images/cop1.png");
  copLeft = loadImage("images/cop1Flip.png")
  copLeftRunning = loadAnimation("images/cop1FLip.png", "images/cop2Flip.png", "images/cop3Flip.png", "images/cop4Flip.png");

  robberRunning = loadAnimation("images/robber1.png", "images/robber2.png", 
     "images/robber3.png", "images/robber4.png");
  robberStanding = loadAnimation("images/robber2.png");
  robberLeft = loadAnimation("images/robber3Flip.png");
  robberLeftRunning = loadAnimation ("images/robber1Flip.png", "images/robber2Flip.png", 
  "images/robber3Flip.png", "images/robber4Flip.png");

  houseImage = loadImage("images/house.jpg");

  gem1Image = loadImage("images/gem.png"); 

  ladderImage = loadImage("images/ladder.png");

  
}

function setup() {
  createCanvas(1275,500);
  cop = createSprite(100,160);
  cop.addAnimation("copRun", copRunning);
  cop.addAnimation("cop", copStanding);
  cop.scale = 0.4;
  cop.velocityX = 3;
  
  robber = createSprite(100,420);
  robber.addAnimation("robber", robberStanding);
  robber.addAnimation("robberRun", robberRunning);
  robber.addAnimation("robberLeft", robberLeft);
  robber.addAnimation("robberLeftRun", robberLeftRunning);
  
  ladder = createSprite(425,350);
  ladder.addImage(ladderImage);
  ladder.scale = 0.5;
  ladder.setCollider("rectangle", 0,0,100,ladder.height );
  robber.setCollider("rectangle", 0,0,50,robber.height);
  //ladder.debug = true;
  //robber.debug = true;
  robber.depth = ladder.depth + 1;

  floor1 = createSprite(185,250,375,5);
  floor2 = createSprite(850,250,800,5);
  floor1.visible = false;
  floor2.visible = false;

  gemsGroup = new Group();
}

function draw() {
  background(houseImage);  
  edges = createEdgeSprites();
  textSize(20);
  text("Score: " + score, 50,50)
  if(gameState === "play"){
    cop.bounceOff(edges);
 
  
  if(keyDown("right")){
    robber.x = robber.x + 5;
    robber.changeAnimation("robberRun", robberRunning);
  }

  if(keyWentUp("right")){
    robber.changeAnimation("robber", robberStanding);
  }

  if(keyDown("left")){
    robber.x = robber.x - 5;
    robber.changeAnimation("robberLeftRun", robberLeftRunning);
  }

  if(keyWentUp("left")){
    robber.changeAnimation("robberLeft", robberLeft);
  }
   
  if(keyDown("space")){
    robber.velocityY = -10;
  }
  robber.velocityY = robber.velocityY + 0.5;

  

  if(robber.isTouching(ladder)){
    if(keyDown("up")){
      robber.velocityY = -4;
    }
      if(keyDown("down")){
        robber.velocityY = 4;
      }

  }

  if(gemsGroup.isTouching(robber)){
    score = score + 1;
    gemsGroup[0].destroy();
  }

  if(cop.isTouching(robber)){
    gameState = "end";
  }
  

  robber.collide(floor1);
  robber.collide(floor2);
  robber.collide(edges[3]);
  SpawnGems();
  drawSprites();
  }
  if(gameState === "end"){
    textSize(100);
    text("Game Over " ,600,250)
  }
  
  
}

function SpawnGems(){

  if(frameCount%60===0){
    gem1 = createSprite(random(50,1200),random(50,450));
    gem1.addImage(gem1Image);
    gemsGroup.add(gem1);
    gem1.scale = 0.2;
  }



}