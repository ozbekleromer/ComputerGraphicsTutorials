function setup() {
  pixelDensity(1);
  createCanvas(512, 512);
  background(255);
}

var x0 = -1;
var y0 = -1;
var x1 = -1;
var y1 = -1;

function mousePressed() {
  x0 = mouseX;
  y0 = mouseY;
}

function mouseDragged() {
  x1 = mouseX;
  y1 = mouseY;
  background(255);
  noStroke();
  fill('red');
  ellipse(x0 - 3, y0 - 3, 6);
  fill('green');
  ellipse(x1 - 3, y1 - 3, 6);
}

function mouseReleased() {
  background(255);
  loadPixels();
  draw_line();
  updatePixels();
}

function set_pixel(x0, y0, a) {
  for (x = 0; x < 512; x++) {
    for (y = 0; y < 512; y++) {
      idx = (y * 512 + x) * 4;
      dxy = a * (x - x0) - (y - y0);

      if (dxy < 0) {
        pixels[idx] = 255;
        pixels[idx + 1] = 0;
      } else if (dxy > 0) {
        pixels[idx] = 0;
        pixels[idx + 1] = 255;
      } else {
        pixels[idx] = 0;
        pixels[idx + 1] = 0;
      }
      pixels[idx + 2] = 0;
      pixels[idx + 3] = 255;
    }
  }
}

function draw_line() {
  if (x0 > x1) {
    t = x0;
    x0 = x1;
    x1 = t;

    t = y0;
    y0 = y1;
    y1 = t;
  }

  dx = x1 - x0;
  dy = y1 - y0;

  a = dy / dx;
  b = y0 - a * x0;

  set_pixel(x0, y0, a);
}
