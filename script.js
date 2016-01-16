//Class for person
function person(x,y){
	//Private fields
	this.x = x;
	this.y = y;
	t = 0;
	width = 60;
	height = 72;
	jumping = false;
	var element;

	//Public set/get functions
	this.getWidth = function(){
	return this.width;
	}
	this.getHeight = function(){
		return this.height;
	}
	this.getX = function(){
		return this.x;
	}
	this.getY = function(){
		return this.y;
	}
	//Get element from the HTML file
	this.getElement = function(id){
		element = document.getElementById(id);
	}
	//Updates the time from last time the function ran
	this.updateT = function(t){
		if(t == 0){
			t = 0;
		}
		else{
			t = (new Date) - t;
		}	 
	}

	//Public linear move functions
	this.moveX = function(delta){
		this.x += delta;
	}
	this.moveY = function(delta){
		this.y += delta;
	}

	//Public jump function
	this.updateJumpY = function(){
		updateT();
		var a = 0.15;
		var v = -72;
		var deltaY = v*t + t*t;
		moveY(deltaY);
		t = (new date);
	}
}

while(gameRunning){
	//upDate();
	//draw();
}




var gameRunning;
var startButton = document.getElementById("button");
var jumpButton = document.getElementById("button2");
var stopButton = document.getElementById("button3");
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
var animation = document.getElementsByClassName("runningAnimation");


//Buttons for Run, jump, and stop
var run, jump;
startButton.addEventListener("click", activate);
jumpButton.addEventListener("click", jump);
stopButton.addEventListener("click", stop);

//Starts running
function activate(){
	var i = 0;
	stop();
	run = setInterval(draw, 60);
	function draw(){
		clearCanvas();
		ctx.drawImage(animation[i],0,60,60,72);
		i++;
		if(i>5){
			i = 0;
		}
	}
}

//Starts a jump then continues running
function jump(){
	var wayUp = true;
	var y = 0;

	stop();
	jump = setInterval(drawJ, 16);
	function drawJ(){
		clearCanvas();
		if(y < 60 && wayUp){
			ctx.drawImage(animation[4], 0, (60 - y), 60, 72);
			y += 4;	
		}
		else{
			ctx.drawImage(animation[0], 0, (60 - y), 60, 72);
			y -= 5;
			wayUp = false;
		}
		if(y < -5){
			window.clearInterval(jump);
			activate();
		}
	}
}

function clearCanvas(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
}

function stop(){
	window.clearInterval(run);
	window.clearInterval(jump);
}

//Need to learn JavaScript to better structure the game
//Need Classes for objects
//Options: 
//1. one class for element with: fields: x, y, width, heigh, type; and one class for background
//2. one class for person, one for obstacle, one for flyingObstacle?; and one class for background

