var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	color = 0,
	w = 3,
	a = 70,
	r = 100,
	time = 0,
	start = 0,
	t = 10;				//framerate

var
	object = [];

var
	O = [];

AddPendulum();
AddPendulum();

setInterval(function () {

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

	//clear screen
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canv.width, canv.height);

	time += t;
	for (var i = 0; i < object.length; i++) {
		object[i].x = object[i].A * Math.sin(object[i].w*time/1000+object[i].start);
		object[i].y = Math.sqrt(object[i].r*object[i].r - object[i].x*object[i].x);

		O[i].unshift({x: object[i].x, y: 0-r/2});
		for (var j = 0; j < O[i].length; j++) {
			O[i][j].y -= t/20;

			if (O[i][j].y < -canv.height - 2*r-canv.height/50) {
				O[i].splice(j, 1);
				j--;
			}
		}


	}

	ctx.translate(canv.width/2, canv.height - 2*r);

		for (var i = 0; i < object.length; i++) {

			ctx.strokeStyle = object[i].color;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(object[i].x, object[i].y);
			ctx.lineTo(0, 0);
			ctx.stroke();

			ctx.fillStyle = object[i].color;
			ctx.beginPath();
			ctx.arc(object[i].x,object[i].y, 10, 0, Math.PI*2);
			ctx.fill();

			ctx.lineWidth = 3;
			ctx.strokeStyle = object[i].color;
			ctx.beginPath();
			ctx.moveTo(object[i].x, object[i].y);
			for (var j = 0; j < O[i].length; j++) {
				ctx.lineTo(O[i][j].x, O[i][j].y);
			}
			ctx.stroke();

		}

		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.arc(0,0, 15, 0, Math.PI*2);
		ctx.fill();

		ctx.lineWidth = 5;
		ctx.strokeStyle = "#0f0";
		ctx.beginPath();
		ctx.moveTo(0 - r, 0 - r/2);
		ctx.lineTo(0 + r, 0 - r/2);
		ctx.stroke();

	ctx.translate(-canv.width/2, -canv.height + 2*r);

}, t);


function getRandomArbitrary(min, max) {
 	return Math.random() * (max - min) + min;
}

function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getColor(color)
{
	color %= 768;
	if (color < 256)
	{
		return rgbToHex(255 - color, color, 0);
	}
	if (color < 512)
	{
		return rgbToHex(0, 255 - (color - 256), color - 256);
	}
	if (color < 768)
	{
		return rgbToHex(color - 512, 0, 255 - (color - 512));
	}
}

function getNextColor()
{
	color += 160;
	color %= 768;
	return getColor(color);
}

function AddPendulum() {
	O.push([]);
	var kola = getRandomArbitrary(0.5, 1.5);
	var loka = getRandomArbitrary(0.5, 1.5);
	var col = getNextColor();
	object.push(
	{x: 0, y: 0, r: r*loka, w: w*kola, A: a*kola, start: start, color: col});
}

function DeletePendulum() {
	O.splice(O.length-1, 1);
	object.splice(object.length-1, 1);
}
