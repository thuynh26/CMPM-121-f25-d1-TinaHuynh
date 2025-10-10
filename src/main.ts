/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
*/

const _counter: number = 0;

document.body.innerHTML = `
  <button id="button"></button>
`;

const cupidBtn = document.getElementById("button")!;
cupidBtn.textContent = `Shoot Arrow 🏹`;
