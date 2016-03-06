Meteor.methods({
    'request': function() {
		request = ProtectionOrderRequests.findOne({});
		return Handlebars.templates['request'](request);
    },
    'order': function() {
		order = ProtectionOrderRequests.findOne({});
		return Handlebars.templates['order'](order);
    },
});
