import './ihawp.css';
import { Chat } from './chat.js';

document.querySelector('#app').innerHTML = `
  <main class="flex flex-col">

    <section id="chat" class="flex flex-col p-1"></section>

    <section id="inputSection" class="flex p-1">

      <label for="input" hidden>Input:</label>
      <textarea id="input" rows="1" placeholder="Type + Enter"></textarea>
      
    </section>

  </main>
`;

document.addEventListener('keypress', Chat);
document.getElementById('input').focus();
