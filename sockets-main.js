require.config({
	paths: {
		"knockout": "lib/knockout-3.1.0",
		"jquery": "lib/jquery-2.1.1.min",
		"ko-data": "lib/ko-data",
		"jquery-ui": "lib/jquery-ui.min",
		"io": "socket.io/socket.io.js"
	},
	shim: {
		"jquery": {
			exports: "$"
		},
		"jquery-ui": ["jquery"]
	},
	deps: []
});

require(["ko-data/config"], function (config, ToDo, ko, ToDoRepo, where) {
	config({
		repo: "ko-data/repo/sockets/Repo"
	});

	require([
		"domain/entities/ToDo", 
		"knockout", 
		"persistence/repos/ToDoRepo", 
		"ko-data/repo/sockets/where", 
		"app/bindings/date", 
		"app/components/toDoComponent", 
		"app/components/toDosComponent"], function (ToDo, ko, ToDoRepo, where) {
			window.ko = ko;
			var vm = {
				todos: ToDoRepo.where()
			};

			ko.applyBindings(vm);
		});
});