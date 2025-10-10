/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

let counter: number = 0;

let growthRate: number = 0;
// Initial growth rate -> +1 a purchase is made
const upgradeCost: number = 10;

document.body.innerHTML = `
  <h1>💞 Total Love Sent: <span id="counter">0</span></h1>
  <button id="button"></button>
  <p>^ Click the button to send love arrows!</p>
  <button id="upgradeBtn">💓 Rapid Fire</button>
  <p>Purchase +1 unit upgrade! (Costs 10 Love)</p>
`;

const cupidBtn = document.getElementById("button")!;
cupidBtn.textContent = `🏹 Shoot Arrow`;

const counterElement = document.getElementById("counter")!;
const upgradeBtn = document.getElementById("upgradeBtn")!;

// Manual Button Click Handler
cupidBtn.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
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
upgradeBtn.addEventListener("click", () => {
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

    counterElement.textContent = Math.floor(counter).toString();
    upgradeBtn.textContent = `💓 Rapid Fire (Currently +${growthRate}/sec)`;
  }
});
