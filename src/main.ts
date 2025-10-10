/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

let counter: number = 0;

document.body.innerHTML = `
  <h1>💞 Total Love Sent: <span id="counter">0</span></h1>
  <button id="button"></button>
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
setInterval(() => {
  counter++;
  counterElement.textContent = counter.toString();
}, 1000);
