define(["knockout", "persistence/repos/ToDoRepo", "jquery"], function (ko, ToDoRepo, $) {
	function ToDoComponent(viewModel, element) {
		this.viewModel = viewModel;
		var $el = this.element = $(element),
			$h2 = $el.find("h2"),
			$input = $h2.find("input"),
			$span = $h2.find("span"),
			editing = viewModel.isNew();

		if (editing) {
			$h2.addClass("editing");
			$input.focus();
		}

		window.myViewModel = viewModel;


		var _self = this;
		this.viewModel.isComplete.subscribe(function () {
			if (_self.viewModel.isComplete.isDirty())
				_self.saveViewModel();
		});

		this.viewModel.due.subscribe(function () {
			if (_self.viewModel.due.isDirty())
				_self.saveViewModel();
		});

		this.viewModel.message.subscribe(function () {
			if (_self.viewModel.message.isDirty())
				_self.saveViewModel();
		});

    	$span.on("dblclick", function () {
    		if (!editing) {
    			editing = true;
    			$h2.addClass("editing");
    			$input.focus();
    		}
    	});

    	$input.on("change blur", function () {
    		if (editing) {
    			editing = false;
    			$h2.removeClass("editing");
    		}
    	});		
	}

	ToDoComponent.prototype = {
		saveViewModel: function () {
			ToDoRepo.add(this.viewModel);
			ToDoRepo.save();
		},
		log: function (data) {
			console.log(arguments);
		}
	};

	ko.bindingHandlers.toDoComponent = {
	    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	    	var component = new ToDoComponent(ko.utils.unwrapObservable(valueAccessor()), element),
	    		innerBindingContext = bindingContext.extend({ component: component });

	    	ko.applyBindingsToDescendants(innerBindingContext, element);

	    	return { controlsDescendantBindings: true };
	    },
	    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {}
	};

	ko.virtualElements.allowedBindings.toDoComponent = true;
});