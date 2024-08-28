const socket = io();

// DOM Elements
const message = document.getElementById('message');
const username = document.getElementById('username');
const actions = document.getElementById('actions');
const buttonSendMessage = document.getElementById('send');
const output = document.getElementById('output');
const fileInput = document.getElementById('file-input');

let selectedFile = null;

fileInput.addEventListener('change', (event) => {
    selectedFile = event.target.files[0];
});

buttonSendMessage.addEventListener('click', sendMessage);
message.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    } else {
        username.value ? socket.emit('chat:typing', username.value) : alert('¡Ingresa tu nombre!');
    }
});

function sendMessage() {
    let chatMessage = message.value;
    let chatUserName = username.value;
    try {
        if (chatMessage && chatUserName) {
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    socket.emit('chat:message', {
                        chatUserName,
                        chatMessage,
                        image: event.target.result,
                        socketId: socket.id
                    });
                };
                reader.readAsDataURL(selectedFile);
            } else {
                socket.emit('chat:message', {
                    chatUserName,
                    chatMessage,
                    socketId: socket.id
                });
            }
            message.value = '';
            selectedFile = null;
            fileInput.value = '';
        } else {
            alert('¡Los campos son obligatorios!');
        }
    } catch (error) {
        alert(`Error emitiendo el socket id: ${socket.id}:::` + error);
    }
}

socket.on('chat:message:server', (data) => {
    actions.innerHTML = '';
    let messageHTML = `
        <div class="message">
            <strong>${data.chatUserName}</strong>: ${data.chatMessage}
            ${data.image ? `<img src="${data.image}" alt="Imagen compartida" class="shared-image">` : ''}
        </div>
    `;
    output.innerHTML += messageHTML;
    output.scrollTop = output.scrollHeight;
});

socket.on('chat:typing:server', (username) => {
    actions.innerHTML = `<p><em>${username} está escribiendo un mensaje...</em></p>`;
});