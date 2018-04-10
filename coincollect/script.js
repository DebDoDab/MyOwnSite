var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	relaxbynt = 0,				//use NT's head instead of a ball
	prevkey = -1,				//previous pressed key
	showdidntsavedyettext = 0,	//showing "Didn't saved yet" text on a screen
	showrelaxbynttext = 0,		//showing 'Relax by NT' text on a screen
	showloadedtext = 0,			//showing 'Loaded' text on a screen
	showsavedtext = 0,			//showing 'Saved' text on a screen
	stats = {					//stats
		attempts: 0,			//attempts made
		coins: 0				//coins collected
	},
	coinsize = 5,				//coin size
	clicked = 0,				//did player clicked?
	t = 10,						//framerate
	ballsize = 50,				//ball size
	speed = 0.5,				//start speed of a ball
	angle = Math.PI/4,			//angle of starting speed (radians)
	gravitation = 0.001,		//force of gravitation
	deceleration = 0.8;			//deceleration of collisions with ground

var	rectangle = {xs: 0, xf: canv.width, ys: canv.height*0.8, yf: canv.height*0.8};
var ball = {size: ballsize, x: ballsize, y: rectangle.ys /2, vx: speed*Math.sin(angle), vy: speed*Math.cos(angle)};
var coin = {};
newCoin();

//player clicked
document.addEventListener('mousedown', function(e) {
	var x = e.clientX;
	var y = e.clientY;

	//starting game
	if (!clicked) {
		clicked = 1;
		ball.speed = getDistance(x, y, ball.x, ball.y) / 500;
		ball.angle = Math.atan((y - ball.y)/(x - ball.x));
		ball.vx = ball.speed*Math.cos(ball.angle);
		ball.vy = ball.speed*Math.sin(ball.angle);
		stats.attempts++;
	}
});

//drawing objects
setInterval(function() {

	//dynamic canvas window size
	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

	//clear screen
	ctx.fillStyle = "#00ffff";
	ctx.fillRect(0, 0, canv.width, canv.height);

	//creating ground
	rectangle = {xs: 0, xf: canv.width, ys: canv.height*0.8, yf: canv.height*0.8};
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(rectangle.xs, rectangle.ys, rectangle.xf, rectangle.yf);

	//output count of collected coins and attempts in text
	var countstextsize = Math.floor(Math.min(canv.width*0.9, canv.height*1.25) * 0.05);
	ctx.font = countstextsize+"px Impact";
	console.log(ctx.font);
	ctx.textAlign = "center";
	ctx.fillStyle = "#0000ff";
	ctx.fillText("Coins collected: " + stats.coins, canv.width*0.3, canv.height*0.87);
	ctx.fillText("Attempts made: " + stats.attempts, canv.width*0.7, canv.height*0.87);

	//output hints in text
	var hintstextsize = Math.floor(Math.min(canv.width*0.8, canv.height*1.5) * 0.03);
	ctx.font = hintstextsize+"px Serif";
	ctx.textAlign = "center";
	ctx.fillStyle = "#ff0000";
	ctx.fillText("To save your results press 'S' button", canv.width*0.25, canv.height*0.95);
	ctx.fillText("To load your old results press 'L' button", canv.width*0.75, canv.height*0.95);

	//showing 'Saved' text
	if (showsavedtext > 0) {
		ctx.font = "80px Serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.fillText("Saved.", canv.width*0.5, canv.height*0.5);
		showsavedtext -= t;
	}

	//showing 'Loaded' text
	if (showloadedtext > 0) {
		ctx.font = "80px Serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.fillText("Loaded.", canv.width*0.5, canv.height*0.5);
		showloadedtext -= t;
	}

	//showing 'Relax by NT' text
	if (showrelaxbynttext > 0) {
		ctx.font = "80px Serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.fillText("Relax by NT", canv.width*0.5, canv.height*0.5);
		showrelaxbynttext -= t;
	}

	//showing 'Didnt saved' text
	if (showdidntsavedyettext > 0) {
		ctx.font = "80px Serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.fillText("You didn't save", canv.width*0.5, canv.height*0.5);
		showdidntsavedyettext -= t;
	}

	//creating ball
	if (!relaxbynt) {
		ctx.fillStyle = getGradient();
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI*2);
		ctx.fill();
	} else {
		var img = new Image();
		img.src = "img/NT.png";
		ctx.drawImage(img, ball.x-ball.size, ball.y-ball.size, ball.size*2, ball.size*2);

	}

	//creating coin
	if (!coin.collected) {
		ctx.fillStyle = "#ffff00";
		ctx.beginPath();
		ctx.arc(coin.x*canv.width, coin.y*canv.height, coin.size, 0, Math.PI*2);
		ctx.fill();
	}

	//collect coin
	if (!coin.collected && getDistance(coin.x*canv.width, coin.y*canv.height, ball.x, ball.y) < coin.size + ball.size) {
		coin.collected = 1;
		stats.coins++;
	}

	//if game on
	if (clicked) {

		//refreshing ball.x and ball.y
		ball.x += ball.vx*t;
		ball.y += ball.vy*t;
		ball.vy+= gravitation*t;

		//checking collision with ground
		if (ball.y + ball.size > rectangle.ys) {
			ball.vy = -Math.abs(deceleration*ball.vy);
			ball.y = rectangle.ys - ball.size;
		}

	} else {
		ball.y = rectangle.ys /2;
	}

	//game over?
	if (ball.x - ball.size > canv.width || ball.x + ball.size < 0 || (ball.y === rectangle.ys - ball.size && Math.abs(ball.vy) < 0.1)) {
		gameover();
	}

}, t);

//ball stoped
function gameover() {
	clicked = 0;
	ball = {size: ballsize, x: ballsize, y: rectangle.ys /2, vx: speed*Math.sin(angle), vy: -speed*Math.cos(angle)};
	newCoin();
}

//random number
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//searcing distance
function getDistance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}

//spawning new coin
function newCoin() {
	coin = {
		size: coinsize,
		x: getRandomArbitrary(0.2, (rectangle.xf-coinsize)/canv.width),
		y: getRandomArbitrary(0.25, (rectangle.yf-coinsize)/canv.height),
		collected: 0
	};
}

//creating gradient
function getGradient() {
	var grad = ctx.createLinearGradient(ball.x - ball.size, ball.y - ball.size, ball.x + ball.size, ball.y + ball.size);
	grad.addColorStop('.0', 'magenta');
	grad.addColorStop('.5', 'blue');
	grad.addColorStop('1', 'red');

	return grad;
}

//if key is pressed
document.addEventListener('keydown', function(e) {

	console.log(e.keyCode);
	if (e.keyCode == 83) {
		//saving stats
		localStorage.setItem("stats", JSON.stringify(stats));
		showsavedtext = 1000;
		showloadedtext = 0;
		showrelaxbynttext = 0;
		showdidntsavedyettext = 0;
	} else if (e.keyCode == 76) {
		//load stats
		if (localStorage.getItem("stats").includes('attempts')) {
			stats  = JSON.parse(localStorage.getItem("stats"));
			showloadedtext = 1000;
			showdidntsavedyettext = 0;
		} else {
			showdidntsavedyettext = 1000;
			showloadedtext = 0;
		}
		showsavedtext = 0;
		showrelaxbynttext = 0;
	} else if (e.keyCode == 84 && prevkey == 78) {
		//changing ball to NT's head
		relaxbynt = 1;
		showrelaxbynttext = 1000;
		showloadedtext = 0;
		showsavedtext = 0;
		showdidntsavedyettext = 0;
	}

	//saving key
	prevkey = e.keyCode;

});
