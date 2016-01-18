var gameRunning;
var startButton = document.getElementById("button");
var jumpButton = document.getElementById("button2");
var stopButton = document.getElementById("button3");
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
var animation = document.getElementsByClassName("runningAnimation");


//Buttons for Run, jump, and stop
// var run, jump;
// startButton.addEventListener("click", action);
// jumpButton.addEventListener("click", jump);
// stopButton.addEventListener("click", stop);


//Main here!
var p = new person(0, 100);
var o = new obstacle(1, 10);
var b = new bird(7);

p.drawE();
o.drawO();
b.drawB();

function paint(){
	p.drawE();
	o.drawO();
	b.drawB();
	
	o.moveX();
	b.moveX();
	p.updateJumpY();
}

var s = setInterval(paint, 30);



//Class for person-------------------------------------------------------
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
	// this.getWidth = function(){
	// 	return this.width;
	// }
	// this.getHeight = function(){
	// 	return this.height;
	// }
	// this.getX = function(){
	// 	return this.x;
	// }
	// this.getY = function(){
	// 	return this.y;
	// }


	//Updates the time from last time the function ran
	this.updateT = function(){
		this.t += 30; 		 
	}

	
	//Public jump function
	var wayUp =  true;
	this.updateJumpY = function(){
		//The person is jumping up
		if(this.jumping && (wayUp)){
			//If we get to the top update status
			if(this.velocity < 1){		
				wayUp = false;
			}
			else{
				//Ddecrease position
				this.y -= this.velocity;
				this.velocity /= 1.2;	
			}
				
		}//continue comments here!
		else if(this.jumping && !wayUp){
			if(this.y > 100){
				this.jumping = false;
				this.running = true;
				this.y = 100;
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
			else if(this.t%60 == 0)
				this.currFrame++;
		}
		else if(this.jumping){
			if(!wayUp)
				this.currFrame = 2;
			else 
				this.currFrame = 4;
		}
	}

	//Function to draw the elemet
	this.drawE = function(){
		clearCanvas();
		ctx.drawImage(this.element[this.currFrame], this.x, this.y, this.width, this.height);
		this.updateFrame();
		this.updateT();
	}
}




//Class for obstacle-------------------------------------------------------
function obstacle(n, speed){
	this.height = 60;
	this.width = 30*n;
	this.x = canvas.width - this.width - 10;
	this.y = 130;
	this.speed = speed;


	//Copy gets/sets if necessary
	//...........

	//Updates coordinates
	this.moveX = function(){
		this.x -= this.speed;
	}

	//Draws the obstacle
	this.drawO = function(){
		ctx.fillStyle = "#f29d15";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}



//Class for bird---------------------------------------------------------------
function bird(speed){
	this.height = 38.5;
	this.width = 60;
	this.x = canvas.width - this.width - 10;
	this.y = 70;
	this.t = 0;
	this.speed =  speed;
	this.currFrame = 0;
	this.element = document.getElementsByClassName("birdAnimation");

	//Updates the coordinates
	this.moveX = function(){
		this.x -= this.speed;
	}

	//Update time
	this.updateT = function(){
		this.t += 30; 
	}

	//Update frame
	this.updateFrame = function(){
		if(this.currFrame == 3)
				this.currFrame = 0;
		else if(this.t%180 == 0)
			this.currFrame++;
	}

	//Draws the bird frame by frame
	this.drawB = function(){
		ctx.drawImage(this.element[this.currFrame], this.x, this.y, this.width, this.height);
		this.updateFrame();
		this.updateT();
	}
}


function clearCanvas(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
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