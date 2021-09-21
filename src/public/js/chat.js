const socket = io();

// DOM Elements!
const message = document.getElementById('message');
const username = document.getElementById('username');
const actions = document.getElementById('actions');
const buttonSendMessage = document.getElementById('send');
const output = document.getElementById('output');

buttonSendMessage.addEventListener('click', (event) => {
    let chatMessage = message.value;
    let chatUserName = username.value;
    try {
        if (chatMessage && chatUserName) {
            socket.emit('chat:message', {
                chatUserName,
                chatMessage,
                socketId: socket.id
            });
            return message.value = ``;
        }
        return alert('Los campos son obligatorios!');
    } catch (error) {
        return alert(`Error emitiendo el socket id: ${socket.id}:::` + error);
    }
});

message.addEventListener('keypress', (event) => {
    username.value ? socket.emit('chat:typing', username.value) : alert('ingresa tu nombre!');
});

socket.on('chat:message:server', (data) => {
    output.innerHTML +=
        `<p><strong>${data.chatUserName}</strong>: ${data.chatMessage}</p>`;
    actions.innerHTML = ``;
});

socket.on('chat:typing:server', (username) => {
    actions.innerHTML = `<p><em>${username} is typing a message... </em></p>`
});