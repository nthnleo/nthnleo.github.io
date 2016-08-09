
// make a new biker object
biker = new Biker();
duck = new Duck();
var score = 0;
ground = new Ground(0);
var groundArray = [];
for(i = 0; i < 30; i++) {
	groundArray.push(new Ground(i*20));
}
var duckx;
var ducky;

// creator function for biker object
// need to build object with a creator function if you
// want to have private methods and properties
function Biker() { 

   // get SVG objects, save as private arrays
   var circles = document.getElementsByClassName("wheel");
   var lines = document.getElementsByClassName("biker");
   this.height = 0;  // remember how high the biker is
   this.stepSize = 0;  // remember if you are going up or down

   // private method 
   function moveY(shape, att, jump) {
   	y = shape.getAttribute(att);
   	y = Number(y) + jump; 
   	shape.setAttribute(att, y);
   };

   // a public method to jump up or down
   // positive values move down, negative move up
   this.vertical = function (jump) {

   	for (i=0; i< circles.length; i++) {
		// private method, don't say "this"
		if(Math.sqrt(Math.pow(duckx-circles[i].getAttribute("cx"),2) + Math.pow(ducky-circles[i].getAttribute("cy"),2))<27) {
			score = 0;
		}
		moveY( circles[i],"cy",jump);
	}
	for (i=0; i<lines.length; i++) {
		moveY( lines[i], "y1", jump);
		moveY( lines[i], "y2", jump);
	}
	this.height = this.height+jump;
}
}

function Ground(i) {
	var svgNS = "http://www.w3.org/2000/svg";

	stripeA = document.createElementNS(svgNS,"rect");
	stripeA.setAttribute("x",i);
	stripeA.setAttribute("y",250);
	stripeA.setAttribute("width",25);
	stripeA.setAttribute("height",300-250);
	stripeA.setAttribute("class","ground");
	gameSVG = document.getElementById("drawing");
	gameSVG.appendChild(stripeA);
	
}

function Duck() {
    // these private variables are created when we create the new duck
    var duck = document.getElementById("duck");
    duckx = 700;
    ducky = 175;
    

    // this public function can be called to move the duck
    this.moveDuck = function() {
    	
    	if(duckx == 300) {
    		score++;
    	}
    	duckx = duckx-4;
    	if (duckx < -100) {
    		duckx = 700+duckx;
    	}
    	duck.setAttribute("x",duckx);
    	duck.setAttribute("y",ducky);
    }
}

// called when "jump!" button is pushed
function moveBiker() {
	// use the move method of the global biker object
	if(biker.stepSize == 0) {
		biker.stepSize = -1;
	}
}

// called every 30ms
var singleFrame = function () {
	document.getElementById("score").innerHTML = "Score: " + score;
	biker.vertical(biker.stepSize);
	if (biker.height <= -70) {
		biker.stepSize = 1;
	} 
	else if (biker.height >= 0) {
		biker.stepSize = 0;
	}
	duck.moveDuck();
}


// called when page is loaded
// call function "singleFrame" every 30ms
var animObj = setInterval(singleFrame, 10); 	

var svgNS = "http://www.w3.org/2000/svg";



