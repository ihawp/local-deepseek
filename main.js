

let button = document.getElementById('submitInput');
let input = document.getElementById('input');


button.addEventListener('click', async () => {

    let host = 'localhost';

    const response = await fetch(`http://${host}:11434/api/generate`, {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'deepseek-r1:8b',
            prompt: input.value,
            stream: false
        }),
    });

    let data = await response.json();


    document.body.innerHTML += data.response;

    console.log(data);
})