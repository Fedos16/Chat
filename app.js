var express = require('express');
var WebSocket = require("ws");
const server = new WebSocket.Server({port: 3001})
var app = express();

const config = require('./config');
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})
app.get('*', function(req, res){
  res.redirect('/');
});

server.on('connection', ws => {
  ws.on('message', message => {
    if (message === 'Exit') {
      ws.close();
    } else {
      server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({type: "System", text: server.clients.size}));
          client.send(JSON.stringify({type: "Messages", text: message}));
        }
      });
    }
    
  });

  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({type: "System", text: server.clients.size}));
    }
  })
});
 
app.listen(config.PORT, '0.0.0.0', () => {
  console.log('Сервер запущен!');
})