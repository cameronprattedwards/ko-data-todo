var express = require("express"),
	bodyParser = require("body-parser"),
	router = express.Router(),
	app = express();

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

console.log("router:", router);

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
});

router.delete("/todos/:todo", function (req, res) {
	console.log("delete", req.todo);
	todos.splice(todos.indexOf(req.todo), 1);
	res.send(req.todo);
});

app.use(bodyParser.json());
app.use("/api", router);
app.use(express.static(__dirname));

app.listen(8081);