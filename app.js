var express = require('express');
var WebSocket = require("ws");
const server = new WebSocket.Server({port: 3001})
var app = express();
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

server.on('connection', ws => {
  ws.on('message', message => {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    })
  })
  //ws.send('Соединение с сервером установлено!');
});
 
app.listen(5000, '0.0.0.0', () => {
  console.log('Сервер запущен!');
})