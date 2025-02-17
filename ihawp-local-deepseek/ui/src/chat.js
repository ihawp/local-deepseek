/* ihawp.com

    UI for chat with Ollama LLM Models

*/
import ollama from 'ollama/browser';
import { marked } from 'marked';


/* Initialize iteration. */
let iteration = 0;

export async function Chat(event)  {

    /* Get. */
    const chat = document.getElementById('chat');
    const input = document.getElementById('input');
    const value = input.value;

    /* Exit cases */
    if (event.key !== 'Enter') {
        return input.focus();
    } else {
        event.preventDefault();
        if (value === 'Thinking...' || !value.length) {
            return;
        }
    }

    /* Formatting of message TIMEstamp */
    const time = (created, forr, side) => {
        let q = new Date(created);
        let minutes = q.getMinutes();
        return `<label for="${forr}" class="${side}">${q.getHours()}:${minutes > 9 ? minutes : '0' + minutes}</label>`;
    }


    /* Scroll end items into view (used thrice) */
    const scrollIntoViewEnd = (id) => {
        id.scrollIntoView({block: "end", inline: "end"});
    }


    /* Disable <textarea id="#input"> */
    input.setAttribute('disabled', 'disabled');
    input.value = 'Thinking...';


    /* Add user input (message) and timestamp to DOM => Scroll timestamp into view */
    chat.innerHTML += `<div class="user" id="uchat-${iteration}">${marked.parse(value)}</div>`;
    chat.innerHTML += time(new Date(), `uchat-${iteration}`, 'right');
    scrollIntoViewEnd(document.getElementById(`uchat-${iteration}`));


    /* Add AI message box and GET that message box */
    chat.innerHTML += `<div id="chat-${iteration}" class="ai"></div>`;
    const chatIteration = document.getElementById('chat-' + iteration);


    /* Fetches responses locally hosted Ollama LLM model.
       Stores response in variable 'response' */
    const response = await ollama.chat({
        model: 'deepseek-coder:6.7b',
        messages: [{
            role: 'user',
            content: value,
        }],
        stream: true,
        keep_alive: "5m",
    });
    for await (const part of response) {


        chatIteration.innerHTML += marked.parse(part.message.content);
        scrollIntoViewEnd(chatIteration);

        if (part["done_reason"]) {
            chat.innerHTML += time(part["created_at"], `chat-${iteration}`, 'left');
            scrollIntoViewEnd(document.querySelector(`label[for="chat-${iteration}"]:last-of-type`));
        }

    }

    /* Reset input */
    input.removeAttribute('disabled');
    input.value = '';
    input.focus();


    /* Increment iteration */
    iteration++;

}