//p5.lowPass();
//p5.bandPass

//.res() Q

//set([freq], [Q])
//10 - 100

//use .connect() and .disconnect()
///example: sound.disconnect();
//sound.connect([name of filter]);/sound.start();

//for dog images
var dog;
var cat;
var img = [];

var sound;
var myFilter;
var cFreq;
var q;

//circle array
var circles = [];
var numCircles = 0;
var circleSize = 1;
var speed;

//mic for expanding circle
var mic;

//mp3 sound variable
var bark;
var meow;
var ambience;
var music;

function preload() {
  dog = loadImage("images/dog.jpg");
  
  bark = loadSound("sounds/bark.mp3");
  //bark.duration();
  
  cat = loadImage("images/cat.jpg");
  
  meow = loadSound("sounds/meow.mp3");
  meow.duration();
  
  music = loadSound("ambience.mp3");
  
}

function setup() {
  masterVolume(1);
  createCanvas(1500,1000);
  
  music = loadSound("sounds/ambience.mp3");
  music.play();
  
  //length = bark.duration();
  //println(length);
  
  
 
  sound = new p5.Noise('white');
  
  myFilter = new p5.BandPass();
  
  sound.disconnect();
  sound.connect(myFilter);
  sound.start();
  
  //array of circles
  for (var i = 0; i < numCircles; i++) {
    circles[i] = new Circle();
    
  }
  
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  
  cFreq = map(mouseX, 0, width, 50, 1000);
  q = map(mouseY, 0 , height, 1000, 1);
  myFilter.set(cFreq, q);
  
  //visualise it!
  background(50);
  fill(125);
  rect(mouseX, 0, (map(mouseY, 0, height, 1, width)), height);
  
  for (var i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].move();
    
  }
  
  var vol = mic.getLevel();
  console.log(vol);
  
  fill(255);
  ellipse(width/2, height/2, vol*1000, vol*1000);
  
}

function mousePressed() {
  circles.push(new Circle(dog));
  bark.play();

}

function keyTyped() {
  if (key === 'c') {
    circles.push(new Circle(cat));
    meow.play();
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
  circles.splice(0,1);
}
}

function Circle(img) {
  this.x = random(25, width - 25);
  this.y = random(25, height - 25);
  this.speed = 5;
  this.colour = random(255,0);
  this.img = img;

  this.display = function() {
    fill(this.colour);
    image(img, this.x, this.y);

  }
  
  this.move = function() {
    this.x = this.x + this.speed;

    if (this.x > (width - 25)) {
      this.speed = -this.speed;
      background(0);
    }

    if (this.x < 25) {
      this.speed = -this.speed;
      background(0, 100, 100);
    }
  }
}
 