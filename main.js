const button = document.getElementById('submitInput');
const chat = document.getElementById('chat');
const input = document.getElementById('input');
const click = async () => {

    chat.innerHTML += `<p class="user">${input.value}</p>`;

    const response = await fetch(`http://localhost:11434/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'deepseek-r1:1.5b',
            prompt: input.value,
            stream: false
        }),
    });

    input.value = '';

    let data = await response.json();

    console.log(data.response);

    chat.innerHTML += `<p class="ai">${data.response}</p>`;
}

button.addEventListener('click', click);
