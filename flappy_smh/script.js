var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	highscore = 0,					//just highscore
	scoreup = 0,					//did we added +1 to score for this column
	gameover = 1,					//bool if game is on
	columnwidth = 0,				//just column width
	yspeedonclick = 0.5,			//y speed when player clicked
	score = 0,						//just score
	betweencolumndistance = 250,	//distance between columns
	columndistance = Math.max(canv.width,canv.height),	//distance to the column
	columnhole = 100,				//hole in column size
	g = 0.0023,						//force of gravity
	starty = 100,					//start y of player
	t = 10; 						//framerate

var player = {y: starty, vy: 0},
	columns = [];

if (localStorage.getItem("highscore") != null) {
	highscore = localStorage.getItem("highscore");
} else {
	highscore = 0;
}

//player clicked
document.addEventListener('mousedown', clickclick);
document.addEventListener('keydown', clickclick);
//game loop
setInterval(function() {

	//dynamic canvas window size
	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

	//clear screen
	ctx.clearRect(0, 0, canv.width, canv.height);

	//checking player's collision with columns
	if (
		Math.abs((columndistance+betweencolumndistance*1000 % betweencolumndistance) + columnwidth/2 - player.x) < columnwidth/2 + player.size
		&&
		Math.abs(columns[0]*canv.height - columnhole/2 - player.y) > columnhole/2 - player.size
	) {
		gameover = 0;
	}

	//refreshing player's coordinats and sizes
	if (gameover) {
		player.x = canv.width*0.15;
		player.vy += g*t;
		player.y += player.vy*t;
		player.size = Math.min(canv.width, canv.height)*0.05;
		yspeedonclick = player.size * 0.02;
		columndistance -= t*0.0007*Math.min(canv.height, canv.width);
		if (player.y < player.size) {player.y = player.size;}
		if (player.y > canv.height - player.size) {player.y = canv.height - player.size;}
	}

	//calculating new collumns' coordinats and sizes
	betweencolumndistance = 20*player.size;
	columnhole = 8*player.size;
	columnwidth = 5*player.size;
	while (columndistance + columnwidth <= 0) {
		columndistance += betweencolumndistance;
		columns.shift();
		scoreup = 0;
	}
	if (columns.length * betweencolumndistance < 2*canv.width) {
		columns.push(getRandomArbitrary((0+columnhole)/canv.height, 1));
	}

	//updating score
	if (columndistance + columnwidth < player.x && !scoreup) {
		score++;
		scoreup = 1;
	}

	//creating columns
	for (i in columns) {
		ctx.beginPath();
		ctx.fillStyle = "#0f0";
		ctx.fillRect
			(columndistance + betweencolumndistance*i,
			columns[i]*canv.height,
			columnwidth,
			canv.height);
		ctx.fillRect
			(columndistance + betweencolumndistance*i,
			columns[i]*canv.height - columnhole - canv.height,
			columnwidth,
			canv.height);
	}

	//creating player
	ctx.beginPath();
	ctx.fillStyle = "#f00";
	ctx.fillRect(player.x-player.size, player.y-player.size, player.size*2, player.size*2);
	ctx.fill();

	//writing score
	document.getElementById("score").textContent = score;

	//writing gameover
	if (!gameover) {
		document.getElementById("gameover").textContent = "Game Over.";
	}

	//writing high score
	if (!gameover) {
		document.getElementById("highscore").textContent = "High Score = " + highscore;
	}

}, t);

//random number
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//onclick function
function clickclick(e) {
	if (gameover) {
		//jump
		player.vy = -yspeedonclick;
	} else {
		//reload page
		localStorage.setItem("highscore", Math.max(highscore, score));
		document.location.reload(true);
	}
}
