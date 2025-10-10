/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

let counter: number = 0;
const ratePerSec: number = 1; // 60fps

document.body.innerHTML = `
  <h1>💞 Total Love Sent: <span id="counter">0</span></h1>
  <button id="button"></button>
  <p>^ Click the button to send love arrows!</p>
  <button id="autoClickBtn">💓 Rapid Fire</button>
  <p>(or let it autoclick for you)</p>
`;

const cupidBtn = document.getElementById("button")!;
cupidBtn.textContent = `🏹 Shoot Arrow`;

// Click Handler
const button = document.getElementById("button")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});

// Auto Click Handler
const autoClickBtn = document.getElementById("autoClickBtn")!;

autoClickBtn.addEventListener("click", () => {
  requestAnimationFrame(autoClick);
});

// request animationFrame
let timeOfLastFrame = performance.now();

function autoClick(currentTime: number) {
  const deltaTime = (currentTime - timeOfLastFrame) / 1000; // Convert to seconds
  timeOfLastFrame = currentTime;

  const clicksThisFrame = ratePerSec * deltaTime;
  counter += clicksThisFrame;
  counterElement.textContent = Math.floor(counter).toString();

  requestAnimationFrame(autoClick);
}
