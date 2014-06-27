define(["knockout", "jquery", "jquery-ui"], function (ko, $) {
	ko.bindingHandlers.date = {
	    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	    	$(element).datepicker({
	    		onSelect: function () {
	    			console.log('selected');
	    			if (ko.isObservable(valueAccessor())) {
	    				valueAccessor()($(this).datepicker("getDate"));
	    			}
	    		}
	    	});
	    	$(element).datepicker("setDate", ko.utils.unwrapObservable(valueAccessor()));
	    },
	    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	    }
	};
});