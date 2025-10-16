/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

// =============== Game State =============== //
let counter: number = 0;

let growthRate: number = 0;
// Initial growth rate -> +1 a purchase is made

const upgradeCost: number = 10;

// =============== DOM =============== //
document.body.innerHTML = `
  <h1>💞 Total Love Sent: <span id="counter">0</span></h1>
  <button id="clickBtn">🏹 Shoot Arrow</button>

  <p>^ Click the button to send love arrows!</p>

  <div id="upgradeShop">
    <button id="upgradeBtnA">💓 Rapid Fire</button>
    <button id="upgradeBtnB">💓 Upgrade B</button>
    <button id="upgradeBtnC">💓 Upgrade C</button>
  </div>

  <p>Purchase unit upgrades!</p>

`;

// =============== DOM ref =============== //
const counterElement = document.getElementById("counter")!;
const clickBtn = document.getElementById("clickBtn")!;
const upgradeBtnA = document.getElementById("upgradeBtnA")!;
const upgradeBtnB = document.getElementById("upgradeBtnB")!;
const upgradeBtnC = document.getElementById("upgradeBtnC")!;

// =============== Helper Functions =============== //
function updateCounter() {
  counterElement.textContent = counter.toString();
}

// =============== Button Handlers =============== //
clickBtn.addEventListener("click", () => {
  counter++;
  updateCounter();
});

// Auto clicker using reqAnimationFrame
let timeOfLastFrame = performance.now();
let loopStarted = false;

function autoClick(currentTime: number) {
  const deltaTime = (currentTime - timeOfLastFrame) / 1000;
  timeOfLastFrame = currentTime;

  const clicksThisFrame = growthRate * deltaTime;
  counter += clicksThisFrame;
  counterElement.textContent = Math.floor(counter).toString();

  requestAnimationFrame(autoClick);
}

// Upgrade Handler
upgradeBtnA.addEventListener("click", () => {
  if (counter >= upgradeCost) {
    counter -= upgradeCost;
    growthRate++;

    if (!loopStarted) {
      loopStarted = true;
      requestAnimationFrame((t) => {
        timeOfLastFrame = t;
        requestAnimationFrame(autoClick);
      });
    }

    updateCounter();
    upgradeBtnA.textContent = `💓 Rapid Fire (Currently +${growthRate}/sec)`;
  }
});

upgradeBtnB.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate++;

    if (!loopStarted) {
      loopStarted = true;
      requestAnimationFrame((t) => {
        timeOfLastFrame = t;
        requestAnimationFrame(autoClick);
      });
    }

    counterElement.textContent = Math.floor(counter).toString();
    upgradeBtnA.textContent = `💓 Upgrade B (Currently +${growthRate}/sec)`;
  }
});

upgradeBtnC.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate++;

    if (!loopStarted) {
      loopStarted = true;
      requestAnimationFrame((t) => {
        timeOfLastFrame = t;
        requestAnimationFrame(autoClick);
      });
    }

    counterElement.textContent = Math.floor(counter).toString();
    upgradeBtnA.textContent = `💓 Upgrade C (Currently +${growthRate}/sec)`;
  }
});
