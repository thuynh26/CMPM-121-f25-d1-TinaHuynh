/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

// ==================== Game State ==================== //
let counter: number = 100;
let growthRate: number = 0;
// Initial growth rate -> +1 a purchase is made

const A_COST: number = 10;
const B_COST: number = 100;
const C_COST: number = 1000;
const A_RATE = 0.1, B_RATE = 2.0, C_RATE = 50;

let ownA: number = 0;
let ownB: number = 0;
let ownC: number = 0;

// ==================== DOM ==================== //
document.body.innerHTML = `
  <h1>💞 Total Love Sent: <span id="counter">0</span></h1>
  <button id="clickBtn">🏹 Shoot Arrow</button>

  <p>^ Click the button to send love arrows!</p>

  <p>Purchase unit upgrades!</p>
  <div id="upgradeShop">
    <button id="upgradeBtnA">💓 Upgrade A</button>
    <button id="upgradeBtnB">💓 Upgrade B</button>
    <button id="upgradeBtnC">💓 Upgrade C</button>
  </div>

  <p id="itemSummary">Items Purchased: </p>
  <p id="rate">Growth Rate: </p>

`;

// ==================== DOM ref ==================== //
const counterElement = document.getElementById("counter")!;
const clickBtn = document.getElementById("clickBtn")!;
const upgradeBtnA = document.getElementById("upgradeBtnA")!;
const upgradeBtnB = document.getElementById("upgradeBtnB")!;
const upgradeBtnC = document.getElementById("upgradeBtnC")!;
const itemSumElement = document.getElementById("itemSummary")!;

const rateElement = document.getElementById("rate")!;

// ==================== Helper Functions ==================== //
function updateCounter() {
  counterElement.textContent = counter.toString();
  counterElement.title = counter.toFixed(5);
}

function updateItemSummary() {
  rateElement.textContent = `Growth Rate: ${growthRate.toFixed(2)} per second`;

  itemSumElement.textContent =
    `Items Purchased: A(${ownA}), B(${ownB}), C(${ownC})`;
}

function canAfford(cost: number): boolean {
  return counter >= cost;
}

// ==================== RAF Functions ====================//
let timeOfLastFrame = performance.now();

function autoClick(currentTime: number) {
  const deltaTime = (currentTime - timeOfLastFrame) / 1000;
  timeOfLastFrame = currentTime;

  counter += growthRate * deltaTime;
  updateCounter();

  requestAnimationFrame(autoClick);
}

// ==================== Button Handlers ==================== //
clickBtn.addEventListener("click", () => {
  counter++;
  updateCounter();
});

upgradeBtnA.addEventListener("click", () => {
  if (canAfford(A_COST)) {
    counter -= A_COST;
    growthRate += A_RATE;
    ownA++;
    timeOfLastFrame = performance.now();
    requestAnimationFrame(autoClick);
  }
  updateCounter();
  updateItemSummary();
});

upgradeBtnB.addEventListener("click", () => {
  if (canAfford(B_COST)) {
    counter -= B_COST;
    growthRate += B_RATE;
    ownB++;
    timeOfLastFrame = performance.now();
    requestAnimationFrame(autoClick);
  }
  updateCounter();
  updateItemSummary();
});

upgradeBtnC.addEventListener("click", () => {
  if (canAfford(C_COST)) {
    counter -= C_COST;
    growthRate += C_RATE;
    ownC++;
    timeOfLastFrame = performance.now();
    requestAnimationFrame(autoClick);
  }
  updateCounter();
  updateItemSummary();
});
