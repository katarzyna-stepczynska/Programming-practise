let countdown; //sort or higher level variable, global variable
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = seconds => {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now(); //returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. Since now() is a static method of Date, it will always be used as Date.now()
  const then = now + seconds * 1000;
  // console.log({now, then});
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return; //stop function
    }
    // display it
    displayTimeLeft(secondsLeft); // call other function
  }, 1000);
}

const displayTimeLeft = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  // console.log({minutes, remainderSec});
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; // fill last 10 sec with '0'
  document.title = display; // title of page with countdown timer
  timerDisplay.textContent = display;
}

const displayEndTime = timestamp => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  // console.log({end, hour, minutes});
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`; // analogic with code line 31
}

const startTimer = e => {
  const seconds = parseInt(e.target.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', e => {
  e.preventDefault();
  const mins = e.target.minutes.value;
  console.log(mins);
  timer(mins * 60);
  e.target.reset();
});