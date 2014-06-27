define(["knockout", "jquery", "jquery-ui"], function (ko, $) {
	ko.bindingHandlers.date = {
	    init: function(element, valueAccessor, allBindingsAccessor) {
	        //initialize datepicker with some optional options
	        var options = allBindingsAccessor().datepickerOptions || {},
	            $el = $(element);

	        $el.datepicker(options);

	        //handle the field changing
	        ko.utils.registerEventHandler(element, "change", function () {
	            var observable = valueAccessor();
	            observable($el.datepicker("getDate"));
	        });

	        //handle disposal (if KO removes by the template binding)
	        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	            $el.datepicker("destroy");
	        });

	    },
	    update: function(element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor()),
	            $el = $(element);

	        //handle date data coming via json from Microsoft
	        if (String(value).indexOf('/Date(') == 0) {
	            value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")));
	        }

	        var current = $el.datepicker("getDate");

	        if (value - current !== 0) {
	            $el.datepicker("setDate", value);
	        }
	    }
	};	
	// ko.bindingHandlers.date = {
	//     init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	//     	var val = valueAccessor(),
	//     		date;
	//     	$(element).datepicker({
	//     		onSelect: function () {
	//     			console.log('selected');
	//     			if (ko.isObservable(val)) {
	//     				val(date = $(this).datepicker("getDate"));
	//     			}
	//     		}
	//     	});
	//     	$(element).datepicker("setDate", ko.utils.unwrapObservable(val));
	//     	if (ko.isObservable(val)) {
	//     		val.subscribe(function (value) {
	//     			if (value !== date)
	//     				$(element).datepicker("setDate", value);
	//     		});
	//     	}
	//     },
	//     update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	//     }
	// };
});