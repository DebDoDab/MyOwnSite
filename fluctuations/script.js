var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	w = 3,
	a = 70,
	r = 100,
	time = 0,
	start = 0,
	t = 10;				//framerate

var
	object = [{x: 0, y: 0, r: r, w: w, A: a, start: start, color: "#f00"},
			  {x: 0, y: 0, r: r*0.8, w: w*0.8, A: a*0.8, start: start, color: "#0f0"}
	];

var
	O = [[],[]];

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
