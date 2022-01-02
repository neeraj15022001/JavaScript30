const playButton = document.querySelector(".player__button.toggle");
const video = document.querySelector(".player__video");
const inputs = document.querySelectorAll(".player__slider");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const seekButtons = document.querySelectorAll(".player__button");
let isMouseDown = false;

function play() {
  console.log("playing/pausing");
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  playButton.textContent = video.paused ? "▶" : "▐ ▌";
}

function handleChange(e) {
  const value = e.target.value;
  const name = this.name;
  if (name === "volume") {
    video.volume = value;
  } else if (name === "playbackRate") {
    video.playbackRate = value;
  }
}

function handleSeek() {
  const length = this.dataset.skip;
  if (video.currentTime < video.duration) {
    if (length === "-10") {
      video.currentTime -= 10;
    } else if (length === "25") {
      video.currentTime += 25;
    }
  }
}

function fullScreen() {
  video
    .requestFullscreen()
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
}

function updateProgressBar() {
  progressFilled.style.flexBasis = `${
    (video.currentTime / video.duration) * 100
  }%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

inputs.forEach((input) => {
  input.addEventListener("change", handleChange);
});

seekButtons.forEach((button) => {
  button.addEventListener("click", handleSeek);
});

progress.addEventListener("click", scrub);
playButton.addEventListener("click", play);
video.addEventListener("timeupdate", updateProgressBar);
video.addEventListener("click", play);
video.addEventListener("dblclick", fullScreen);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
progress.addEventListener("mousemove", isMouseDown && scrub);
progress.addEventListener("mousedown", () => (isMouseDown = true));
progress.addEventListener("mouseup", () => (isMouseDown = false));
