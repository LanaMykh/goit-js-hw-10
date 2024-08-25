//Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateSelection = document.querySelector("#datetime-picker");
const startBtn= document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

startBtn.disabled = true;

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
          return iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      }
        userSelectedDate = selectedDates[0];
        startBtn.disabled = false;
  },
};

startBtn.addEventListener("click", startTimer);

flatpickr(dateSelection, options);

function startTimer() {
  dateSelection.disabled = true;
  startBtn.disabled = true;

  intervalId = setInterval(updateTimer, 1000);
  return;
}

function addLeadingZero(val) {
    return String(val).padStart(2, 0)
}

function updateTimer() {
  const curentTime = userSelectedDate - new Date();

  if (curentTime <= 0) {
    dateSelection.disabled = false;
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(curentTime);

  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}