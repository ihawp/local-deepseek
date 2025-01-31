/* ihawp.com

    UI for chat with Ollama LLM Models

    Imports:
        - Ollama: For stream reading of output, compared to 'ollama serve'.
        - Marked: Convert instances of AI output returned in Markdown.

*/
import ollama from 'ollama/browser';
import { marked } from 'marked';


/*

    Initialize iteration.

*/
let iteration = 0;
export async function Chat(event)  {

    /* Get. */
    const chat = document.getElementById('chat');
    const input = document.getElementById('input');
    const value = input.value;

    // exit cases
    if (event.key !== 'Enter') {
        return input.focus();
    }
    if (value === 'Thinking...' || value === ' ' || value === '') {
        return;
    }

    /* Date Formatting */
    const datee = (created, forr, side) => {
        let q = new Date(created);
        let minutes = q.getMinutes();
        chat.innerHTML += `<label for="${forr}" class="${side}">${q.getMonth() + 1}/${q.getDate()} ${q.getHours()}:${minutes > 9 ? minutes : '0' + minutes}</label>`;
    }

    /* Disable <textarea id="#input"> */
    input.setAttribute('disabled', 'disabled');

    /* Reset the <textarea id="#input"> value */
    input.value = 'Thinking...';

    /* Add user input (message) and timestamp to DOM => Scroll timestamp into view */
    chat.innerHTML += `<div class="user" id="uchat-${iteration}">${marked.parse(value)}</div>`;
    datee(new Date(), `uchat-${iteration}`, 'right');
    document.getElementById(`uchat-${iteration}`).scrollIntoView({block: "end", inline: "end"});



    chat.innerHTML += `<div id="chat-${iteration}" class="ai"></div>`;

    /* Fetches responses locally hosted Ollama LLM model.
       Stores response in variable 'response' */
    const response = await ollama. chat({
        model: 'deepseek-r1:1.5b',
        messages: [{
            role: 'user',
            content: value,
        }],
        stream: true,
    });


    /* Readable stream */
    const chatIteration = document.getElementById('chat-' + iteration);
    for await (const part of response) {
        /* Add timestamp if stream done */
        if (part["done_reason"]) {
            datee(part["created_at"], `chat-${iteration}`, 'left');
        }

        /* Add AI thoughts/answer stream to DOM */
        chatIteration.innerHTML += marked.parse(part.message.content);
        chatIteration.scrollIntoView({block: "end", inline: "end"});

    }

    /* Scroll the AI chat-date into view after printing */
    document.querySelector(`label[for="chat-${iteration}"]:last-of-type`).scrollIntoView({block: "end", inline: "end"});

    input.removeAttribute('disabled');
    input.value = '';
    input.focus();

    iteration++;
}