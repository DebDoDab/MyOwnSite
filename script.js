function coincollectgame() {
	location.href = "coincollect/index.html";
}

function faceclickgame() {
	location.href = "faceclick/index.html";
}

function snakegamegame() {
	location.href = "snakegame/index.html";
}

function pendulumgame() {
	location.href = "pendulum/index.html";
}

function coincollectover() {
	document.getElementById('faceclick').style.height="75vh";
	document.getElementById('faceclick').style.width="25vw";
	document.getElementById('coincollect').style.height="75vh";
	document.getElementById('coincollect').style.width="75vw";
	document.getElementById('snakegame').style.height="25vh";
	document.getElementById('snakegame').style.width="75vw";
	document.getElementById('pendulum').style.height="25vh";
	document.getElementById('pendulum').style.width="25vw";
}

function faceclickover() {
	document.getElementById('faceclick').style.height="75vh";
	document.getElementById('faceclick').style.width="75vw";
	document.getElementById('coincollect').style.height="75vh";
	document.getElementById('coincollect').style.width="25vw";
	document.getElementById('snakegame').style.height="25vh";
	document.getElementById('snakegame').style.width="25vw";
	document.getElementById('pendulum').style.height="25vh";
	document.getElementById('pendulum').style.width="75vw";
}

function snakegameover() {
	document.getElementById('faceclick').style.height="25vh";
	document.getElementById('faceclick').style.width="25vw";
	document.getElementById('coincollect').style.height="25vh";
	document.getElementById('coincollect').style.width="75vw";
	document.getElementById('snakegame').style.height="75vh";
	document.getElementById('snakegame').style.width="75vw";
	document.getElementById('pendulum').style.height="75vh";
	document.getElementById('pendulum').style.width="25vw";
}

function pendulumover() {
	document.getElementById('faceclick').style.height="25vh";
	document.getElementById('faceclick').style.width="75vw";
	document.getElementById('coincollect').style.height="25vh";
	document.getElementById('coincollect').style.width="25vw";
	document.getElementById('snakegame').style.height="75vh";
	document.getElementById('snakegame').style.width="25vw";
	document.getElementById('pendulum').style.height="75vh";
	document.getElementById('pendulum').style.width="75vw";
}

function mouseout() {
	document.getElementById('faceclick').style.height="50vh";
	document.getElementById('faceclick').style.width="50vw";
	document.getElementById('coincollect').style.height="50vh";
	document.getElementById('coincollect').style.width="50vw";
	document.getElementById('snakegame').style.height="50vh";
	document.getElementById('snakegame').style.width="50vw";
	document.getElementById('pendulum').style.height="50vh";
	document.getElementById('pendulum').style.width="50vw";
}
