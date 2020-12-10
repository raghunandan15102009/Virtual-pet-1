var dog, totalfood, database, food=20;

function preload() {
  dogImage = loadImage("dogImg.png");
  dogImage1 = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  totalfood = database.ref('food');
  totalfood.on("value", readStock);
  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dogImage);
  dog.scale = 0.3;
}


function draw() {
  background(46, 139, 87);
  drawSprites();
  textSize(20);
  fill("white");
  text("Press up arrow to feed the dog",50,450);
  text("food:"+food,100,100);
  if (keyDown(UP_ARROW)) {
    writeStock(food);
    dog.addImage(dogImage1);
  }

}

function readStock(data) {
  food = data.val();
}

function writeStock(food) {
  if (food <= 0) {
    food = 0;
  } else {
    food = food - 1;
  }
  database.ref('/').update({
    food: food
  })
}



