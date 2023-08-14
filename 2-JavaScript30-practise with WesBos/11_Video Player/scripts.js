// Element
const player = document.querySelector('.player');
// here below inside player
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// functions
const togglePlay = () => {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // video.paused ? video.play() : video.pause();
};
const updateBtn = () => {
    const icon = this.paused ? '►' : '❚ ❚'; //here is a problem, in console icon play is not log, and 
    console.log('Update the btn');
    console.log(icon);
    toggle.textContent = icon;
};
// hook listeners 
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
toggle.addEventListener('click', togglePlay);