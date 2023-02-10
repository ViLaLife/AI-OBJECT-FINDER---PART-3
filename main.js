console.log("beware console is for developers. it can put your information at risk!");
img = "";
Objects = [];
Status = "";
function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
}
function start(){
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML= "Status: Detecting Objects";
}
function modelLoaded() {
    console.log("Model has Loaded!")
    Status = true;
    objectDetector.detect(img, gotResult);
  }
  	
function gotResult(error, results) 
{
  if (error) {
    console.log(error);
  }
  console.log(results);
  Objects = results;
}

function draw(){
    image(video, 0, 0, 640, 420);
    if(Status != ""){
      r = random(255);
      g = random(255);
      b = random(255);
      a = random(255);
      objectDetector.detect(video, gotResult);
      for(i =0; i < Objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("no_of_objs").innerHTML = "No Of Objects Detected:" + " " + Objects.length
        fill(r, g, b, a);
        percent = floor(Objects[i].confidence * 100);
        text(Objects[i].label + " " + percent + "%", Objects[i].x + 15, Objects[i].y + 15);
        noFill();
        stroke(r, g, b);
        rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
      }
    }
}
console.log("Js Loaded!");