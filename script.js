var gameRunning = false;
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
var ground = document.getElementById("ground");
var background = document.getElementById("background");



//Main here!-------------------------

//Objects
var distance = 125;
var change = 60;
var deltaX = 0;
var deltaB = 0;
var globalTime = 0;
var globalSpeed = 7;
var p = new person(20, 120);
var o1 = new obstacle(2 , 1); //Single
var o2 = new obstacle(1 , 1); //Single small
var o3 = new obstacle(2 , 2); //Double
var b = new bird(globalSpeed + 2);


//EventListeners
var jump = document.getElementById("button2");
var start = document.getElementById("button");
jump.addEventListener("click", initializeJump);
start.addEventListener("click", initializeGame);


var s = setInterval(game, 30);
// function test(){
// 	gameRunning = false;
// 	alert(deltaB);
// }




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
	if(o1.x > -200){
		o1.updateX();
	}
	if(o2.x > -200){
		o2.updateX();
	}
	if(o3.x > -200){
		o3.updateX();
	}
	if(b.x > -200){
		b.updateX();
	}

}

function drawCanvas(){
	clearCanvas();
	drawBackground();
	drawGround();
	p.drawE();
	drawObstacles();
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

//Continue Here!!
function drawBackground(){
	if(deltaB == 2399)
		deltaB = 0;
	ctx.drawImage(background, deltaB, 0, 1200, 400, 0, 0, 600, 200);
	deltaB += 1;
}

var kind;
function drawObstacles(){
	kind = parseInt(Math.random()*10)%2;
	if(kind==0){ 	//Throw an obstacle
		kind = parseInt(Math.random()*100);
		if((kind == 10 || kind == 47 || kind == 31 || kind == 94) && o1.x < -150 && check(o1)){
			o1.x = canvas.width;
		}
		if((kind == 3 || kind == 54 || kind == 82) && o2.x < -150 && check(o2)){
			o2.x = canvas.width;
		}
		if((kind == 19  || kind == 61) && o3.x < -150 && check(o3)){
			o3.x = canvas.width;
		}
	}
	if(kind==1 && b.x < -150){		//Throw a bird
		kind = parseInt(Math.random()*100);
		if((kind == 6 || kind == 73 || kind == 39) && check(b)){
			b.x = canvas.width;
		}	
	}
	o1.drawO();
	o2.drawO();
	o3.drawO();
	b.drawB();
}

var c;
function check(object){
	c = true;
	if(!Object.is(object, o1)){
		if(!checkDistance(object, o1)){
			c = false;
		}
	}
	if(!Object.is(object, o2)){
		if(!checkDistance(object, o2)){
			c = false;
		}
	}
	if(!Object.is(object, o3)){
		if(!checkDistance(object, o3)){
			c = false;
		}
	}
	if(!Object.is(object, b)){
		if(!checkDistance(object, b)){
			c = false;
		}
	}
	return c;
}

function checkDistance(inserted,object){
	if(Object.is(object, b) && (600 - object.x > (distance + change))){
		return true;
	}
	if(Object.is(object, o2) && !(Object.is(object, b)) && (600 - object.x > (distance - change + 20))){
		return true;
	}
	else if(600 - object.x > (distance + change)){
		return true;
	}
	else return false;
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
			if(this.currFrame == 6)
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
function obstacle(h , n){
	this.height = 30*h;
	this.width = 30*n;
	this.x = -200;
	this.y = 110;
	this.element = document.getElementsByClassName("obstacle");
	this.speed = globalSpeed;
	this.index = h-1;

	if(h == 1){
		this.y+=30;
	}
	if(n == 2){
		this.index = 2;
	}

	//Copy gets/sets if necessary
	//...........

	//Updates coordinates
	this.updateX = function(){
		this.x -= this.speed;
	}

	//Draws the obstacle
	this.drawO = function(){
		ctx.drawImage(this.element[this.index],this.x, this.y, this.width, this.height);
	}
}


//Class for bird---------------------------------------------------------------
function bird(speed){
	this.height = 51;
	this.width = 80;
	this.x = -200;
	this.y = 55;
	this.t = 0;
	this.speed =  speed;
	this.currFrame = 0;
	this.element = document.getElementsByClassName("birdAnimation");

	//Updates the coordinates
	this.updateX = function(){
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