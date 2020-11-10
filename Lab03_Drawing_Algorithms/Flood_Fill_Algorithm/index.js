function setup() {
  createCanvas(512, 512);
  background(255);
}
var last_x = -1;
var last_y = -1;

function mouseDragged() {
  if (mouseButton != LEFT) return;
  if (last_x > 0) {
    line(last_x, last_y, mouseX, mouseY);
  }
  last_x = mouseX;
  last_y = mouseY;
}

function mouseReleased() {
  last_x = last_y = -1;
  if (mouseButton == RIGHT) {
    loadPixels();
    flood_fill(mouseX, mouseY);
    updatePixels();
  }
}

function set_pixel(x, y, c) {
  idx = (y * 512 + x) * 4;
  pixels[idx] = c;
  pixels[idx + 1] = c;
  pixels[idx + 2] = c;
  pixels[idx + 3] = 255;
}

function get_pixel(x, y) {
  idx = (y * 512 + x) * 4;
  return pixels[idx];
}

//fill this function
function flood_fill(x, y) {
  x0 = Math.round(x0);
  x1 = Math.round(x1);
  y0 = Math.round(y0);
  y1 = Math.round(y1);
  //  Push the mouse position to stack
  y = floor(y);
  x = floor(x);

  stack = [];
  stack.push([x, y]);

  //Until filling whole section repeat
  while (stack.length > 0) {
    // Get the last point
    [x, y] = stack.pop();

    // Check if it is in the canvas
    if (x < 0 || x > 512 || y < 0 || y > 512) continue;

    // Check if it is not colored
    pixel = get_pixel(x, y);
    if (pixel != 255) continue;

    // Fill the pixel with color
    set_pixel(x, y, 150);

    // Add all the neighbors of the pixel to stack
    stack.push([x + 1, y]);
    stack.push([x, y + 1]);
    stack.push([x - 1, y]);
    stack.push([x, y - 1]);
  }
}
