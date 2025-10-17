/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

import "./style.css";

// ==================== Game State ==================== //
let counter: number = 0;
let growthRate: number = 0;
const PRICE_INCREASE: number = 1.15;

// Remove hardcoded costs and rates after step 9 refactoring
const A_COST: number = 10;
const B_COST: number = 100;
const C_COST: number = 1000;
const A_RATE = 0.1, B_RATE = 2.0, C_RATE = 50;

let ownA: number = 0;
let ownB: number = 0;
let ownC: number = 0;

interface upgradeItems {
  name: string;
  baseCost: number;
  rate: number;
  owned: number;
}

/* Step 9 refactor data structure
const availableItems: upgradeItems[] = [
  {name: "🕊️ Love Dove", baseCost: 10, rate: 0.1, owned: 0},
  {name: "❤️‍🔥 Rapid Fire", baseCost: 100, rate: 2.0, owned: 0},
  {name: "👼🎶 Cherub Choir", baseCost: 1000, rate: 50, owned: 0},
  {name: "Upgrade 4", baseCost: 5000, rate: 200, owned: 0},
  {name: "Upgrade 5", baseCost: 20000, rate: 1000, owned: 0}
];
*/

// ==================== DOM ==================== //
document.body.innerHTML = `
  <h1 class="red-text">💞 Total Love Sent: <span id="counter">0</span></h1>
  <button id="clickBtn" class="main-btn-style">🏹 Shoot Love Arrow</button>
  <p class="red-text">^ Click the button to send love arrows!</p>

  <h2 class="red-text">✨ Purchase blessing upgrades! ✨</h2>
  <div id="upgradeShop">
    <button id="BtnA" class="shop-btn-style"></button>
    <button id="BtnB" class="shop-btn-style"></button>
    <button id="BtnC" class="shop-btn-style"></button>
    <div id="shopItems"></div>
  </div>

  <p id="itemSummary" class="red-text">Blessings Purchased: </p>
  <p id="rate" class="red-text">Love Rate: </p>

`;

// ==================== DOM refer ==================== //
const counterElement = document.getElementById("counter")!;
const clickBtn = document.getElementById("clickBtn")!;

// const shopItemsElement = document.getElementById("shopItems")!;

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

/* Replace currentCost with this after
function calcNewCost(item: upgradeItems): number {
  const newCost = base * Math.pow(PRICE_INCREASE, owned);
  return parseFloat(newCost.toFixed(2));
}
*/

function updateCounter() {
  counterElement.textContent = Math.floor(counter).toString();
  counterElement.title = counter.toFixed(5);
}

// updates rate info too
function updateSummary() {
  rateElement.textContent = `Love Rate: ${growthRate.toFixed(2)} per second`;

  itemSumElement.textContent =
    `Blessings Purchased: 🕊️(${ownA}) | ❤️‍🔥(${ownB}) | 👼🎶(${ownC})`;
}

function canAfford(cost: number): boolean {
  return counter >= cost;
}

function updateButtons() {
  upgradeBtnA.textContent = `🕊️ Love Dove (Cost: ${currentCost(A_COST, ownA)})`;
  upgradeBtnB.textContent = `❤️‍🔥 Rapid Fire (Cost: ${
    currentCost(B_COST, ownB)
  })`;
  upgradeBtnC.textContent = `👼🎶 Cherub Choir (Cost: ${
    currentCost(C_COST, ownC)
  })`;

  upgradeBtnA.disabled = !canAfford(currentCost(A_COST, ownA));
  upgradeBtnB.disabled = !canAfford(currentCost(B_COST, ownB));
  upgradeBtnC.disabled = !canAfford(currentCost(C_COST, ownC));
}

function refreshUI() {
  updateCounter();
  updateSummary();
  updateButtons();
}

// ==================== RAF Functions ====================//
let timeOfLastFrame = performance.now();
let loopStarted = false;

function autoClick(currentTime: number) {
  const deltaTime = (currentTime - timeOfLastFrame) / 1000;
  timeOfLastFrame = currentTime;

  counter += growthRate * deltaTime;
  refreshUI();

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
  refreshUI();
});

upgradeBtnA.addEventListener("click", () => {
  const cost = currentCost(A_COST, ownA);
  if (canAfford(cost)) {
    counter -= cost;
    growthRate += A_RATE;
    ownA++;

    startLoopOnce();
    refreshUI();
  }
});

upgradeBtnB.addEventListener("click", () => {
  const cost = currentCost(B_COST, ownB);
  if (canAfford(cost)) {
    counter -= cost;
    growthRate += B_RATE;
    ownB++;

    startLoopOnce();
    refreshUI();
  }
});

upgradeBtnC.addEventListener("click", () => {
  const cost = currentCost(C_COST, ownC);
  if (canAfford(cost)) {
    counter -= cost;
    growthRate += C_RATE;
    ownC++;

    startLoopOnce();
    refreshUI();
  }
});

// ==================== Init ==================== //
refreshUI();
