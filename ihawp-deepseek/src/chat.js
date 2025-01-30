/* ihawp.com */


/*

    Imports:
        - Ollama: For stream reading of output, compared to 'ollama serve'.
        - Marked: Convert instances of AI output returned in Markdown.

*/
import ollama from 'ollama';
import { marked } from 'marked';


/*

    Initialize iteration.

*/
let iteration = 0;


export async function Chat(event)  {

    /*

        Disable <button id="submitInput">

    */
    event.target.setAttribute('disabled', 'disabled');

    /*

        Chat must be got inside!

    */
    const chat = document.getElementById('chat');


    /*

        Add user input (message) to DOM

    */

    console.log(event.target.previousElementSibling.value);
    console.log(marked.parse(event.target.previousElementSibling.value));

    chat.innerHTML += `<p class="user">${event.target.previousElementSibling.value}</p>`;


    /*

    Add p that will have thoughts printed.

    */
    chat.innerHTML += `<div id="chat-${iteration}" class="ai"></div>`;


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
        /*

            Add AI thoughts/answer stream to DOM.

        */
        let itr = document.getElementById('chat-' + iteration);
        itr.innerHTML += part.message.content;
        itr.scrollIntoView({block: "end", inline: "end"});

    }

    /*

        Increment iteration.

    */
    iteration++;


    /*

        Reset the textarea (id: #input).

    */
    event.target.previousElementSibling.value = '';

    event.target.removeAttribute('disabled');


}