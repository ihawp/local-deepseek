import './ihawp.css';
import { Chat } from './chat.js';

document.querySelector('#app').innerHTML = `
  <main>

    <section id="chat"></section>

    <section id="inputSection">

      <label for="input" hidden>Input:</label>
      <textarea id="input" rows="1"></textarea>
      
    </section>

  </main>
`;

document.addEventListener('keypress', Chat);
document.getElementById('input').focus();
