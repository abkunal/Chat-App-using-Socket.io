var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// set static folder
app.use(express.static(__dirname + "/public"));

// homepage
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// socket connection
io.on('connection', (socket) => {
	console.log("A user connected!");

	// executes when a user starts typing
	socket.on('userTyping', (username) => {
		socket.broadcast.emit('userTyping', username);
	});

	// executes when a user sends a message
	socket.on('msg', (msg) => {
		console.log("message: ", msg);
		socket.broadcast.emit('msg', msg);
	});

	// executes when a new user joins the chat room
	socket.on('join', (username) => {
		socket.broadcast.emit('join', username);
	});
});

// port to listen
http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *: ', process.env.PORT);
});
