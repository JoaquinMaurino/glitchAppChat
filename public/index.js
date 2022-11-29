//01_Establece conexion del lado del cliente
const socket = io.connect();

//03_definimos la funcion render
function render(data) {
  const html = data.map((mensaje) => {
    return (`<div><strong>${mensaje.author}: </strong><span>${mensaje.text}</span> <span>[${mensaje.date}]</span></div>`)
  }).join(' ')

  document.getElementById('mensajes').innerHTML = html
}

//02_Evento para enviar(emit) y para recibir(on) mensajes

socket.on("mensaje", (data) => {
  render(data);
});

//04_ Funcion del evento del submitForm de HTML
function addMessage(){
  const mensaje = {
    author: document.getElementById('username').value, 
    text: document.getElementById('text').value, 
    date: new Date()
  };
  document.getElementById('text').value = ""
  //Enviamos el nuevo mensaje
  socket.emit('newMessage', mensaje);
  return false
}