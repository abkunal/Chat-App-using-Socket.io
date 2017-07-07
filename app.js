var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

var clientCount = 0;
io.on('connection', (socket) => {
	console.log("A user connected!");
	
	socket.on('userTyping', (username) => {
		socket.broadcast.emit('userTyping', username);
	});

	socket.on('msg', (msg) => {
		console.log("message: ", msg);
		socket.broadcast.emit('msg', msg);
	});

	socket.on('join', (username) => {
		socket.broadcast.emit('join', username);
	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
