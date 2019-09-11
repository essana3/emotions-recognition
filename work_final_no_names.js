//--------------------------------------------------------------//
const video = document.querySelector("video");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const ctx = document.getElementById("chart").getContext("2d");

// Set canvas width and height after loading video metadata
video.addEventListener("loadedmetadata", function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});
//--------------------------------------------------------------//

const videoId = 22;
const videoUrl = "https://fabskill.com/assets/video/pitch/5892.mp4";

let frameRate, emotionData;
const init = async () => {
  const emotions = await $.get(`http://52.47.113.172:5007/${videoId}/0/video`);

  frameRate = Math.ceil(emotions.fps);
  emotionData = emotions.data;
  console.log(emotions);
};

init().then(() => {
  video.src = videoUrl;

  const padding = 40;
  const padding_top = 20;
  const forehead2nose = 50;

  const percentageSign = x => {
    return (x * 100).toFixed(2) + "%";
  };

  const getRectPosition = ({landmarks}) => {
    const x = landmarks["16"].x + padding_top;
    const y = landmarks["27"].y - forehead2nose - padding;
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

  const writeLabels = ({y, left}) => {
    c.textAlign = "left";
    c.fillStyle = "white";
    c.fillText("Neutre", left, y + padding_top);
    c.fillText("Bonheur", left, y + padding_top * 2);
    c.fillText("Surprise", left, y + padding_top * 3);
    c.fillText("Tristesse", left, y + padding_top * 4);
    c.fillText("Peur", left, y + padding_top * 5);
    c.fillText("Dégoût", left, y + padding_top * 6);
    c.fillText("Colère", left, y + padding_top * 7);
  };

  const updateEmotions = ({prediction}, {y, right}) => {
    c.textAlign = "right";
    c.fillText(percentageSign(prediction.neutral), right, y + padding_top);
    c.fillText(percentageSign(prediction.happy), right, y + padding_top * 2);
    c.fillText(percentageSign(prediction.surprise), right, y + padding_top * 3);
    c.fillText(percentageSign(prediction.angry), right, y + padding_top * 4);
    c.fillText(percentageSign(prediction.disgust), right, y + padding_top * 5);
    c.fillText(percentageSign(prediction.fear), right, y + padding_top * 6);
    c.fillText(percentageSign(prediction.sad), right, y + padding_top * 7);
  };

  const traceLine = ({landmarks}, {x, y}) => {
    const middleX =
      landmarks["0"].x + (landmarks["16"].x - landmarks["0"].x) / 2;
    const middleY = landmarks["27"].y - forehead2nose;
    c.beginPath();
    c.moveTo(middleX, middleY);
    c.lineTo(middleX + padding, middleY - padding);
    c.lineTo(x, y);
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

  const average = (values) => {
    for (let i = 0; i < 7; i++)
      emotions[i] = (emotions[i] * counter + values[i]) / (counter + 1);
    counter++;
  };

  const statChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Colère', 'Dégoût', 'Peur', 'Bonheur',
        'Neutre', 'Tristesse', 'Surprise'
      ],
      datasets: [{
        label: "Analyse Emotionnelle",
        backgroundColor: [
          "#D62838", "#23CE6B", "#0C090D", "#F9C22E",
          "#474A48", "#052F5F", "#D90368"
        ],
        data: [0, 0, 0, 0, 0, 0, 0]
      }]
    },
    options: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Analyse Emotionnelle'
      }
    }
  });

  // start
  let currentFrame, data, oldData, counter = 2;
  let emotions = statChart.data.datasets[0].data;

  video.addEventListener("play", function () {
    let $this = this; // cache

    function loop() {
      if (!$this.paused && !$this.ended) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.font = "16px Arial";

        currentFrame = Math.floor(video.currentTime * frameRate);
        data = emotionData[currentFrame];

        if (currentFrame % 15 === 0) {
          oldData = data;
        }

        for (let i = 0; i < data.length; i++) {
          const rectPosition = getRectPosition(data[i]);
          const values = Object.values(data[i].prediction);
          drawLandmarks(data[i]);
          writeLabels(rectPosition);
          traceLine(data[i], rectPosition);
          if (oldData[i])
            updateEmotions(oldData[i], rectPosition);
          else
            updateEmotions(data[i], rectPosition);

          if (values.length)
            average(values);

          statChart.update();
        }
        requestAnimationFrame(loop);
      }
    }
    loop();
  });

  video.addEventListener("ended", function () {
    c.clearRect(0, 0, canvas.width, canvas.height);
  });
});
