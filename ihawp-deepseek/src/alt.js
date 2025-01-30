import ollama from 'ollama';
import { marked } from 'marked';

let iteration = 0;

export async function Chat(event)  {



    const chat = document.getElementById('chat');

    /*

        Add user input (message) to DOM

    */
    chat.innerHTML += `<p class="user">${event.target.previousElementSibling.value}</p>`;


    /*

    Add p that will have thoughts printed.

    */
    let g = `<div id="chat-${iteration}" class="ai"></div>`
    chat.innerHTML += g;

    /*

        Fetches responses locally hosted Ollama LLM model.
        Stores response in variable 'response'.

    */
    const response = await ollama. chat({
        model: 'deepseek-r1:1.5b',
        messages: [{
            role: 'user',
            content: event.target.previousElementSibling.value
        }],
        stream: true
    });


    /*

        Readable Stream

    */
    for await (const part of response) {
        console.log('iteration' + iteration);
        let wow = 'chat-' + iteration;
        const thisItr = document.getElementById(wow);
        console.log(thisItr);
        /*

            Add AI response to DOM.

        */
        thisItr.innerHTML += `${marked.parse(part.message.content)}`;

    }

    /*

        Increment iteration.

    */
    iteration++;

    /*

        Reset the textarea (id: #input).

    */
    event.target.previousElementSibling.value = '';

}
