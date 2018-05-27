var
    canv    = document.getElementById('canvas'),
    ctx     = canv.getContext('2d');

	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

var
	colors = [],
	color = 0,
	lvl = 50,
	t = 10;

setInterval(function() {
	canv.width  = window.innerWidth;
	canv.height = window.innerHeight;

	
}, t);

function newGame() {
	color = getRandomArbitrary(0, 767);
	for (var i = 0; i < 3; i++) {
		color.push(getNextColor);
	}

	var copy = getRandomArbitrary(0, 2);
	color.push(color[copy]);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getNextColor()
{
	color += lvl;
	color %= 768;
	return getColor(color);
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

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
