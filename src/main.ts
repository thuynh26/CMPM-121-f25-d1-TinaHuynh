/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

// ==================== Game State ==================== //
let counter: number = 0;
let growthRate: number = 0;
const PRICE_INCREASE: number = 1.15;

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
    <button id="BtnA">💓 Upgrade A</button>
    <button id="BtnB">💓 Upgrade B</button>
    <button id="BtnC">💓 Upgrade C</button>
  </div>

  <p id="itemSummary">Items Purchased: </p>
  <p id="rate">Growth Rate: </p>

`;

// ==================== DOM ref ==================== //
const counterElement = document.getElementById("counter")!;
const clickBtn = document.getElementById("clickBtn")!;
const upgradeBtnA = document.getElementById("BtnA") as HTMLButtonElement;
const upgradeBtnB = document.getElementById("BtnB") as HTMLButtonElement;
const upgradeBtnC = document.getElementById("BtnC") as HTMLButtonElement;
const itemSumElement = document.getElementById("itemSummary")!;
const rateElement = document.getElementById("rate")!;

// ==================== Helper Functions ==================== //
function currentCost(base: number, owned: number): number {
  const newCost = base * Math.pow(PRICE_INCREASE, owned);
  return parseFloat(newCost.toFixed(2));
}

function updateCounter() {
  counterElement.textContent = Math.floor(counter).toString();
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

function updateButtons() {
  upgradeBtnA.textContent = `💓 Upgrade A (Cost: ${currentCost(A_COST, ownA)})`;
  upgradeBtnB.textContent = `💓 Upgrade B (Cost: ${currentCost(B_COST, ownB)})`;
  upgradeBtnC.textContent = `💓 Upgrade C (Cost: ${currentCost(C_COST, ownC)})`;
}

// ==================== RAF Functions ====================//
let timeOfLastFrame = performance.now();
let loopStarted = false;

function autoClick(currentTime: number) {
  const deltaTime = (currentTime - timeOfLastFrame) / 1000;
  timeOfLastFrame = currentTime;

  counter += growthRate * deltaTime;
  updateCounter();
  updateItemSummary();
  updateButtons();

  requestAnimationFrame(autoClick);
}

function startLoopOnce() {
  if (loopStarted) return;
  loopStarted = true;
  requestAnimationFrame((t) => {
    timeOfLastFrame = t;
    requestAnimationFrame(autoClick);
  });
}

// ==================== Button Handlers ==================== //
clickBtn.addEventListener("click", () => {
  counter++;
  updateCounter();
  updateItemSummary();
  updateButtons();
});

upgradeBtnA.addEventListener("click", () => {
  const cost = currentCost(A_COST, ownA);
  if (canAfford(cost)) {
    counter -= cost;
    growthRate += A_RATE;
    ownA++;

    startLoopOnce();
    updateCounter();
    updateItemSummary();
    updateButtons();
  }
});

upgradeBtnB.addEventListener("click", () => {
  const cost = currentCost(B_COST, ownB);
  if (canAfford(cost)) {
    counter -= cost;
    growthRate += B_RATE;
    ownB++;

    startLoopOnce();
    updateCounter();
    updateItemSummary();
    updateButtons();
  }
});

upgradeBtnC.addEventListener("click", () => {
  const cost = currentCost(C_COST, ownC);
  if (canAfford(cost)) {
    counter -= cost;
    growthRate += C_RATE;
    ownC++;

    startLoopOnce();
    updateCounter();
    updateItemSummary();
    updateButtons();
  }
});

// ==================== Init ==================== //
updateCounter();
updateItemSummary();
updateButtons();
