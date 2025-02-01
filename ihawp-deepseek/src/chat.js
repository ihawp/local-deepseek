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


    /* Disable <textarea id="#input"> */
    input.setAttribute('disabled', 'disabled');
    input.value = 'Thinking...';


    /* Add user input (message) and timestamp to DOM => Scroll timestamp into view */
    chat.innerHTML += `<div class="user" id="uchat-${iteration}">${marked.parse(value)}</div>`;
    chat.innerHTML += time(new Date(), `uchat-${iteration}`, 'right');
    document.getElementById(`uchat-${iteration}`).scrollIntoView({block: "end", inline: "end"});


    /* Add AI message box and GET that message box */
    chat.innerHTML += `<div id="chat-${iteration}" class="ai"></div>`;
    const chatIteration = document.getElementById('chat-' + iteration);

    /* Fetches responses locally hosted Ollama LLM model.
       Stores response in variable 'response' */
    const response = await ollama. chat({
        model: 'deepseek-coder:6.7b',
        messages: [{
            role: 'user',
            content: value,
        }],
        stream: true,
    });


    /* Readable stream */
    for await (const part of response) {
        /* Add AI thoughts/answer stream to DOM */
        chatIteration.innerHTML += marked.parse(part.message.content);
        chatIteration.scrollIntoView({block: "end", inline: "end"});

        /* Add timestamp if stream done */
        if (part["done_reason"]) {
            chat.innerHTML += time(part["created_at"], `chat-${iteration}`, 'left');
        }
    }

    /* Scroll the AI chat date into view after printing */
    document.querySelector(`label[for="chat-${iteration}"]:last-of-type`).scrollIntoView({block: "end", inline: "end"});

    // reset input
    input.removeAttribute('disabled');
    input.value = '';
    input.focus();

    // increment iteration
    iteration++;
}