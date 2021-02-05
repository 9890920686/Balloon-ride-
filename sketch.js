
var bagroundimg
var groundb , ground 
var balloon , balloonimg 

var balloonposition
var position



function setup() {
  createCanvas(1367,640);

  database=firebase.database();

  

  balloonposition=database.ref('ball/position')
    balloonposition.on("value",readPosition,showError)

 bagroundimg=loadImage("Hot Air Ballon-01.png")
 balloonimg=loadImage("Hot Air Ballon-01.png")

  ground=createSprite(683.5, 640, 1367, 10);

  balloon=createSprite(100,100,20,20)
  balloon.addimage(balloonimg)
  balloon.scale=0.5
}

function draw() {

background(0);

if(position!=undefined){

  if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
  }

  drawSprites();

}
}

function writePosition(x,y){

  database.ref('ball/position').set({
     'x':position.x + x , 
     'y':position.y + y 
  })
}

function readPosition(data){
  position = data.val();

  balloon.x=position.x
  balloon.y=position.y
}

function showError(){
  console.log("sorry system cant acess database right now")
}