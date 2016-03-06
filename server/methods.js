Meteor.methods({
    'request': function() {
		request = ProtectionOrderRequests.findOne({});
		return Handlebars.templates['request'](request);
    }
});
