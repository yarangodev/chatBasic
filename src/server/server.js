const express = require('express');
const { createServer } = require('http');

class Server {
    static app;
    static instance;
    static path;
    static async init(path) {
        try {
            this.app = express();
            this.app.set('port', process.env.PORT || 8001);
            this.app.use(express.static(path));
            this.instance = createServer(this.app);
            this.path = path;
            return this.instance;
        } catch (error) {
            return error;
        }
    }
    static async listen() {
        if(this.path && this.instance && this.app) {
            this.path ? this.instance.listen(this.app.get('port'), () => console.log(`[Server]=> up on port: ${this.app.get('port')}`)) : false;
            return true;
        }
        return false;
    }
}


module.exports = {
    Server
} 