define(["ko-data/repo/ajax/Repo", "domain/entities/ToDo"], function (Repo, ToDo) {
	var ToDoRepo = Repo.extend({
		entity: ToDo,
		entityName: "todo",
		pluralEntityName: "todos",
		baseUrl: "/api"
	});

	return new ToDoRepo();
});