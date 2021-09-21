
class ManagerOfEvents {
    static io;
    static async init(io) {
        try {
            this.io = io;
            this.io ? await this.getEvents() : false;   
        } catch (error) {
            return error;
        }
    }
    static async getEvents(){
        this.io.on('connection', (socket) => {
            socket.on('chat:message', (data) => {
                this.io.sockets.emit('chat:message:server', data);
            });
            socket.on('chat:typing', (data) => {
                socket.broadcast.emit('chat:typing:server', data);
            });
        });
    }
}

module.exports = {
    ManagerOfEvents
}