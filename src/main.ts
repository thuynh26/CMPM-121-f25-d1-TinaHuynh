import bowImage from "./cupid-bow.png";
import shootSound from "./shoot.wav";

import "./style.css";

// ==================== Game State ==================== //
let counter: number = 0;
let growthRate: number = 0;

// Click upgrade: clickValue increases base click increment, clickBonusCounter enables a bonus every 5th click
let clickValue: number = 1;
let clickBonusCounter: number = 0;

type UpgradeType = "auto" | "click" | "clickBoost";

interface upgradeItems {
  name: string;
  description: string;
  baseCost: number;
  rate: number;
  owned: number;
  type: UpgradeType;
  button?: HTMLButtonElement;
}

// Step 9 refactor data structure
const availableItems: upgradeItems[] = [
  {
    name: "🕊️ Love Dove",
    description: "A flock of tiny wingmen to help you spread love.",
    baseCost: 10,
    rate: 0.1,
    owned: 0,
    type: "auto",
  },
  {
    name: "💘 Enchated Arrows",
    description: "Tip your arrows with magic, each shot lands harder.",
    baseCost: 100,
    rate: 0,
    owned: 0,
    type: "click",
  },
  {
    name: "🎯 Cupid's Aim",
    description: "Every 5th shot lands true for extra hearts",
    baseCost: 1000,
    rate: 0,
    owned: 0,
    type: "clickBoost",
  },
  {
    name: "👼🎶 Cherub Choir",
    description: "Enlist your cherub friends to sing love songs.",
    baseCost: 10000,
    rate: 50,
    owned: 0,
    type: "auto",
  },
  {
    name: "❤️‍🔥 Rapid Fire",
    description: "A quiver that shoots arrows at an incredible rate.",
    baseCost: 20000,
    rate: 100,
    owned: 0,
    type: "auto",
  },
];

/*
<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

// ==================== DOM ==================== //
document.body.innerHTML = `
  <h1 class="red-text">💞 Total Love Sent: <span id="counter">0</span></h1>
  <br>
  <div class="bow-container">
    <div class="bow-wrap">
      <img id="bow" class="bow-img" src="${bowImage}">
    </div>
  </div>
  <p class="red-text">^ Click to send love arrows!</p>
  <br>
  <h2 class="red-text">✨ Purchase blessing upgrades! ✨</h2>
  <div id="upgradeShop">
    <div id="shopItems"></div>
  </div>

  <div id="upgradeShop" class="shop-layout">
    <div id="shopItems"></div>
    <br>
    <aside id="infoPanel" aria-live="polite">
      <h3 class="red-text">~~~~~~~~~~  Upgrade Info  ~~~~~~~~~~<h3>
      <div id="infoName" class="info-name"></div>
      <div id="infoDesc" class="info-desc"></div>
    </aside>
  </div>

  <h3 id="itemSummary" class="red-text">Blessings Purchased: </h3>
  <h3 id="rate" class="red-text">Love Rate: </h3>

`;

// ==================== DOM refer ==================== //
const counterElement = document.getElementById("counter")!;
const bowImg = document.getElementById("bow") as HTMLImageElement;
const shopElement = document.getElementById("shopItems")!;
const itemSumElement = document.getElementById("itemSummary")!;
const rateElement = document.getElementById("rate")!;

const infoName = document.getElementById("infoName") as HTMLDivElement;
const infoDesc = document.getElementById("infoDesc") as HTMLDivElement;

// ==================== Helper Functions ==================== //

// Multiplier for exponential price increase
const PRICE_INCREASE: number = 1.15;

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
      item.button.textContent = `${item.name} -- Cost: ${price}`;
      item.button.disabled = counter < price;
    }
  }
}

function showInfo(item: upgradeItems) {
  const parts: string[] = [item.description];

  if (item.type === "click") {
    parts.push(`Increases click power by 1.`);
  }
  if (item.type === "clickBoost") {
    const clickBonus = 1 + item.owned;
    parts.push(`Every 5th click gives an extra ${clickBonus} love.`);
  }
  if (item.type === "auto") {
    parts.push(`Generates ${item.rate} love per second.`);
  }

  infoName.textContent = item.name;
  infoDesc.textContent = parts.join(" ");
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
  }) | 💘(${availableItems[1].owned}) | 🎯(${availableItems[2].owned}) | 👼🎶(${
    availableItems[3].owned
  }) | ❤️‍🔥(${availableItems[4].owned})`;

  rateElement.textContent = `Love Rate: ${growthRate.toFixed(2)} per second`;
}

function refreshUI() {
  updateCounter();
  updateButtons();
  calcGrowthRate();
  updateSummary();
}

// ==================== Shop Button and Purchase Handler ====================//
function createShopBtns() {
  shopElement.innerHTML = "";
  for (const item of availableItems) {
    const row = document.createElement("div");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("shop-btn-style");
    btn.addEventListener("click", () => {
      purchaseItem(item);
      showInfo(item);
    });
    item.button = btn;

    btn.addEventListener("mouseenter", () => showInfo(item));
    btn.addEventListener("focus", () => showInfo(item));

    row.appendChild(btn);
    shopElement.appendChild(row);
  }
  if (availableItems[0]) showInfo(availableItems[0]);

  updateButtons();
}

function purchaseItem(item: upgradeItems) {
  const cost = calcNewCost(item);
  if (counter < cost) return;

  counter -= cost;
  item.owned++;

  if (item.type === "click") {
    clickValue++;
  }

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

function playShoot() {
  const a = new Audio(shootSound);
  a.preload = "auto";
  a.volume = 0.5;
  a.currentTime = 0;
  a.play();
}

// ==================== Button Handlers ==================== //
bowImg.addEventListener("click", () => {
  playShoot();
  bowImg.classList.remove("shoot");
  bowImg.offsetHeight;
  bowImg.classList.add("shoot");

  counter = counter + clickValue;

  if (availableItems[2].owned > 0) {
    clickBonusCounter++;
    if (clickBonusCounter % 5 === 0) {
      counter = counter + (1 * availableItems[2].owned);
    }
  }

  refreshUI();
});

// ==================== Init ==================== //
createShopBtns();
refreshUI();
