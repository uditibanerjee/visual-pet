var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedTime,lastFed;
var fed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  fed=createButton("feed the dog");
  fed.position(700,95);
  fed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
 
  //write code to display text lastFed time here
fill("black");
if(lastFed>=12){
  text("lastFed:"+lastFed%12+"PM",300,50)
}
 else if(lastFed===0){
  text("lastFed: 12AM",300,50)
}
else {
  text("lastFed:"+lastFed+"AM",300,50)
}
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
 var Food_Stock=foodObj.getFoodStock();
 if(Food_Stock<=0){
   foodObj.updateFoodStock(0)
 }
 else{
  foodObj.updateFoodStock(Food_Stock-1)
 }
 database.ref("/").update({
   food:foodObj.getFoodStock(),
   feedTime:hour()
 })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
