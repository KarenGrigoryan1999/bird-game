const http = require('http');

const server = http.createServer();

const gamers = [];

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log('new gamer was connected');

  socket.on('findGamer', (data) => {
    if(gamers.length > 0) {
      socket.join(gamers[0]);
      gamers.shift();
      socket.emit('startGame');
      socket.local.emit('startGame');
    } else {
      const id = Date.now();
      gamers.push(id);
      socket.join(id);
    }
  });

  socket.on('onFly', (data) => {
    socket.local.emit('onGamerFly');
  });

  socket.on('onFall', (data) => {
    socket.local.emit('onGamerFall');
  })
})

server.listen(8080, () => {
  console.log('backend was started!');
});