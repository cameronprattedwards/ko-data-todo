require.config({
	paths: {
		"knockout": "lib/knockout-3.1.0",
		"jquery": "lib/jquery-2.1.1.min",
		"ko-data": "lib/ko-data",
		"jquery-ui": "lib/jquery-ui.min"
	},
	shim: {
		"jquery": {
			exports: "$"
		},
		"jquery-ui": ["jquery"]
	},
	deps: []
});

require([
	"domain/entities/ToDo", 
	"knockout", 
	"persistence/repos/ToDoRepo", 
	"ko-data/repo/ajax/where", 
	"app/bindings/date", 
	"app/components/toDoComponent", 
	"app/components/toDosComponent"
	], function (ToDo, ko, ToDoRepo, where) {
	var vm = {
		todos: ToDoRepo.where()
	};

	ko.applyBindings(vm);

});