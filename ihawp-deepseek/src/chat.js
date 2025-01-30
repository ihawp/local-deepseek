/* ihawp.com

    UI for chat with Ollama LLM Models

    Imports:
        - Ollama: For stream reading of output, compared to 'ollama serve'.
        - Marked: Convert instances of AI output returned in Markdown.

*/
import ollama from 'ollama/browser'
import { marked } from 'marked';


/*

    Initialize iteration.

*/
let iteration = 0;


export async function Chat(event)  {

    /*

        Disable <button id="submitInput">.

    */
    event.target.setAttribute('disabled', 'disabled');


    /*

        Get chat.

    */
    const chat = document.getElementById('chat');


    /*

        Add user input (message) to DOM.

    */
    chat.innerHTML += `<div class="user">${marked.parse(event.target.previousElementSibling.value)}</div>`;


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

        Reset the <textarea id="#input"> value.

    */
    event.target.previousElementSibling.value = '';


    /*

        Readable stream.

    */
    for await (const part of response) {
        /*

            Add AI thoughts/answer stream to DOM.

        */
        let itr = document.getElementById('chat-' + iteration);
        itr.innerHTML += marked.parse(part.message.content);
        itr.scrollIntoView({block: "end", inline: "end"});

    }


    /*

        Increment iteration.

    */
    iteration++;


    /*

        Disable <button id="submitInput">.

    */
    event.target.removeAttribute('disabled');


    /*

        Scroll the bottom of the chat into view.

        Eliminates bouncing effect compared to repeated
        calls if inside the stream; hence use of most recent
        piece of text for scrolling to during stream.

    */
    chat.scrollIntoView({block: "end", inline: "end"});


}