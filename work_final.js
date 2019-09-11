//--------------------------------------------------------------//
const video = document.querySelector("video");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const chartCanvas = document.getElementById("chart");
const ctx = chartCanvas.getContext("2d");

const time = document.getElementById("seek");

// Set canvas width and height after loading video metadata
video.addEventListener("loadedmetadata", function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});
//--------------------------------------------------------------//

const videoId = 44;
const testId = 42;
const videoUrl = "./assets/2/2.1.2.mp4";
const testVideo = "./assets/test2.mp4";

let frameRate, emotionData;
const init = async () => {
  // const emotions = await $.get(`http://52.47.113.172:5008/${videoId}/0/video`);
  const emotions = await $.get(`http://52.47.113.172:5008/${testId}/0/video`);

  frameRate = Math.ceil(emotions.fps);
  emotionData = emotions.data;
  console.log(emotions);
};

init().then(() => {
  video.src = testVideo;
  // video.src = videoUrl;

  const padding = 40;
  const padding_top = 20;
  const forehead2nose = 50;

  const h = 175;
  const minWidth = 156;

  const logo = new Image();
  logo.src = "./assets/logo.png";
  const dim = 380;

  const percentageSign = x => {
    return (x * 100).toFixed(2) + "%";
  };

  const getRectPosition = ({landmarks, name}) => {
    c.font = "bold 14px Arial";
    const x = landmarks["33"].x + padding * 3;
    const y = landmarks["27"].y - forehead2nose - padding - padding_top;
    const textWidth = c.measureText(name.toUpperCase()).width + 6;
    const w = textWidth > minWidth ? textWidth : minWidth;
    c.restore();

    let textRightX, textLeftX, textCenterX;
    // style and draw emotions rectangle
    c.fillStyle = "rgba(69, 69, 69, .5)";
    c.fillRect(x, y, w, h);
    textRightX = x + w - 3;
    textLeftX = x + 3;
    textCenterX = x + w / 2;

    chartCanvas.style.top = landmarks["33"].y - 120 + "px";
    chartCanvas.style.left = landmarks["33"].x - 650 + "px";

    c.fillStyle = "white";
    c.beginPath();
    c.moveTo(x, y + 30);
    c.lineTo(x + w, y + 30);
    c.stroke();
    c.closePath();

    return {
      x: x,
      y: y,
      right: textRightX,
      left: textLeftX,
      center: textCenterX
    };
  };

  const writeLabels = ({y, left}) => {
    c.textAlign = "left";
    c.fillStyle = "white";
    c.font = "16px Arial";
    c.fillText("Neutre", left, y + padding_top * 2.5);
    c.fillText("Bonheur", left, y + padding_top * 3.5);
    c.fillText("Surprise", left, y + padding_top * 4.5);
    c.fillText("Tristesse", left, y + padding_top * 5.5);
    c.fillText("Peur", left, y + padding_top * 6.5);
    c.fillText("Dégoût", left, y + padding_top * 7.5);
    c.fillText("Colère", left, y + padding_top * 8.5);
  };

  const updateEmotions = ({prediction, name}, {y, right, center}) => {
    c.textAlign = "center";
    c.font = "bold 14px Arial";
    c.fillText(name.toUpperCase(), center, y + padding_top);

    c.font = "16px Arial";
    c.textAlign = "right";
    c.fillText(percentageSign(prediction.neutral), right, y + padding_top * 2.5);
    c.fillText(percentageSign(prediction.happy), right, y + padding_top * 3.5);
    c.fillText(percentageSign(prediction.surprise), right, y + padding_top * 4.5);
    c.fillText(percentageSign(prediction.sad), right, y + padding_top * 5.5);
    c.fillText(percentageSign(prediction.disgust), right, y + padding_top * 6.5);
    c.fillText(percentageSign(prediction.fear), right, y + padding_top * 7.5);
    c.fillText(percentageSign(prediction.angry), right, y + padding_top * 8.5);
  };

  const traceLine = ({landmarks}, {x, y}) => {
    const middleX =
      landmarks["0"].x + (landmarks["16"].x - landmarks["0"].x) / 2;
    const middleY = landmarks["27"].y - forehead2nose;
    c.beginPath();
    c.moveTo(middleX, middleY);
    c.lineTo(middleX + padding, middleY - padding);
    c.lineTo(x, y + padding_top);
    c.stroke();
  };

  const drawLine = (start, end) => {
    c.lineTo(start.x, start.y);
    c.lineTo(end.x, end.y);
  };

  const drawLandmarks = ({landmarks}) => {
    c.strokeStyle = "white";
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
    drawLine(landmarks["54"], landmarks["35"]);
    drawLine(landmarks["53"], landmarks["34"]);
    drawLine(landmarks["52"], landmarks["33"]);
    drawLine(landmarks["51"], landmarks["32"]);
    drawLine(landmarks["50"], landmarks["31"]);
    drawLine(landmarks["49"], landmarks["48"]);
    c.lineTo(landmarks["31"].x, landmarks["31"].y);
    // Cheeks
    c.moveTo(landmarks["45"].x, landmarks["45"].y);
    drawLine(landmarks["14"], landmarks["46"]);
    drawLine(landmarks["35"], landmarks["47"]);
    drawLine(landmarks["29"], landmarks["42"]);
    drawLine(landmarks["28"], landmarks["39"]);
    drawLine(landmarks["29"], landmarks["40"]);
    drawLine(landmarks["31"], landmarks["41"]);
    drawLine(landmarks["2"], landmarks["36"]);
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

  const average = (dataset, values) => {
    for (let i = 0; i < 7; i++)
      dataset[i] += values[i];
  };

  const footer = () => {
    const titleX = video.videoWidth / 2;
    const titleY = video.videoHeight - padding_top * 2;
    c.font = "bold 60px Arial";
    c.fillStyle = "white";
    c.textAlign = "center";
    c.fillText("WWW.FABSKILL.COM", titleX, titleY);
  };

  const drawLogo = () => {
    ctx.drawImage(logo, logoX, logoY, dim, dim);
  };

  const hex2rgb = (color) => {
    return {
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16)
    }
  };

  const averageEmotionsPerFrame = (currentFrame, framesCount) => {
    const emotions = {
      angry: 0,
      disgust: 0,
      fear: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      surprise: 0
    };
    for (let i = 0; i < framesCount; i++)
      if (currentFrame - i >= 0)
        for (let property in emotionData[currentFrame - i][0].prediction)
          if (emotionData[currentFrame - i][0].prediction.hasOwnProperty(property))
            emotions[property] += emotionData[currentFrame - i][0].prediction[property];

    for (let property in emotions)
      if (emotions.hasOwnProperty(property))
        emotions[property] = emotions[property] / framesCount;

    return emotions;
  };

  Chart.pluginService.register({
    beforeDraw: function (chart) {
      const chartArea = chart.chartArea;
      logoX = (chartArea.right - chartArea.left) / 2 - dim / 2;
      logoY = (chartArea.bottom - chartArea.top) / 2 - 115;
    }
  });

  const statChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Colère', 'Dégoût', 'Peur', 'Bonheur',
        'Neutre', 'Tristesse', 'Surprise'
      ],
      datasets: [
        {
          borderColor: "rgba(69, 69, 69, .5)",
          backgroundColor: [
            "#D40000", "#FF54FF", "#000000", "#FFE854",
            "#66666E", "#5151FF", "#57B9F9"
          ],
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    },
    options: {
      plugins: {
        labels: [
          {
            render: "label",
            fontColor: "white",
            fontSize: 50,
            fontStyle: "bold",
            position: "outside"
          },
          {
            render: function (args) {
              if (args.percentage > 3)
                return args.percentage + "%";
            },
            fontStyle: 'bold',
            fontSize: 48,
            fontColor: data => {
              const rgb = hex2rgb(data.dataset.backgroundColor[data.index]);
              const threshold = 140;
              const luminance = rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
              return luminance > threshold ? 'black' : 'white';
            },
            precision: 2
          }
        ]
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        position: 'bottom',
        text: 'Moyenne des Émotions',
        fontSize: 50,
        fontColor: "white"
      },
      chartArea: {
        backgroundColor: "rgba(69, 69, 69, 0)"
      }
    }
  });

  // start
  let currentFrame, data, oldData, logoX, logoY;
  const cuts211 = [1, 3600, 6900, 10200, 13500, 16950, 20250, 23550, 26700];
  const cuts212 = [1, 3300, 6300, 9300, 12600, 15600, 18900, 21900, 25200];
  video.addEventListener("play", function () {
    let $this = this; // cache

    function loop() {
      if (!$this.paused && !$this.ended) {
        c.clearRect(0, 0, canvas.width, canvas.height);

        currentFrame = Math.floor(video.currentTime * frameRate);
        data = emotionData[currentFrame];

        if (cuts.includes(currentFrame)) {
          statChart.data.datasets = [];
          statChart.data.datasets.push({
            borderColor: "transparent",
            backgroundColor: [
              "#D62838", "#23CE6B", "#0C090D", "#F9C22E",
              "#474A48", "#052F5F", "#D90368"
            ],
            data: [0, 0, 0, 0, 0, 0, 0]
          });
          statChart.update();
        }

        if (data.length === 1) {
          if (data[0].landmarks["16"].x - data[0].landmarks["0"].x > 80) {
            chartCanvas.style.visibility = "visible";

            if (currentFrame % 30 === 0) {
              oldData = data;
              // oldData.prediction = averageEmotionsPerFrame(currentFrame, 30);
            }

            const rectPosition = getRectPosition(data[0]);
            const values = Object.values(data[0].prediction);

            drawLandmarks(data[0]);
            writeLabels(rectPosition);
            traceLine(data[0], rectPosition);
            average(statChart.data.datasets[0].data, values);
            if (oldData !== undefined)
              updateEmotions(oldData[0], rectPosition);
            else
              updateEmotions(data[0], rectPosition);
            drawLogo();
            footer();

            statChart.update();
          } else
            chartCanvas.style.visibility = "hidden";
        } else {
          chartCanvas.style.visibility = "hidden";
        }

        requestAnimationFrame(loop);
      }
    }

    loop();
  });

  video.addEventListener("ended", function () {
    canvas.style.visibility = "hidden";
    chartCanvas.style.visibility = "hidden";
  });
});
