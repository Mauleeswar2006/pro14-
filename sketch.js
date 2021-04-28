var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,cash,diamonds,jwellery,sword,end;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var message; 

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  boyImg2 = loadAnimation("runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  drinkImg = loadImage("drink.png");
  drinkSound = loadSound("drink.mp3")
  cashSound = loadSound("cash.mp3");
  swordSound = loadSound("Sword.mp3");
  collectSound = loadSound("Collect.mp3");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("Running",boyImg);
boy.addAnimation("stop",boyImg2);
boy.scale=0.08;
  
end = createSprite(200,200);
end.addImage(endImg);

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
drinkGroup=new Group();
  
//boy.debug = true; 
boy.setCollider("circle",0,0,500)
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  boy.y = World.mouseY;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  if (gameState === PLAY){
    end.visible = false;
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createDrink();

    if (cashG.isTouching(boy)) {
      cashSound.play();
      cashG.destroyEach();
      treasureCollection = treasureCollection + 10;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      collectSound.play();
      treasureCollection = treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      collectsound.play();
      treasureCollection = treasureCollection + 500;
      
    }else if(drinkGroup.isTouching(boy)) {
      drinkGroup.destroyEach();
      drinkSound.play();
      treasureCollection = treasureCollection - 100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        swordSound.play();
        swordGroup.destroyEach();
    }
  }

  }
  
  if (gameState  === END){
    path.velocityY = 0;
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    boy.destroy();
    end.visible = true;
    
}
  
    
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 150 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 180 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
if (World.frameCount % 180 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function createDrink(){
  if (World.frameCount % 200 == 0){
    var drinks = createSprite(Math.round(random(50,350)),40,10,10);
    drinks.addImage(drinkImg);
    drinks.scale = 0.01;  
    drinks.velocityY =  2;
    drinks.lifetime = 150;
    drinkGroup.add(drinks);
  }
  
}