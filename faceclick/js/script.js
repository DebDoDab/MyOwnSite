var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	vxmin 		= 0.1,
	vxmax		= 1,
	vymin 		= 0.01,
	vymax		= 0.1,
	newvymin	= 1,
	newvymax	= 2,
	gmin		= 0.001,
	gmax		= 0.002,
	t 			= 10,
	sizemin 	= 60,
	sizemax		= 80,
	decfacty 	= 1,
	rotatemin	= 0.3,
	rotatemax 	= 0.5,
	rocketacc	= 0.005,
	startrocketspeed = 0.2,
	personcount = 20; 

var faces = [];

var mouse = {};
mouse.oldx = -10000;
mouse.oldy = -10000;
mouse.x = -10000;
mouse.y = -10000;

var
	clicksmade = 0,
	clicksmadetext = document.getElementById("clicks"),
	personsalive = personcount,
	personsalivetext = document.getElementById("alive"),
	wonalready = 0,
	dickofadaytext = document.getElementById("dickofaday"),
	wontext = document.getElementById("won");

var rocketperson = {};
	rocketperson.s = "";
	rocketperson.id = 0;

for (var i = 0; i < personcount; i++) {
	var person = {};
	person.vx = getRandomArbitrary(vxmin, vxmax);
	person.vy = getRandomArbitrary(vymin, vymax);
	person.addvx = 0;
	person.addvy = 0;
	person.g = getRandomArbitrary(gmin, gmax);
	person.objectsize = getRandomArbitrary(sizemin, sizemax);
	person.x = getRandomArbitrary(0, canv.width);
	person.y = getRandomArbitrary(0, canv.height);
	person.rotate = getRandomArbitrary(rotatemin, rotatemax);
	person.angle = getRandomArbitrary(0, 360);
	person.rocket = 0;
	person.rocketangle = 0;
	person.rocketspeed = startrocketspeed;
	person.alive = 1;
	person.rockets = "img/rocket.png";

	var s = getRandomArbitrary(1, 50);
	s = Math.ceil(s);
	s = "img/" + s.toString() + ".png";
	person.s = s;

	faces.push(person);
}

var   randomlychoosennumber = Math.ceil(getRandomArbitrary(0, personcount-1));
faces[randomlychoosennumber].rockets = "img/rocket_elite.png";
rocketperson.s = faces[randomlychoosennumber].s;
rocketperson.id = randomlychoosennumber;



/*var s = prompt("Дайте ссылку на файл с изображением или оставьте строку nt, чтобы увидеть ебало Толстика Никиты", 'nt');
    
if ((s.length < 8 || s.substr(0, 8) != "https://") && (s.length < 5 || s.substr(0, 5) !="data:") && (s.length < 7 || s.substr(0, 7) != "http://")) {
    s = "img/" + s + ".png";
}*/

var color = -1;

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
	color += 16;
	color %= 768;
	return getColor(color);
}

function moveFace(i) {

	if (mouse.oldx != -10000 && mouse.oldy != -10000) {
		var x = faces[i].x - mouse.x;
		var y = faces[i].y - mouse.y;
		var s = ((canv.width/5) + (canv.height/5))/2;
		var z = Math.sqrt(y*y + x*x);
		var k = s/z;

		if (Math.abs(x) < canv.width/5 && Math.abs(y) < canv.height/5) {
			faces[i].addvx = x*k/500;//100
			faces[i].addvy = y*k/500;//100
		} else {
			faces[i].addvx = 0;
			faces[i].addvy = 0;
		}

	} else {
		faces[i].addvx = 0;
		faces[i].addvy = 0;
	}
}


canv.addEventListener('mousemove', function(e) {
	clientX = e.clientX;
	clientY = e.clientY;

	mouse.oldx = mouse.x;
	mouse.oldy = mouse.y;
	mouse.x = clientX;
	mouse.y = clientY;

});

canv.addEventListener('mousedown', function(e) {
	clicksmade++;
	var x = e.clientX;
	var y = e.clientY;

	for (var i = 0; i < personcount; i++) {
		if (!faces[i].rocket && Math.abs(faces[i].x - x) < faces[i].objectsize && Math.abs(faces[i].y - y) < faces[i].objectsize) {
			rocketing(i);
		}
	}

});

function rocketing(i) {
	faces[i].rocket = 1;
	faces[i].rocketangle = getRandomArbitrary(0, 360);
}

setInterval(function() {

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

	if (!personsalive && !wonalready) {

		dickofadaytext.textContent = "Dick Of A Day:";
		
		wontext.textContent = "You won.\nYour result = " + clicksmade + " clicks";

		setInterval(function() {
			console.log("SUCK!");
			ctx.translate(canv.width/2, canv.height/2);
		    ctx.rotate(faces[rocketperson.id].angle*Math.PI/180);
			var img = new Image();
		    img.src = rocketperson.s;
		    ctx.drawImage(img, -faces[rocketperson.id].objectsize, -faces[rocketperson.id].objectsize, 2*faces[rocketperson.id].objectsize, 2*faces[rocketperson.id].objectsize);
		    ctx.rotate(-faces[rocketperson.id].angle*Math.PI/180);
		    ctx.translate(-canv.width/2, -canv.height/2);

		    faces[rocketperson.id].angle = (faces[rocketperson.id].angle + faces[rocketperson.id].rotate*t) % 360;
		}, t);



		setTimeout(function() {
			
			document.location.reload(true);
			
		}, 5000);
		
		wonalready = 1;

	}

	

	personsalivetext.textContent = "Persons alive: " + personsalive;
	clicksmadetext.textContent = "Clicks made: " + clicksmade;

	getNextColor();
	var grd=ctx.createRadialGradient(canv.width / 2,canv.height / 2,1,canv.width / 2,canv.height / 2,Math.max(canv.height / 2, canv.width / 2));
	grd.addColorStop(0,getColor(color));
	grd.addColorStop(1,getColor(color + 256));
	ctx.fillStyle=grd;
	ctx.fillRect(0,0, canv.width, canv.height);


	for (var i = 0; i < personcount; i++) {

		var person = faces[i];

		if (!(person.x > 0 - canv.width && person.x < canv.width*2 && person.y > 0 - canv.height && person.y < canv.height*2) && person.alive) {
			person.alive = 0;
			personsalive--;

		}

		if (!person.rocket && person.alive) {
			ctx.translate(person.x, person.y);
		    ctx.rotate(person.angle*Math.PI/180);
			var img = new Image();
		    img.src = person.s;
		    ctx.drawImage(img, -person.objectsize, -person.objectsize, 2*person.objectsize, 2*person.objectsize);
		    ctx.rotate(-person.angle*Math.PI/180);
		    ctx.translate(-person.x, -person.y);

		    person.angle = (person.angle + person.rotate*t) % 360;


		    //mouseMove(i);
		    moveFace(i);
		    if (person.addvx) {
		    	person.x += person.addvx*t;
		    } else {
		    	person.x += person.vx*t;
		    }

		    if (person.addvy) {
		    	person.y += person.addvy*t;
		    } else {
		    	person.y += person.vy*t;
			    person.vy += person.g*t;
		    }


		    if (person.x - person.objectsize < 0) {
		    	person.x = person.objectsize;
		    	person.vx = Math.abs(person.vx)*getRandomArbitrary(0.7, 1.3);
		    }

		    if (person.x + person.objectsize > canv.width) {
		    	person.x = canv.width - person.objectsize;
		    	person.vx = -Math.abs(person.vx)*getRandomArbitrary(0.7, 1.3);
		    }

		    if (person.y - person.objectsize < 0) {
		    	person.y = person.objectsize;
		    	person.vy = Math.abs(person.vy)*decfacty;
		    }

		    if (person.y + person.objectsize > canv.height) {
		    	person.y = canv.height - person.objectsize;
		    	person.vy = -Math.abs(person.vy)*decfacty;
		    }


		    if (person.y + person.objectsize > canv.height && Math.abs(person.vy) < 0.5) {
		    	person.vx = getRandomArbitrary(vxmin, vxmax);
		    	if (getRandomArbitrary(0,1)) {
		    		person.vx *= -1;
		    	}
				person.vy = -getRandomArbitrary(newvymin, newvymax);
		    }

		    //console.log("x ",person.x, "y ", person.y, "vx ", person.vx, "vy ", person.vy, "g ", person.g);

		} else if (person.alive) {
			ctx.translate(person.x, person.y);
		    ctx.rotate(-person.rocketangle*Math.PI/180);
			var img = new Image();
		    img.src = person.rockets;
		    ctx.drawImage(img, -2*person.objectsize, -2*person.objectsize, 4*person.objectsize, 4*person.objectsize);
		    ctx.rotate(person.rocketangle*Math.PI/180);
		    ctx.translate(-person.x, -person.y);

		    person.rocketspeed += rocketacc*t;
		    person.x += -person.rocketspeed*t*Math.sin(person.rocketangle*Math.PI/180);
		    person.y += -person.rocketspeed*t*Math.cos(person.rocketangle*Math.PI/180);
		}

	}
},t);


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}