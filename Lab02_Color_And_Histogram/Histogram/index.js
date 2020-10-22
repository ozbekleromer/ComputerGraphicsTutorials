function preload() {
  img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
  createCanvas(256, 256);
  //img.resize(256, 256);

  img.filter('gray');

  max = 0;
  var arr = new Array(256);
  arr.fill(0);

  img.loadPixels();

  //Count brightnesses
  for (x = 0; x < img.width; x++) {
    for (y = 0; y < img.height; y++) {
      pos = 4 * (y * img.width + x);

      arr[img.pixels[pos]]++;
      if (max < arr[img.pixels[pos]] && img.pixels[pos] != 0)
        max = arr[img.pixels[pos]];
    }
  }
  
	// Initialize the draw basics
  background(255);
  stroke(0);
  strokeWeight(1);

	//Draw Histogram
  for (i = 1; i < 256; i++) {
    arr[i] = floor(arr[i] / max * 255);
    line(i, 255, i, 255 - arr[i]);
  }


  console.log(arr[0]);

  noLoop();
}
