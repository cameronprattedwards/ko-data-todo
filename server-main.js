var express = require('express'),
bodyParser = require("body-parser"),
router = express.Router(),
app = express(),
http = require('http').Server(app),
io = require('socket.io')(http);

var todos = [
{
	id: 0,
	message: "take out garbage",
	due: new Date(2014, 5, 30),
	isComplete: false
},
{
	id: 1,
	message: "call your mother",
	due: new Date(2014, 5, 29),
	isComplete: false
}
];

router.param("todo", function (req, res, next, id) {
	console.log("got todo", id);
	var matches = todos.filter(function (todo) {
		console.log("filtering", todo, id);
		return todo.id == id;
	});
	console.log(matches);
	req.todo = matches[0];
	if (!req.todo) {
		res.send(404, { error: "Sorry - we can't find that todo." });
	} else {
		next();
	}
});

router.get("/todos/:todo", function (req, res) {
	console.log("got request", req.todo);
	res.send(req.todo);
});

router.get("/todos", function (req, res) {
	res.send(todos);
});

router.post("/todos", function (req, res) {
	console.log("post", req.body);
	req.body.due = new Date(req.body.due);
	req.body.id = todos.length ? todos[todos.length - 1].id + 1 : 0;
	req.body.message = req.body.message || "";
	if (!req.body.hasOwnProperty("isComplete"))
		req.body.isComplete = false;
	todos.push(req.body);
	res.send(req.body);
	io.emit("todo added", req.body);
});

router.put("/todos/:todo", function (req, res) {
	var existing = req.todo;
	for (var x in req.body) {
		if (x == "due") {
			existing.due = new Date(req.body[x]);
		} else {
			existing[x] = req.body[x];
		}
	}

	console.log("put", req.body);
	res.send();
	io.emit("todo updated", existing);
});

router.delete("/todos/:todo", function (req, res) {
	console.log("delete", req.todo);
	todos.splice(todos.indexOf(req.todo), 1);
	res.send(req.todo);
	io.emit("todo removed", req.todo.id);
});

app.use(bodyParser.json());
app.use("/api", router);
app.use(express.static(__dirname));

http.listen(8081, function () {
	console.log('listening on *:3000');
});

io.on('connection', function(socket){
	console.log('a user connected');

	todos.forEach(function (todo) {
		console.log('emitting todo', todo);
		socket.emit('todo added', todo);
	});

	socket.on('todo added', function (obj) {
		console.log('todo added', obj);
		var todo = {};
		for (var x in obj) {
			if (x == "due")
				todo[x] = new Date(obj[x]);
			else
				todo[x] = obj[x];
		}
		todo.id = todos[todos.length - 1].id + 1;
		todos.push(todo);

		io.emit('todo added', todo);
	});

	socket.on('todo updated', function (obj) {
		console.log('todo update call', obj);

		var todo = todos.filter(function (todo) {
			return todo.id == obj.id;
		})[0];

		for (var x in obj) {
			if (x == "due")
				obj[x] = todo[x] = new Date(obj[x]);
			else
				todo[x] = obj[x];
		}

		socket.broadcast.emit("todo updated", obj);
	});

	socket.on('todo removed', function (id) {
		console.log('todo removed', id);

		var todo = todos.filter(function (todo) {
			return todo.id == id;
		})[0];

		todos.splice(todos.indexOf(todo), 1);

		socket.broadcast.emit("todo removed", id);
	});
});













