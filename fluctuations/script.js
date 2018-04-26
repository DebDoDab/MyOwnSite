var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	w = 5,
	A = 60,
	r = 100,
	time = 0,
	start = 0,
	t = 10;				//framerate

var
	object = {x: 0, y: 0};

var
	O = [];

setInterval(function () {

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

	//clear screen
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canv.width, canv.height);

	time += t;
	object.x = A * Math.sin(w*time/1000+start);
	object.y = Math.sqrt(r*r - object.x*object.x);

	O.unshift({x: object.x, y: 0-r/2});
	for (var i = 0; i < O.length; i++) {
		O[i].y -= t/20;
	}

	ctx.translate(canv.width/2, canv.height/2);

		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.arc(0,0, 15, 0, Math.PI*2);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(object.x, object.y);
		ctx.lineTo(0, 0);
		ctx.stroke();

		ctx.fillStyle = "#f00";
		ctx.beginPath();
		ctx.arc(object.x,object.y, 10, 0, Math.PI*2);
		ctx.fill();

		ctx.fillStyle = "#f00";
		ctx.beginPath();
		ctx.moveTo(object.x, object.y);
		for (var i = 0; i < O.length; i++) {
			ctx.lineTo(O[i].x, O[i].y);
		}
		ctx.stroke();

	ctx.translate(-canv.width/2, -canv.height/2);

}, t);
