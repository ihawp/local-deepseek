export async function Chat(event)  {

    const chat = document.getElementById('chat');

    /*

        Add user input (message) to DOM

    */
    chat.innerHTML += `<p class="user">${event.target.previousElementSibling.value}</p>`;

    /*

        Fetches responses locally hosted Ollama LLM model,
        in this case I am using DeepSeek.

    */
    const response = await fetch(`http://localhost:11434/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'deepseek-r1:1.5b',
            prompt: event.target.previousElementSibling.value,
            stream: false
        }),
    });

    /*

        Reset the textarea (id: #input)

    */
    event.target.previousElementSibling.value = '';


    /*

        Store call to response

    */
    let data = await response.json();

    console.log(data.response);

    chat.innerHTML += `<p class="ai">${data.response.match(/<think>(.*?)<\/think>/s)[1]}</p>`;
    /*

        Add AI response to DOM

    */
    chat.innerHTML += `<p class="ai">${data.response}</p>`;


}
