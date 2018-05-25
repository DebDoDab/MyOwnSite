var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	speed = 0.1,
	w = 3,
	a = 70,
	r = 100,
	time = 0,
	start = 0,
	t = 10;				//framerate

var
	object = {
		r : 10,
		a : 80,
		g : 0.003,
		w : 0,
		l : 100,
		f : 0,
		x : 0,
		y : 0,
		angle : 0
	},

	camera = {
		x : canv.width/7,
		y : canv.height - 2*r
	},

	track = [],

	chart_xt = {
		x : canv.width*3/4,
		y : canv.height/3,
		track : []
	}

setInterval(function () {

	//update
	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

	camera.x = canv.width/7;
	camera.y = canv.height - 2*r;

	chart_xt.x = canv.width*3/4;
	chart_xt.y = canv.height/4;

	//object.w = object.g //fix plz
	object.w = document.getElementById("pendulumw").value/100;
	object.a = document.getElementById("penduluma").value;
	object.x = object.a * Math.sin(object.w*t + object.angle);
	object.angle += object.w*t;
	object.y = Math.sqrt(object.l*object.l - object.x*object.x);

	track.push({
		x : object.x,
		y : 0 - r/2
	});
	chart_xt.track.push(object.x)

	for (var i = 0; i < track.length; i++) {
		track[i].y -= t*speed;
	}

	while(track[0].y < -camera.y) {
		track.splice(0, 1);
	}

	console.log(chart_xt.track[chart_xt.track.length -1], chart_xt.track[0]);
	while(chart_xt.track.length > 300) {
		chart_xt.track.splice(0, 1);
	}

	//clear screen
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canv.width, canv.height);

	//draw pendulum
	ctx.translate(camera.x, camera.y);

	//draw center of pendulum
	ctx.fillStyle = "#000";
	ctx.beginPath();
	ctx.arc(0,0, 15, 0, Math.PI*2);
	ctx.fill();

	//draw track
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#00f";
	ctx.beginPath();
	ctx.moveTo(object.x, object.y);
	ctx.lineTo(object.x, 0 - r/2);
	for (var i = track.length-1; i >=0; i--) {
		ctx.lineTo(track[i].x, track[i].y);
	}
	ctx.stroke();

	//draw line upper pendulum
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#0f0";
	ctx.beginPath();
	ctx.moveTo(0 - r, 0 - r/2);
	ctx.lineTo(0 + r, 0 - r/2);
	ctx.stroke();

	//draw line from pendulum to the center
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#000";
	ctx.beginPath();
	ctx.moveTo(object.x, object.y);
	ctx.lineTo(0, 0);
	ctx.stroke();

	//draw pendulum
	ctx.fillStyle = "#f00";
	ctx.beginPath();
	ctx.arc(object.x, object.y, object.r, 0, Math.PI*2);
	ctx.fill();

	ctx.translate(-camera.x, -camera.y);

	//chart x(t)
	ctx.translate(chart_xt.x, chart_xt.y);

	//axis X
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#000";
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(303, 0);
	ctx.moveTo(305, 0);
	ctx.lineTo(290, -7);
	ctx.moveTo(305, 0);
	ctx.lineTo(290, 7);
	ctx.moveTo(0, -153);
	ctx.lineTo(0, +153);
	ctx.moveTo(0, -155);
	ctx.lineTo(-7, -145);
	ctx.moveTo(0, -155);
	ctx.lineTo(7, -145);
	ctx.stroke();

	ctx.strokeStyle = "#0f0";
	ctx.beginPath();
	ctx.moveTo(0, chart_xt.track[0]);
	for (var i = 1; i < chart_xt.track.length; i++) {
		ctx.lineTo(i, chart_xt.track[i]);
	}
	ctx.stroke();


	ctx.translate(chart_xt.x, chart_xt.y);

}, t);


function getRandomArbitrary(min, max) {
 	return Math.random() * (max - min) + min;
}
