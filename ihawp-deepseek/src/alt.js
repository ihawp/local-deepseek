import ollama from 'ollama';
import { marked } from 'marked';

export async function Chat(event)  {

    console.log(event);

    const chat = document.getElementById('chat');

    /*

        Add user input (message) to DOM

    */
    chat.innerHTML += `<p class="user">${event.target.previousElementSibling.value}</p>`;

    /*

        Fetches responses locally hosted Ollama LLM model.

    */
    let response = await ollama. chat({
        model: 'deepseek-r1:1.5b',
        messages: [{
            role: 'user',
            content: event.target.previousElementSibling.value
        }],
        stream: true
    });


    /*

        Add p that will have thoughts printed.

    */
    let g = document.createElement('div');
    g.id = '' + iteration;
    chat.innerHTML += g;


    /*

        Readable Stream

    */
    for await (const part of response) {
        /*

            Add AI response to DOM.

        */
        chat.innerHTML += `<div class="ai">${marked.parse(part.message.content)}</div>`;

    }

    /*

        Reset the textarea (id: #input).

    */
    event.target.previousElementSibling.value = '';


    /*

        Store call to response.

    */

    console.log(response);

}
