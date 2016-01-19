var gameRunning = false;
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
var ground = document.getElementById("ground");
var background = document.getElementById("background");



//Main here!-------------------------

//Objects
var deltaX = 0;
var globalTime = 0;
var globalSpeed = 7;
var p = new person(20, 120);
var o = new obstacle(1, globalSpeed);
var b = new bird(4);


//EventListeners
var jump = document.getElementById("button2");
var start = document.getElementById("button");
jump.addEventListener("click", initializeJump);
start.addEventListener("click", initializeGame);

// drawGround();
// p.drawE();
var s = setInterval(game, 30);








//Main functions---------------------------------------------------------
function initializeJump(){
	if(p.running){
		p.running = false;
		p.jumping = true;
	}
}

function initializeGame(){
	gameRunning = true;
}

function clearCanvas(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
}

function updateCanvas(){
	if(p.jumping){
		p.updateJumpY();
	}
	o.updateX();
}

function drawCanvas(){
	clearCanvas();
	drawBackground();
	drawGround();
	p.drawE();
	o.drawO();
	globalTime += 30;
}

function checkCollision(obs){
	var error = 10;
	if(/*Horizontal collision*/(p.x <= obs.x + obs.width && p.x + p.width >= obs.x)
		&& /*Vertical collision*/(p.y <= obs.y + obs.height && p.y + p.height >= obs.y)){
		gameRunning = false;
	}
}

function game(){
	if(gameRunning){
		updateCanvas();
		drawCanvas();
		checkCollision(o);
	}
}


function drawGround(){
	if(deltaX >= 595)
		deltaX = 0;
	ctx.drawImage(ground, deltaX, 0, 600, 40, 0, 170, 600, 40);
	deltaX += globalSpeed;
}

function drawBackground(){
	ctx.drawImage(background,0,0,600,200);
}


//Class for map---------------------------------------------------------
function map(){
	this.view;
	this.all = {};

}



//Class for person-------------------------------------------------------
function person(x,y){
	//Private fields
	this.x = x;
	this.y = y;
	this.ground = y;
	this.t = 0;
	this.width = 43,
	this.height = 51;
	this.running = true;
	this.jumping = false;
	this.currFrame = 0;
	this.element = document.getElementsByClassName("runningAnimation");
	this.velocity = 20;
	this.gravity = 1.3;
	this.initialVelocity = this.velocity;


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
				//Decrease y position
				this.y -= this.velocity;
				this.velocity /= this.gravity;	
			}
				
		}//The person is on the way down
		else if(this.jumping && !wayUp){
			//Initial case velocity is less than 1
			if(this.velocity < 1 && y <= this.ground)
				this.velocity = 1;

			//Normal way down motion
			this.y += this.velocity;
			this.velocity *= this.gravity;
			//Checking for the ending of the jump
			if(this.y > this.ground){	
				//RESET EVERYTHING
				this.jumping = false;
				this.running = true;
				this.velocity = this.initialVelocity;
				wayUp = true;
				this.y = this.ground;
			}	
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
	this.y = 110;
	this.element = document.getElementsByClassName("obstacle");
	this.speed = speed;


	//Copy gets/sets if necessary
	//...........

	//Updates coordinates
	this.updateX = function(){
		this.x -= this.speed;
	}

	//Draws the obstacle
	this.drawO = function(){
		ctx.drawImage(this.element[0],this.x, this.y, this.width, this.height);
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