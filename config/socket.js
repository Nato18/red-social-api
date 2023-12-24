import { Server } from 'socket.io';
import http from 'http';

const io = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });

    return io;
};

export default io;