//fix black strips

var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	curdirection = 0,			//curent snake direction that reload 1 time per 't'
	snakedirection = 0,			//snake direction that reload every button press
	snakestartsize = 5,			//size of a snake in a start
	cellsize = 0,				//size of one cell
	cellcount = 20,				//standart count of cells
	cellcountx = 20,			//count of cells in Ox
	cellcounty = 20,			//count of cells in Oy
	t = 75;						//framerate

var
	apple = creatingapple(),
	snakebody = [];

for (var i = 0; i < snakestartsize; i++) {
	snakebody.push({x: 0, y: 0});
}

setInterval(function() {

	//refreshing sizes
	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;
	cellsize = Math.min(canv.width, canv.height) / cellcount;
	cellcountx = Math.floor(canv.width/cellsize);
	cellcounty = Math.floor(canv.height/cellsize);

	//clearing screen
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canv.width, canv.height);

	//clearing game area
	ctx.fillStyle = "#444";
	ctx.fillRect(0, 0, cellsize*cellcountx, cellsize*cellcounty);

	//making snake move
	for (var i = snakebody.length-1; i > 0; i--) {
		snakebody[i] = {x: snakebody[i-1].x, y: snakebody[i-1].y};
	}
	switch (snakedirection) {
		case 1:
			//left
			snakebody[0].x--;
			curdirection = 1;
			break;
		case 2:
			//top
			snakebody[0].y--;
			curdirection = 2;
			break;
		case 3:
			//left
			snakebody[0].x++;
			curdirection = 3;
			break;
		case 4:
			//bottom
			snakebody[0].y++;
			curdirection = 4;
			break;
		default:

	}

	//teleports
	if (snakebody[0].x < 0) {
		snakebody[0].x = cellcountx-1;
	}
	if (snakebody[0].x >= cellcountx) {
		snakebody[0].x = 0;
	}
	if (snakebody[0].y < 0) {
		snakebody[0].y = cellcounty-1;
	}
	if (snakebody[0].y >= cellcounty) {
		snakebody[0].y = 0;
	}

	//drawing Snake
	for (i of snakebody) {
		if (i.x == snakebody[0].x && i.y == snakebody[0].y) {
			ctx.fillStyle = "#ff0";
		} else {
			ctx.fillStyle = "#0f0";
		}
		ctx.fillRect(i.x*cellsize, i.y*cellsize, cellsize, cellsize);
	}

	//drawing apple
	ctx.fillStyle = "#f00";
	ctx.fillRect(apple.x*cellsize, apple.y*cellsize, cellsize, cellsize);


	//checking collision with apple
	for (i of snakebody) {
		if (apple.x === i.x && apple.y === i.y) {
			snakebody.push(snakebody[snakebody.length-1]);
			apple = creatingapple();
		}
	}

	//checking apple out of border
	if (apple.x*cellsize > canv.width || apple.y*cellsize > canv.height) {
		apple = creatingapple();
	}

	//checking snake collision
	if (snakedirection) {
		var snakecollision = 0;
		for (var i = 1; i < snakebody.length; i++) {
			if (snakebody[0].x == snakebody[i].x && snakebody[0].y == snakebody[i].y) {
				snakecollision = 1;
				break;
			}
		}
		if (snakecollision) {
			snakebody.splice(snakestartsize, snakebody.length);
		}
	}

	//showing hint
	if (!snakedirection) {
		ctx.font = "80px Serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.fillText("Press 'w', 'a', 's' or 'd' to move", canv.width*0.5, canv.height*0.5);
	}

}, t);

//creating new apple
function creatingapple() {
	var temp = {};
	temp.x = Math.floor(getRandomArbitrary(0, cellcountx-1));
	temp.y = Math.floor(getRandomArbitrary(0, cellcounty-1));
	return temp;
}

//random number
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

addEventListener('keydown', function(e) {

	console.log(e.keyCode);
	if ((e.keyCode == 37 || e.keyCode == 65) && curdirection != 3) {
		//left
		snakedirection = 1;
	}
	if ((e.keyCode == 38 || e.keyCode == 87) && curdirection != 4) {
		//top
		snakedirection = 2;
	}
	if ((e.keyCode == 39 || e.keyCode == 68) && curdirection != 1) {
		//right
		snakedirection = 3;
	}
	if ((e.keyCode == 40 || e.keyCode == 83) && curdirection != 2) {
		//bottom
		snakedirection = 4;
	}

});
