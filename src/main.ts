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

interface upgradeItems {
  name: string;
  description: string;
  baseCost: number;
  rate: number;
  owned: number;
  button?: HTMLButtonElement;
}

// Step 9 refactor data structure
const availableItems: upgradeItems[] = [
  {
    name: "🕊️ Love Dove",
    description: "Temporary description",
    baseCost: 10,
    rate: 0.1,
    owned: 0,
  },
  {
    name: "❤️‍🔥 Rapid Fire",
    description: "Temporary description",
    baseCost: 100,
    rate: 2.0,
    owned: 0,
  },
  {
    name: "👼🎶 Cherub Choir",
    description: "Temporary description",
    baseCost: 1000,
    rate: 50,
    owned: 0,
  },
  {
    name: "💘 Enchated Arrows",
    description: "Temporary description",
    baseCost: 10000,
    rate: 200,
    owned: 0,
  },
  {
    name: "Test Your Luck",
    description: "Temporary description",
    baseCost: 20000,
    rate: 1000,
    owned: 0,
  },
];

// ==================== DOM ==================== //
document.body.innerHTML = `
  <h1 class="red-text">💞 Total Love Sent: <span id="counter">0</span></h1>
  <br>
  <button id="clickBtn" class="main-btn-style">🏹 Shoot Love Arrow</button>
  <p class="red-text">^ Click the button to send love arrows!</p>
  <br>
  <h2 class="red-text">✨ Purchase blessing upgrades! ✨</h2>
  <div id="upgradeShop">
    <div id="shopItems"></div>
  </div>

  <p id="itemSummary" class="red-text">Blessings Purchased: </p>
  <p id="rate" class="red-text">Love Rate: </p>

`;

// ==================== DOM refer ==================== //
const counterElement = document.getElementById("counter")!;
const clickBtn = document.getElementById("clickBtn")!;
const shopElement = document.getElementById("shopItems")!;
const itemSumElement = document.getElementById("itemSummary")!;
const rateElement = document.getElementById("rate")!;

// ==================== Helper Functions ==================== //

// Replace calcCost with this after
function calcNewCost(item: upgradeItems): number {
  const newCost = item.baseCost * Math.pow(PRICE_INCREASE, item.owned);
  return parseFloat(newCost.toFixed(2));
}

function updateCounter() {
  counterElement.textContent = Math.floor(counter).toString();
  counterElement.title = counter.toFixed(5);
}

function updateButtons() {
  for (const item of availableItems) {
    const price = calcNewCost(item);
    if (item.button) {
      item.button.textContent =
        `${item.name} (+${item.rate}/s) — Cost: ${price}`;
      item.button.disabled = counter < price;
    }
  }
}

function calcGrowthRate() {
  let sum = 0;
  for (const item of availableItems) {
    sum += item.rate * item.owned;
  }
  growthRate = sum;
}

// updates purchased item info and growth rate
function updateSummary() {
  itemSumElement.textContent = `Blessings Purchased: 🕊️(${
    availableItems[0].owned
  }) | ❤️‍🔥(${availableItems[1].owned}) | 👼🎶(${availableItems[2].owned})`;

  rateElement.textContent = `Love Rate: ${growthRate.toFixed(2)} per second`;
}

function refreshUI() {
  updateCounter();
  updateButtons();
  calcGrowthRate();
  updateSummary();

  console.log(
    `Counter: ${counter.toFixed(2)}, Growth Rate: ${growthRate.toFixed(2)}`,
  );
}

// ==================== Shop Button and Purchase Handler ====================//
function createShopBtns() {
  shopElement.innerHTML = "";
  for (const item of availableItems) {
    const row = document.createElement("div");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("shop-btn-style");
    btn.addEventListener("click", () => purchaseItem(item));
    item.button = btn;

    row.appendChild(btn);
    shopElement.appendChild(row);
  }

  updateButtons();
}

function purchaseItem(item: upgradeItems) {
  const cost = calcNewCost(item);
  if (counter < cost) return;

  counter -= cost;
  item.owned++;

  startLoopOnce();
  refreshUI();
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

// ==================== Init ==================== //
createShopBtns();
refreshUI();
