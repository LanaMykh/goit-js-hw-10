import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const notifBtn = document.querySelector(".form");

notifBtn.addEventListener("submit", pressSubmit);

function pressSubmit(event) {
    event.preventDefault();
  
    const { delay, state } = event.currentTarget.elements;
    
    createPromise(delay.value, state.value)
        .then(delay => {
            iziToast.success({
                position: 'topRight',
                message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch(delay => {
            iziToast.error({
                position: 'topRight',
                message: `❌ Rejected promise in ${delay}ms`,
            });
        });
    event.currentTarget.reset();
};

function createPromise(valueDelay, valueState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (valueState === 'fulfilled') {
          resolve(valueDelay);
      } else {
          reject(valueDelay);
      }
    }, valueDelay);
  });
}