var gameRunning;
var startButton = document.getElementById("button");
var jumpButton = document.getElementById("button2");
var stopButton = document.getElementById("button3");
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
var animation = document.getElementsByClassName("runningAnimation");


//Buttons for Run, jump, and stop
// var run, jump;
// startButton.addEventListener("click", activate);
// jumpButton.addEventListener("click", jump);
// stopButton.addEventListener("click", stop);


//Main here!
var p = new person(0, 100);

function paint(){
	p.drawE();
	p.updateJumpY();
}


var s = setInterval(paint, 30);



//Class for person
function person(x,y){
	//Private fields
	this.x = x;
	this.y = y;
	this.t = 0;
	this.width = 60,
	this.height = 72;
	this.running = false;
	this.jumping = true;
	this.currFrame = 0;
	this.element = document.getElementsByClassName("runningAnimation");
	this.velocity = 13;


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


	//Updates the time from last time the function ran
	this.updateT = function(){
		this.t += 60; 		 
	}

	
	//Public jump function
	var wayUp =  true;
	this.updateJumpY = function(){
		if(this.jumping && (wayUp)){
			if(this.velocity < 1){
				wayUp = false;
			}
			else{
				this.y -= this.velocity;
				this.velocity /= 1.2;	
			}
				
		}
		else if(this.jumping && !wayUp){
			if(this.y > 100){
				this.jumping = false;
				this.running = true;
				y = 100;
			}
			if(this.velocity < 1 && y <= 100)
				this.velocity = 1;
			this.y += this.velocity;
			this.velocity *= 1.2;
		}
	}


	//Updates the frame number
	this.updateFrame = function(){
		if(this.running){
			if(this.currFrame == 5)
				this.currFrame = 0;
			else
				this.currFrame++;
		}
		else if(this.jumping){
			if(this.y < 40)
				this.currFrame = 0;
			else 
				this.currFrame = 4;
		}
	}

	//Function to draw the elemet
	this.drawE = function(){
		clearCanvas();
		ctx.drawImage(this.element[this.currFrame], this.x, this.y, this.width, this.height);
		this.updateFrame();
	}
}






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

// while(gameRunning){
// 	//upDate();
// 	//draw();
// }