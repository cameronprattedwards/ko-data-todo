define(["knockout", "domain/entities/ToDo", "persistence/repos/ToDoRepo"], function (ko, ToDo, ToDoRepo) {
	function ToDosComponent(viewModel) {
		this.viewModel = viewModel;
	}

	ToDosComponent.prototype = {
		addNew: function () {
			this.viewModel.todos.push(new ToDo());
		},
		remove: function (todo) {
			var _self = this;

			ToDoRepo.remove(todo).done(function () {
				_self.viewModel.todos.remove(todo);
			});
		}
	};

	ko.bindingHandlers.toDosComponent = {
	    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	    	var component = new ToDosComponent(ko.utils.unwrapObservable(valueAccessor())),
	    		innerBindingContext = bindingContext.extend({ component: component });

	    	ko.applyBindingsToDescendants(innerBindingContext, element);

	    	return { controlsDescendantBindings: true };
	    },
	    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {}
	};

	ko.virtualElements.allowedBindings.toDosComponent = true;
});