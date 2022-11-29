const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();

const PORT = 8080;

//Middleware
app.use(express.static("public"));

//Configuracion de socket
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Array de mensajes
const mensajes = [
  { author: "Ned Stark", text: "Hola, todo bien?", date: new Date() },
  { author: "Robert Baratheon", text: "Que tal!", date: new Date() },
  { author: "John Snow", text: "Todo bien por aca", date: new Date() },
];

//Iniciacion de la App IO (establece conexion del lado del server)
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  //enviar historial (array) del chat al cliente que se conecte
  socket.emit("mensaje", mensajes);

  //Recibimos el nuevo mensaje (escuchamos al cliente)
  socket.on('newMessage', data=>{
    mensajes.push(data);
    //Enviamos el nuevo mensaje a todos los clientes conectados (por broadcast)
    io.sockets.emit('mensaje', mensajes)
  })
});

const server = httpServer.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
server.on("error", (error) => {
  console.log(`Error en servidor ${error}`);
});
