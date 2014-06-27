define(["ko-data/entity/Entity", "ko-data/type/Number", "ko-data/type/String", "ko-data/type/Boolean", "ko-data/type/Date", "knockout"], function (Entity, Number, String, Boolean, DateType, ko) {
	var ToDo = Entity.extend({
		init: function () {
			this._super.apply(this, arguments);
			var _self = this;

			this.pastDue = ko.computed(function () {
				return !_self.isComplete() && ((_self.due() - new Date()) < 0);
			});

			this.dangerZone = ko.computed(function () {
				return !_self.isComplete() && ((_self.due() - new Date()) < 86400000);
			});
		},
		id: Number,
		message: String,
		isComplete: Boolean,
		due: DateType,
		uniqKey: "id"
	});	

	return ToDo;
});
