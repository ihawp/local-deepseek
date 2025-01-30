import './ihawp.css';
import { Chat } from './alt.js';

document.querySelector('#app').innerHTML = `
  <main>
    <section id="chat"></section>

    <section id="inputSection">
      <label for="input" hidden>Input:</label>
      <textarea id="input" placeholder="Type Something..."></textarea>
      <button id="submitInput"><img src="/send-arrow.webp" alt="Arrow WEBP" width="43" height="30"></button>
    </section>

  </main>
`;

document.getElementById('submitInput').addEventListener('click', Chat);
