var imgA;
var imgB;

var operation1;
var operation2;
var operation3;

var op1var1;
var op1var2;
var op2var1;
var op2var2;
var op3var1;
var op3var2;

function setup() {
  createCanvas(512, 512);
  background(255);
  imgA = createImage(512, 512);
  imgB = createImage(512, 512);
  imgA.loadPixels();
  imgB.loadPixels();
  var d = pixelDensity();
  for (var i = 0; i < 512 * 512 * 4 * d; i += 4) {
    imgA.pixels[i] = 240;
    imgA.pixels[i + 1] = 250;
    imgA.pixels[i + 2] = 240;
    imgA.pixels[i + 3] = 255;
    imgB.pixels[i] = 240;
    imgB.pixels[i + 1] = 240;
    imgB.pixels[i + 2] = 250;
    imgB.pixels[i + 3] = 255;
  }
  imgA.updatePixels();
  imgB.updatePixels();

  operation1 = makeIdentity;
  operation2 = makeIdentity;
  operation3 = makeIdentity;
}

function draw() {
  if (!keyIsDown(32)) {
    image(imgA, 0, 0);
    text('Image A', 10, 20);
  } else {
    image(imgB, 0, 0);
    text('Image B', 10, 20);
  }
}

function makeVector(x, y) {
  var vec = [x, y, 1];
  return vec;
}

function drawVector(img, vec) {
  img.set(vec[0], vec[1], 0);
  img.updatePixels();
}

function mouseDragged() {
  var x = round(mouseX);
  var y = round(mouseY);
  var vecA = makeVector(x, y);
  drawVector(imgA, vecA);
  var vecB = serialTransformation(vecA, operation1(op1var1, op1var2), operation2(op2var1, op2var2), operation3(op3var1, op3var2));
  //var vecB = serialTransformation(vecA, makeScaling(3, 3), makeTranslation(50, 50), makeRotation(30));
  //var vecB = serialTransformation(vecA, makeTranslation(50, 50), makeIdentity(), makeIdentity());
  //var vecB = serialTransformation(vecA, makeIdentity(), makeIdentity(), makeIdentity());
  drawVector(imgB, vecB);
}

function makeIdentity() {
  var identityM = [];
  for (var i = 0; i < 3; i++) {
    identityM[i] = [];
    for (var j = 0; j < 3; j++) {
      if (i == j) identityM[i][j] = 1;
      else identityM[i][j] = 0;
    }
  }
  return identityM;
}

function makeTranslation(tx, ty) {
  var translationM = [];
  for (var i = 0; i < 3; i++) {
    translationM[i] = [];
    for (var j = 0; j < 3; j++) {
      if (i == j) translationM[i][j] = 1;
      else if (i == 0 && j == 2) translationM[i][j] = tx;
      else if (i == 1 && j == 2) translationM[i][j] = ty;
      else translationM[i][j] = 0;
    }
  }
  return translationM;
}

function makeScaling(sx, sy) {
  var scalingM = [];
  for (var i = 0; i < 3; i++) {
    scalingM[i] = [];
    for (var j = 0; j < 3; j++) {
      if (i == 0 && j == 0) scalingM[i][j] = sx;
      else if (i == 1 && j == 1) scalingM[i][j] = sy;
      else if (i == j) scalingM[i][j] = 1;
      else scalingM[i][j] = 0;
    }
  }
  return scalingM;
}

function makeRotation(degree) {
  var rotationM = [];
  var radian = degree / 180 * Math.PI;
  for (var i = 0; i < 3; i++) {
    rotationM[i] = [];
    for (var j = 0; j < 3; j++) {
      if (i == 0 && j == 0) rotationM[i][j] = Math.cos(radian);
      else if (i == 0 && j == 1) rotationM[i][j] = -Math.sin(radian);
      else if (i == 1 && j == 0) rotationM[i][j] = Math.sin(radian);
      else if (i == 1 && j == 1) rotationM[i][j] = Math.cos(radian);
      else if (i == j) rotationM[i][j] = 1;
      else rotationM[i][j] = 0;
    }
  }
  return rotationM;
}

function makeShear(shx, shy) {
  var shearM = [];
  for (var i = 0; i < 3; i++) {
    shearM[i] = [];
    for (var j = 0; j < 3; j++) {
      if (i == j) shearM[i][j] = 1;
      else if (i == 0 && j == 1) shearM[i][j] = shx;
      else if (i == 1 && j == 0) shearM[i][j] = shy;
      else shearM[i][j] = 0;
    }
  }
  return shearM;
}

function multiplication(matrix, vec) {
  var newVec = [];
  for (var i = 0; i < 3; i++) {
    newVec[i] = 0;
    for (var j = 0; j < 3; j++) {
      newVec[i] += matrix[i][j] * vec[j];
    }
    newVec[i] = round(newVec[i]);
  }
  return newVec;
}

function serialTransformation(vec, ...args) {
  var matrix = args[args.length - 1];
  //console.log(matrix);
  for (var i = args.length - 2; i >= 0; i--) {
    var result = [];
    for (var j = 0; j < matrix.length; j++) {
      result[j] = [];
      for (var k = 0; k < args[0][0].length; k++) {
        result[j][k] = 0;
        for (var l = 0; l < matrix[0].length; l++) {
          result[j][k] += matrix[j][l] * args[i][l][k];
        }
      }
    }
    //console.log(result);
    matrix = result;
  }

  var newVec = multiplication(matrix, vec);
  return newVec;
}

function change() {
  operation1 = assignFuntion(document.getElementById("operation1").value);
  operation2 = assignFuntion(document.getElementById("operation1").value);
  operation3 = assignFuntion(document.getElementById("operation1").value);

  op1var1 = document.getElementById("op1val1").value;
  op1var2 = document.getElementById("op1val2").value;
  op2var1 = document.getElementById("op2val1").value;
  op2var2 = document.getElementById("op2val2").value;
  op3var1 = document.getElementById("op3val1").value;
  op3var2 = document.getElementById("op3val2").value;

  if (nameValue == "rotate") alert("Rotate");
}

function assignFuntion(functionName) {
  switch (functionName) {
    case "identity":
      return makeIdentity;
    case "rotate":
      return makeRotation;
    case "transform":
      return makeTranslation;
    case "scale":
      return makeScaling;
    case "shear":
      return makeShear;
  }
}

function resetAll() {
  var d = pixelDensity();
  for (var i = 0; i < 512 * 512 * 4 * d; i += 4) {
    imgA.pixels[i] = 240;
    imgA.pixels[i + 1] = 250;
    imgA.pixels[i + 2] = 240;
    imgA.pixels[i + 3] = 255;
    imgB.pixels[i] = 240;
    imgB.pixels[i + 1] = 240;
    imgB.pixels[i + 2] = 250;
    imgB.pixels[i + 3] = 255;
  }
  imgA.updatePixels();
  imgB.updatePixels();

  operation1 = makeIdentity;
  operation2 = makeIdentity;
  operation3 = makeIdentity;
}
