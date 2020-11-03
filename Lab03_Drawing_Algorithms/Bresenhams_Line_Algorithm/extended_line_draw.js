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

function set_pixel(x, y, c) {
  idx = (y * 512 + x) * 4;
  pixels[idx] = c;
  pixels[idx + 1] = c;
  pixels[idx + 2] = c;
  pixels[idx + 3] = 255;
}

function draw_line() {
  //Calculate variables
  dx = Math.abs(x1 - x0);
  dy = Math.abs(y1 - y0);

  // Check if the line is between 0 and 45 degree 
  if (dy < dx) {
    //Calculate variables
    dp = 2 * dy - dx;
    deq = 2 * dy;
    dinc = 2 * dy - 2 * dx;

    d = dp;

    // Calculate y for each x and draw the line
    for (x = x0, y = y0; x != x1;) {

      if (d < 0) {
        d += deq;
      } else {
        d += dinc;
        if (y0 < y1) y++;
        else y--;
      }

      if (x0 < x1) x++;
      else x--;

      set_pixel(x, y, 0);
    }
  } else { // Check if the line is between 45 and 90 degree 
    //Calculate variables
    dp = 2 * dx - dy;
    deq = 2 * dx;
    dinc = 2 * dx - 2 * dy;

    d = dp;
    // Calculate x for each y and draw the line
    for (x = x0, y = y0; y != y1;) {

      if (d < 0) {
        d += deq;
      } else {
        d += dinc;
        if (x0 < x1) x++;
        else x--;
      }

      if (y0 < y1) y++;
      else y--;

      set_pixel(x, y, 0);
    }
  }
}
