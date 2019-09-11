const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const landmarks = {
  0: {'x': 347, 'y': 287},
  1: {'x': 356, 'y': 310},
  2: {'x': 367, 'y': 332},
  3: {'x': 379, 'y': 352},
  4: {'x': 396, 'y': 369},
  5: {'x': 415, 'y': 383},
  6: {'x': 438, 'y': 394},
  7: {'x': 463, 'y': 401},
  8: {'x': 486, 'y': 397},
  9: {'x': 506, 'y': 384},
  10: {'x': 519, 'y': 362},
  11: {'x': 531, 'y': 340},
  12: {'x': 538, 'y': 316},
  13: {'x': 540, 'y': 292},
  14: {'x': 538, 'y': 269},
  15: {'x': 532, 'y': 246},
  16: {'x': 526, 'y': 223},
  17: {'x': 364, 'y': 282},
  18: {'x': 376, 'y': 274},
  19: {'x': 390, 'y': 268},
  20: {'x': 407, 'y': 265},
  21: {'x': 425, 'y': 266},
  22: {'x': 448, 'y': 255},
  23: {'x': 459, 'y': 245},
  24: {'x': 472, 'y': 236},
  25: {'x': 487, 'y': 229},
  26: {'x': 503, 'y': 229},
  27: {'x': 442, 'y': 271},
  28: {'x': 448, 'y': 287},
  29: {'x': 454, 'y': 303},
  30: {'x': 460, 'y': 319},
  31: {'x': 445, 'y': 329},
  32: {'x': 454, 'y': 331},
  33: {'x': 464, 'y': 331},
  34: {'x': 471, 'y': 324},
  35: {'x': 477, 'y': 316},
  36: {'x': 389, 'y': 293},
  37: {'x': 397, 'y': 289},
  38: {'x': 407, 'y': 284},
  39: {'x': 419, 'y': 282},
  40: {'x': 410, 'y': 289},
  41: {'x': 400, 'y': 293},
  42: {'x': 464, 'y': 264},
  43: {'x': 470, 'y': 259},
  44: {'x': 480, 'y': 256},
  45: {'x': 491, 'y': 253},
  46: {'x': 483, 'y': 260},
  47: {'x': 474, 'y': 263},
  48: {'x': 431, 'y': 353},
  49: {'x': 445, 'y': 350},
  50: {'x': 458, 'y': 344},
  51: {'x': 468, 'y': 343},
  52: {'x': 474, 'y': 338},
  53: {'x': 485, 'y': 333},
  54: {'x': 498, 'y': 328},
  55: {'x': 491, 'y': 345},
  56: {'x': 483, 'y': 356},
  57: {'x': 475, 'y': 361},
  58: {'x': 465, 'y': 365},
  59: {'x': 450, 'y': 364},
  60: {'x': 437, 'y': 354},
  61: {'x': 460, 'y': 349},
  62: {'x': 470, 'y': 347},
  63: {'x': 477, 'y': 343},
  64: {'x': 493, 'y': 332},
  65: {'x': 479, 'y': 347},
  66: {'x': 471, 'y': 351},
  67: {'x': 462, 'y': 354}
};

const drawLine = (start, end) => {
  c.lineTo(start.x, start.y);
  c.lineTo(end.x, end.y);
};

const drawLandmarks = (lm) => {
  c.strokeStyle = "black";
  c.beginPath();
  // Chin
  c.moveTo(lm['0'].x, lm['0'].y);
  drawLine(lm['1'], lm['2']);
  drawLine(lm['3'], lm['4']);
  drawLine(lm['5'], lm['6']);
  drawLine(lm['7'], lm['8']);
  drawLine(lm['9'], lm['10']);
  drawLine(lm['11'], lm['12']);
  drawLine(lm['13'], lm['14']);
  drawLine(lm['15'], lm['16']);
  // Forehead
  c.moveTo(lm['0'].x, lm['0'].y);
  drawLine(lm['17'], lm['18']);
  drawLine(lm['19'], lm['20']);
  drawLine(lm['21'], lm['27']);
  drawLine(lm['22'], lm['23']);
  drawLine(lm['24'], lm['25']);
  drawLine(lm['26'], lm['16']);
  // Eyes + Nose
  c.moveTo(lm['39'].x, lm['39'].y);
  drawLine(lm['40'], lm['41']);
  drawLine(lm['36'], lm['37']);
  drawLine(lm['38'], lm['39']);
  drawLine(lm['21'], lm['22']);
  drawLine(lm['42'], lm['43']);
  drawLine(lm['44'], lm['45']);
  drawLine(lm['46'], lm['47']);
  drawLine(lm['42'], lm['27']);
  drawLine(lm['28'], lm['29']);
  c.lineTo(lm['30'].x, lm['30'].y);
  drawLine(lm['31'], lm['32']);
  drawLine(lm['33'], lm['34']);
  drawLine(lm['35'], lm['33']);
  drawLine(lm['30'], lm['32']);
  drawLine(lm['34'], lm['30']);
  drawLine(lm['35'], lm['29']);
  c.lineTo(lm['31'].x, lm['31'].y);
  // Mouth Outline
  c.moveTo(lm['48'].x, lm['48'].y);
  drawLine(lm['49'], lm['50']);
  drawLine(lm['51'], lm['52']);
  drawLine(lm['53'], lm['54']);
  drawLine(lm['55'], lm['56']);
  drawLine(lm['57'], lm['58']);
  drawLine(lm['59'], lm['60']);
  drawLine(lm['61'], lm['62']);
  drawLine(lm['63'], lm['64']);
  drawLine(lm['65'], lm['66']);
  drawLine(lm['67'], lm['60']);
  c.lineTo(lm['48'].x, lm['48'].y);
  // Lips
  c.moveTo(lm['53'].x, lm['53'].y);
  drawLine(lm['63'], lm['52']);
  drawLine(lm['62'], lm['51']);
  drawLine(lm['61'], lm['49']);
  drawLine(lm['59'], lm['67']);
  drawLine(lm['58'], lm['66']);
  drawLine(lm['57'], lm['65']);
  c.lineTo(lm['56'].x, lm['56'].y);
  c.moveTo(lm['65'].x, lm['65'].y);
  drawLine(lm['55'], lm['64']);
  drawLine(lm['54'], lm['35']);
  drawLine(lm['53'], lm['34']);
  drawLine(lm['52'], lm['33']);
  drawLine(lm['51'], lm['32']);
  drawLine(lm['50'], lm['31']);
  drawLine(lm['49'], lm['48']);
  c.lineTo(lm['31'].x, lm['31'].y);
  // Cheeks
  c.moveTo(lm['45'].x, lm['45'].y);
  drawLine(lm['14'], lm['46']);
  drawLine(lm['35'], lm['47']);
  drawLine(lm['29'], lm['42']);
  drawLine(lm['28'], lm['39']);
  drawLine(lm['29'], lm['40']);
  drawLine(lm['31'], lm['41']);
  drawLine(lm['2'], lm['36']);
  // Rest of the Face
  c.moveTo(lm['27'].x, lm['27'].y);
  drawLine(lm['39'], lm['20']);
  drawLine(lm['38'], lm['19']);
  drawLine(lm['37'], lm['18']);
  drawLine(lm['36'], lm['17']);
  c.moveTo(lm['36'].x, lm['36'].y);
  c.lineTo(lm['0'].x, lm['0'].y);
  c.moveTo(lm['1'].x, lm['1'].y);
  drawLine(lm['36'], lm['2']);
  drawLine(lm['31'], lm['3']);
  drawLine(lm['48'], lm['4']);
  drawLine(lm['60'], lm['5']);
  drawLine(lm['59'], lm['6']);
  drawLine(lm['58'], lm['7']);
  drawLine(lm['57'], lm['8']);
  drawLine(lm['56'], lm['9']);
  drawLine(lm['55'], lm['10']);
  drawLine(lm['54'], lm['11']);
  c.moveTo(lm['12'].x, lm['12'].y);
  drawLine(lm['54'], lm['13']);
  drawLine(lm['35'], lm['14']);
  drawLine(lm['45'], lm['15']);
  c.moveTo(lm['16'].x, lm['16'].y);
  drawLine(lm['45'], lm['26']);
  drawLine(lm['44'], lm['25']);
  drawLine(lm['43'], lm['24']);
  c.moveTo(lm['43'].x, lm['43'].y);
  drawLine(lm['23'], lm['42']);
  c.lineTo(lm['22'].x, lm['22'].y);
  // c.stroke();

  // Face Pointer
  const middleX = landmarks['0'].x + (landmarks['16'].x - landmarks['0'].x) / 2;
  const middleY = landmarks['27'].y - 70;
  c.moveTo(middleX, middleY);
  c.lineTo(middleX + 40, middleY - 40);
  c.lineTo(middleX + 100, middleY - 40);
  c.stroke();
};

drawLandmarks(landmarks);
