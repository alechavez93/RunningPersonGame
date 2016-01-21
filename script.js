var gameRunning = false;
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
var ground = document.getElementById("ground");
var background = document.getElementById("background");



//Main here!-------------------------

//Objects
var score = 0;
var distance = 135;
var change = 80;
var deltaX = 0;
var deltaB = 0;
var globalTime = 0;
var globalSpeed = 4;
var p = new person(20, 120);
var o1 = new obstacle(2 , 1); //Single
var o2 = new obstacle(1 , 1); //Single small
var o3 = new obstacle(2 , 2); //Double
var b = new bird();


//EventListeners
var jump = document.getElementById("button2");
var start = document.getElementById("button");
jump.addEventListener("click", initializeJump);
start.addEventListener("click", initializeGame);


var s = setInterval(game, 15);



//Main functions---------------------------------------------------------
//Initializes the jump sequence
function initializeJump(){
	if(p.running && gameRunning){
		p.running = false;
		p.jumping = true;
	}
}

//Starts game
function initializeGame(){
	gameRunning = true;
	globalSpeed = 0;
	score = 0;
	distance = 135;
	change = 80;
	deltaX = 0;
	deltaB = 0;
	globalTime = 0;
	globalSpeed = 4;
	p = new person(20, 120);
	o1 = new obstacle(2 , 1); //Single
	o2 = new obstacle(1 , 1); //Single small
	o3 = new obstacle(2 , 2); //Double
	b = new bird();
}

//Erases canvas for new Frame
function clearCanvas(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
}

//Update all elements in the canvas
function updateCanvas(){
	UPdifficulty();
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

function UPdifficulty(){
	if(0 <= score && score < 1250){
		globalSpeed = 4;
	}
	else if(1250 <= score && score < 3000){
		globalSpeed = 5;
	}
	else if(3000 <= score && score < 4500){
		globalSpeed = 6;
	}
	else if(4500 <= score){
		globalSpeed = 7;
	}
}

//
function drawCanvas(){
	clearCanvas();
	drawBackground();
	drawGround();
	p.drawE();
	drawObstacles();
	globalTime += 15;
}


function game(){
	if(gameRunning){
		updateCanvas();
		drawCanvas();
		drawScore();
		checkCollision(o1);
		checkCollision(o2);
		checkCollision(o3);
		checkCollision(b);
	}
}


function drawScore(){
	ctx.font="12px Comic Sans MS";
	ctx.fillText("Score: "+score,525,20);
	score = globalTime/15;
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
	if(Object.is(object, o2) && !(Object.is(inserted, b)) && (600 - object.x > (distance - 10))){
		return true;
	}
	else if(600 - object.x > (distance + change)){
		return true;
	}
	else return false;
}


var x,y,height,width;
function checkCollision(obs){
	if(p.currFrame == 0 || p.currFrame == 1 || p.currFrame == 6){
		x = p.x; width = p.width - 4; y = p.y + 10; height = p.height;
		return checkSingleCollision(x,y,height,width,obs);
	}
	//JUMPING DOWN FRAME
	else if(p.currFrame == 2){
		if(p.running){
			x = p.x; width = p.width - 4; y = p.y; height = p.height;
			return checkSingleCollision(x,y,height,width,obs);
		}
		else{
			if(Object.is(b, obs)){
				x = p.x; width = p.width - 4; y = p.y + 10; height = p.height;
				return checkSingleCollision(x,y,height,width,obs);
			}
			else{
				x = p.x + 14; width = p.width - 17; y = p.y; height = p.height - 2;
				return checkSingleCollision(x,y,height,width,obs);
			}
		}
	}
	
	else if(p.currFrame == 3){
		x = p.x; width = p.width - 4; y = p.y + 10; height = p.height;
		return checkSingleCollision(x,y,height,width,obs);
	}
	//JUMPING UP FRAME
	else if(p.currFrame == 4){
		if(p.running){
			x = p.x; width = p.width - 4; y = p.y; height = p.height;
			return checkSingleCollision(x,y,height,width,obs);
		}
		else{
			if(Object.is(b, obs)){
				x = p.x; width = p.width - 4; y = p.y + 10; height = p.height + 20;
				return checkSingleCollision(x,y,height,width,obs);
			}
			else{
				if(p.y < 65){
					return true;
				}
				else{
					x = p.x; width = p.width - 14; y = p.y; height = p.height;
					return checkSingleCollision(x,y,height,width,obs);
				}
			}
		}
	}
	else if(p.currFrame == 5){
		x = p.x; width = p.width - 4; y = p.y + 10; height = p.height;
		return checkSingleCollision(x,y,height,width,obs);
	}
}


function checkSingleCollision(x,y,height,width,obs){
	if(Object.is(obs, b)){
		if(/*Horizontal collision*/(x <= (obs.x + 15) + obs.width && x + width >= (obs.x + 15))
		&& /*Vertical collision*/(y <= (obs.y - 3) + obs.height && y + height >= (obs.y-3))){
			gameRunning = false;
		}
		else return true;
	}
	else{
		if(/*Horizontal collision*/(x <= obs.x + obs.width && x + width >= obs.x)
		&& /*Vertical collision*/(y <= obs.y + obs.height && y + height >= obs.y)){
		gameRunning = false;
	}
	else return true;
	}
	
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
	this.velocity = 25;
	this.gravity = 1.4;
	this.initialVelocity = this.velocity;


	//Updates the time from last time the function ran
	this.updateT = function(){
		if(this.running){
			this.gravity = 1.4+((globalSpeed-4)*0.05);
			this.velocity = 25 +((globalSpeed-4)*2);
		}
		this.t += 15; 		 
	}

	
	//Public jump function
	var wayUp = true;
	var first = true;
	this.updateJumpY = function(){
		if(this.t%30 == 0 || first){
			first =  false;
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
					first = true;
				}	
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
		if(globalSpeed > 5 && this.currFrame == 5){
			this.currFrame = 0;
		}
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
	this.index = h-1;

	if(h == 1){
		this.y+=30;
	}
	if(n == 2){
		this.index = 2;
	}

	//Updates coordinates
	this.updateX = function(){
		this.x -= globalSpeed;
	}

	//Draws the obstacle
	this.drawO = function(){
		ctx.drawImage(this.element[this.index],this.x, this.y, this.width, this.height);
	}
}


//Class for bird---------------------------------------------------------------
function bird(){
	this.height = 47;
	this.width = 50;
	this.x = -200;
	this.y = 55;
	this.t = 0;
	this.currFrame = 0;
	this.element = document.getElementsByClassName("birdAnimation");

	//Updates the coordinates
	this.updateX = function(){
		this.x -= globalSpeed + 1;
	}

	//Update time
	this.updateT = function(){
		this.t += 15; 
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