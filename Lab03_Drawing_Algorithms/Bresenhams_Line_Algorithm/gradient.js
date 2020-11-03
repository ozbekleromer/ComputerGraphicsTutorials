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
  // for each pixel in the canvas calculate colors
  for (x = 0; x < 512; x++) {
    for (y = 0; y < 512; y++) {
      //Calculate pixel position in matrix
      idx = (y * 512 + x) * 4;
      //Calculate distance between pixel and line
      dxy = a * (x - x0) - (y - y0);

      //Above the line increase green value
      if (dxy < 0) {
        pixels[idx] = -dxy;
        pixels[idx + 1] = 0;
      } else { //Under the line increase red value
        pixels[idx] = 0;
        pixels[idx + 1] = dxy;
      }
      pixels[idx + 2] = 0;
      pixels[idx + 3] = 255;
    }
  }
}

function draw_line() {
  // Make always x0 smaller one
  if (x0 > x1) {
    t = x0;
    x0 = x1;
    x1 = t;

    t = y0;
    y0 = y1;
    y1 = t;
  }

  //Calculate variables
  dx = x1 - x0;
  dy = y1 - y0;

  a = dy / dx;
  b = y0 - a * x0;

  set_pixel(x0, y0, a);
}
