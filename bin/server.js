/**
 * 3 instalações essenciais para teste http
 * npm install http express debug
 * ** ** 
 * npm install -g nodemon
 * npm install --save-dev nodemon
 */
const http = require('http');
const debug = require('debug')('nodestr:server');
const app = require('../src/app');

const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

//Create server
const server = http.createServer(app);


//Request
server.listen(port);
server.on('error',onError);
server.on('listening',onListening)
console.log('API rodando na porta '+port);

//Disponibilidade port's
function normalizePort(val) {
    const port = parseInt(val,10);
    if (isNaN(port)) {
        return val;
    } else if (port>=0){
        return port;
    }
    return false;
    
}

//Tratarement of Erros
function onError(error) {
    if (error.sycall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe'+port:
        'Port'+port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind+' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDINUSE':
           console.error(bind+' is already in use');
        default:
            throw error;
    }
    
}

//Debug listen
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe' + addr
      : 'port' + addr.port;
    debug('Listenning on'+bind);
}
