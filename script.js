function coincollectgame() {
	location.href = "coincollect";
}

function faceclickgame() {
	location.href = "faceclick";
}

function snakegamegame() {
	location.href = "snakegame";
}

function pendulumgame() {
	location.href = "fluctuations";
}

function coincollectover() {
	editallsize({h: 70, w: 30},
				{h: 70, w: 70},
				{h: 30, w: 70},
				{h: 30, w: 30});
}

function faceclickover() {
	editallsize({h: 70, w: 70},
				{h: 70, w: 30},
				{h: 30, w: 30},
				{h: 30, w: 70});
}

function snakegameover() {
	editallsize({h: 30, w: 30},
				{h: 30, w: 70},
				{h: 70, w: 70},
				{h: 70, w: 30});
}

function pendulumover() {
	editallsize({h: 30, w: 70},
				{h: 30, w: 30},
				{h: 70, w: 30},
				{h: 70, w: 70});
}

function mouseout() {
	editallsize({h: 50, w: 50},
				{h: 50, w: 50},
				{h: 50, w: 50},
				{h: 50, w: 50});
}

function editallsize(f, s, p, c) {
	editsize('faceclick', f.h, f.w);
	editsize('coincollect', s.h, s.w);
	editsize('snakegame', p.h, p.w);
	editsize('pendulum', c.h, c.w);
}

function editsize(id, height, width) {
	document.getElementById(id).style.height=height+"vh";
	document.getElementById(id).style.width =width +"vw";
}
