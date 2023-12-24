import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import db from './config/db.js';
import sessionRouter from './routes/sessionRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Reemplaza con la URL de tu aplicación Vue.js
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

try {
    await db.authenticate();
    db.sync();
    console.log("conexion a la base de datos");
} catch (error) {
    console.log(error);
}

app.use("/session", sessionRouter);
app.use("/user", userRouter);

const io = new Server(httpServer,{
    cors: {
        origin: true,
        credentials: true,
      },
      allowEIO3: true,
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

let port = process.env.PORT || 3525;
httpServer.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('	[GET] http://localhost:3525/');
});

export default io;
