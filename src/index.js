const { Server } = require('./server/server');
const { ManagerOfEvents } = require('./events/events');
const { errors } = require('./locales/errors.json');
const SocketIo = require('socket.io');
const path = require('path');

const routeStaticFiles = path.join(__dirname, 'public');
let io = null;

(async () => {
    // Inicializacion del servidor express con sus configuraciones
    const application = await Server.init(routeStaticFiles);
    application ? io = new SocketIo.Server(application) : console.log(errors.Server.serverIsNotRunning);
    const isRunning = await Server.listen();
    isRunning ? await ManagerOfEvents.init(io): console.log(errors.ManagerOfEvents.instanceError);
})();


