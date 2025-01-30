import './ihawp.css';
import { Chat } from './chat.js';

document.querySelector('#app').innerHTML = `
  <main>

    <section id="chat"></section>

    <section id="inputSection">

      <label for="input" hidden>Input:</label>
      <textarea id="input" placeholder="Type Something..."></textarea>
      <button id="submitInput">send</button>
      
      <!-- <img src="/send-arrow.webp" alt="Arrow WEBP" width="43" height="30"> -->
      
    </section>

  </main>
`;

document.getElementById('submitInput').addEventListener('click', Chat);
