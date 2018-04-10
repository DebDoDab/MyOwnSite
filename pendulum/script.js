var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	r = 100,
	m = 10,
	g = 0.001,
	t = 10;				//framerate

var
	object = {x: -100, y: 0, vy: 0};

setInterval(function () {

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

	//clear screen
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canv.width, canv.height);


	ctx.translate(canv.width/2, canv.height/2);

		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.arc(0,0, 10, 0, Math.PI*2);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(object.x, object.y);
		ctx.lineTo(0, 0);
		ctx.stroke();

		ctx.fillStyle = "#f00";
		ctx.beginPath();
		ctx.arc(object.x,object.y, 5, 0, Math.PI*2);
		ctx.fill();

	ctx.translate(-canv.width/2, -canv.height/2);

	object.vy += g*t;
	object.y += object.vy*t;
	//ms*sin(alpha)
	if (r*r - object.y*object.y < 0) {
		object.x *= -1;
		object.y = Math.sqrt(r*r - object.x*object.x);
		object.vy = -Math.abs(object.vy);
	}
	object.x = (object.x/Math.abs(object.x))*Math.sqrt(r*r - object.y*object.y);

}, t);
