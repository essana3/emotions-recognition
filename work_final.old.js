const PADDING = 10;
const PADDING_TOP = 20;

const percentage = x => {
  return Math.round(x * 100);
};

const percentageSign = x => {
  return `${Math.round(x * 100)}%`;
};

const getRectPosition = frame => {
  const x = frame.x + frame.w + PADDING;
  const y = frame.y - PADDING;
  const w = 130;
  const h = 150;

  let textRightX, textLeftX;
  // style and draw emotions rectangle
  c.fillStyle = "rgba(69, 69, 69, .5)";
  if (x > canvas.width - w) {
    c.fillRect(canvas.width - w, y, w, h);
    textRightX = canvas.width - 3;
    textLeftX = canvas.width - w + 3;
  } else {
    c.fillRect(x, y, w, h);
    textRightX = x + w - 3;
    textLeftX = x + 3;
  }

  return {
    x: x,
    y: y,
    right: textRightX,
    left: textLeftX
  };
};

const drawRectangle = ({ y, left }) => {
  c.fillStyle = "white";
  c.textAlign = "left";
  c.fillText("Neutre", left, y + PADDING_TOP);
  c.fillText("Bonheur", left, y + PADDING_TOP * 2);
  c.fillText("Surprise", left, y + PADDING_TOP * 3);
  c.fillText("Tristesse", left, y + PADDING_TOP * 4);
  c.fillText("Peur", left, y + PADDING_TOP * 5);
  c.fillText("Dégoût", left, y + PADDING_TOP * 6);
  c.fillText("Colère", left, y + PADDING_TOP * 7);
};

const updateEmotions = ({ prediction }, { y, right }) => {
  c.fillStyle = "white";
  c.textAlign = "right";
  c.fillText(percentageSign(prediction.neutral), right, y + PADDING_TOP);
  c.fillText(percentageSign(prediction.happy), right, y + PADDING_TOP * 2);
  c.fillText(percentageSign(prediction.surprise), right, y + PADDING_TOP * 3);
  c.fillText(percentageSign(prediction.angry), right, y + PADDING_TOP * 4);
  c.fillText(percentageSign(prediction.disgust), right, y + PADDING_TOP * 5);
  c.fillText(percentageSign(prediction.fear), right, y + PADDING_TOP * 6);
  c.fillText(percentageSign(prediction.sad), right, y + PADDING_TOP * 7);
};

const traceLine = frame => {
  const rectX = frame.x + frame.w + PADDING;
  const rectY = frame.y - PADDING;
  const angle = 60;

  c.beginPath();
  c.moveTo(rectX, rectY);
  c.lineTo(rectX - angle, rectY);
  c.lineTo(frame.x + frame.w / 2, frame.y + frame.h * 0.1);
  c.stroke();
};

const drawLine = (start, end) => {
  c.lineTo(start.x, start.y);
  c.lineTo(end.x, end.y);
};

const drawLandmarks = ({ landmarks }) => {
  c.strokeStyle = "black";
  c.beginPath();
  // Chin
  c.moveTo(landmarks["0"].x, landmarks["0"].y);
  drawLine(landmarks["1"], landmarks["2"]);
  drawLine(landmarks["3"], landmarks["4"]);
  drawLine(landmarks["5"], landmarks["6"]);
  drawLine(landmarks["7"], landmarks["8"]);
  drawLine(landmarks["9"], landmarks["10"]);
  drawLine(landmarks["11"], landmarks["12"]);
  drawLine(landmarks["13"], landmarks["14"]);
  drawLine(landmarks["15"], landmarks["16"]);
  // Forehead
  c.moveTo(landmarks["0"].x, landmarks["0"].y);
  drawLine(landmarks["17"], landmarks["18"]);
  drawLine(landmarks["19"], landmarks["20"]);
  drawLine(landmarks["21"], landmarks["27"]);
  drawLine(landmarks["22"], landmarks["23"]);
  drawLine(landmarks["24"], landmarks["25"]);
  drawLine(landmarks["26"], landmarks["16"]);
  // Eyes + Nose
  c.moveTo(landmarks["39"].x, landmarks["39"].y);
  drawLine(landmarks["40"], landmarks["41"]);
  drawLine(landmarks["36"], landmarks["37"]);
  drawLine(landmarks["38"], landmarks["39"]);
  drawLine(landmarks["21"], landmarks["22"]);
  drawLine(landmarks["42"], landmarks["43"]);
  drawLine(landmarks["44"], landmarks["45"]);
  drawLine(landmarks["46"], landmarks["47"]);
  drawLine(landmarks["42"], landmarks["27"]);
  drawLine(landmarks["28"], landmarks["29"]);
  c.lineTo(landmarks["30"].x, landmarks["30"].y);
  drawLine(landmarks["31"], landmarks["32"]);
  drawLine(landmarks["33"], landmarks["34"]);
  drawLine(landmarks["35"], landmarks["33"]);
  drawLine(landmarks["30"], landmarks["32"]);
  drawLine(landmarks["34"], landmarks["30"]);
  drawLine(landmarks["35"], landmarks["29"]);
  c.lineTo(landmarks["31"].x, landmarks["31"].y);
  // Mouth Outline
  c.moveTo(landmarks["48"].x, landmarks["48"].y);
  drawLine(landmarks["49"], landmarks["50"]);
  drawLine(landmarks["51"], landmarks["52"]);
  drawLine(landmarks["53"], landmarks["54"]);
  drawLine(landmarks["55"], landmarks["56"]);
  drawLine(landmarks["57"], landmarks["58"]);
  drawLine(landmarks["59"], landmarks["60"]);
  drawLine(landmarks["61"], landmarks["62"]);
  drawLine(landmarks["63"], landmarks["64"]);
  drawLine(landmarks["65"], landmarks["66"]);
  drawLine(landmarks["67"], landmarks["60"]);
  c.lineTo(landmarks["48"].x, landmarks["48"].y);
  // Lips
  c.moveTo(landmarks["53"].x, landmarks["53"].y);
  drawLine(landmarks["63"], landmarks["52"]);
  drawLine(landmarks["62"], landmarks["51"]);
  drawLine(landmarks["61"], landmarks["49"]);
  drawLine(landmarks["59"], landmarks["67"]);
  drawLine(landmarks["58"], landmarks["66"]);
  drawLine(landmarks["57"], landmarks["65"]);
  c.lineTo(landmarks["56"].x, landmarks["56"].y);
  c.moveTo(landmarks["65"].x, landmarks["65"].y);
  drawLine(landmarks["55"], landmarks["64"]);
  c.lineTo(landmarks["54"].x, landmarks["54"].y);
  // Rest of the Face
  c.moveTo(landmarks["27"].x, landmarks["27"].y);
  drawLine(landmarks["39"], landmarks["20"]);
  drawLine(landmarks["38"], landmarks["19"]);
  drawLine(landmarks["37"], landmarks["18"]);
  drawLine(landmarks["36"], landmarks["17"]);
  c.moveTo(landmarks["36"].x, landmarks["36"].y);
  c.lineTo(landmarks["0"].x, landmarks["0"].y);
  c.moveTo(landmarks["1"].x, landmarks["1"].y);
  drawLine(landmarks["36"], landmarks["2"]);
  drawLine(landmarks["31"], landmarks["3"]);
  drawLine(landmarks["48"], landmarks["4"]);
  drawLine(landmarks["60"], landmarks["5"]);
  drawLine(landmarks["59"], landmarks["6"]);
  drawLine(landmarks["58"], landmarks["7"]);
  drawLine(landmarks["57"], landmarks["8"]);
  drawLine(landmarks["56"], landmarks["9"]);
  drawLine(landmarks["55"], landmarks["10"]);
  drawLine(landmarks["54"], landmarks["11"]);

  c.moveTo(landmarks["12"].x, landmarks["12"].y);
  drawLine(landmarks["54"], landmarks["13"]);
  drawLine(landmarks["35"], landmarks["14"]);
  drawLine(landmarks["45"], landmarks["15"]);
  c.moveTo(landmarks["16"].x, landmarks["16"].y);
  drawLine(landmarks["45"], landmarks["26"]);
  drawLine(landmarks["44"], landmarks["25"]);
  drawLine(landmarks["43"], landmarks["24"]);
  c.moveTo(landmarks["43"].x, landmarks["43"].y);
  drawLine(landmarks["23"], landmarks["42"]);
  c.lineTo(landmarks["22"].x, landmarks["22"].y);

  c.stroke();
};

const updateEmotionsChart = input => {
  const emotions = [
    input.prediction.neutral,
    input.prediction.happy,
    input.prediction.surprise,
    input.prediction.sad,
    input.prediction.fear,
    input.prediction.disgust,
    input.prediction.angry
  ];
  emotionChart.data.datasets[0].data = emotions.map(x => percentage(x));
  emotionChart.update();
};

//--------------------------------------------------------------//
const canvas = document.getElementById("emot");
const c = canvas.getContext("2d");

const chartCanvas = document.getElementById("chart");
const ctx = chartCanvas.getContext("2d");

const statCanvas = document.getElementById("stat");
const cts = statCanvas.getContext("2d");

const video = document.querySelector("video");

const image = new Image();
image.src = "./assets/img/square.png";

const emotionChart = new Chart(ctx, {
  type: "horizontalBar",
  data: {
    labels: [
      "Neutre",
      "Bonheur",
      "Surprise",
      "Tristesse",
      "Peur",
      "Dégoût",
      "Colère"
    ],
    datasets: [
      {
        label: "Analyse Emotionelle",
        backgroundColor: [
          "#474A48",
          "#F9C22E",
          "#D90368",
          "#052F5F",
          "#0C090D",
          "#23CE6B",
          "#D62838"
        ]
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            max: 100,
            min: 0,
            stepSize: 10
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ]
    }
  }
});

const statChart = new Chart(cts, {
  type: "line",
  data: {
    labels: Object.keys(emotionData),
    datasets: [
      {
        label: "Neutre",
        backgroundColor: "green",
        data: [],
        pointRadius: 0
      }
    ],
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              display: false
            }
          }
        ]
      }
    }
  }
});

const updateStatChart = frame => {
  const value =
    frame.prediction.neutral +
    frame.prediction.happy -
    frame.prediction.surprise -
    frame.prediction.angry -
    frame.prediction.disgust -
    frame.prediction.fear -
    frame.prediction.sad;
  statChart.data.datasets[0].data.push(value);
  statChart.update();
};
//--------------------------------------------------------------//

// Set canvas width and height after loading video metadata
video.addEventListener("loadedmetadata", function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});

// start
video.addEventListener("play", function() {
  let $this = this; // cache
  let currentFrame, prevFrame, frames, rectPosition;

  function loop() {
    if (!$this.paused && !$this.ended) {
      c.font = "16px Arial";
      currentFrame = Math.floor(video.currentTime * FRAME_RATE);
      frames = emotionData[currentFrame];
      c.drawImage($this, 0, 0);

      for (let frame of frames) {
        c.drawImage(image, frame.x, frame.y, frame.w, frame.h);
        drawLandmarks(frame);
        rectPosition = getRectPosition(frame);
        drawRectangle(rectPosition);
        traceLine(frame);
        if (currentFrame % 15 === 0) {
          prevFrame = frame;
          updateEmotions(frame, rectPosition);
        } else updateEmotions(prevFrame, rectPosition);
      }
      // updateEmotionsChart(frame);
      // updateStatChart(frame);

      requestAnimationFrame(loop);
    }
    if ($this.ended) {
      c.clearRect(0, 0, canvas.width, canvas.height);
      emotionChart.data.datasets[0].data = null;
      emotionChart.update();
    }
  }

  loop();
});
