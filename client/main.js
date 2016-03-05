/////////////////
// Routes
/////////////////

// set up the main template the the router will use to build pages
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
// specify the top level route, the page users see when they arrive at the site
Router.route('/', function () {
  this.render("navbar", {to:"header"});
  if(Meteor.user()) {
	this.render("request_form", {to:"main"});

	var doc = ProtectionOrderRequests.findOne({});

	if(!doc) {
		console.log("nodoc");
		doc = example
		ProtectionOrderRequests.insert(doc);
		doc = ProtectionOrderRequests.findOne({});
	} 
	Session.set("doc", doc);

  } else {
  	this.render("please_login", {to:"main"});
  }
});

//////////////////
// accounts config
/////////
Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
});

//////////////////
// Helper
//////////////////

  function nextPage() {
      Session.set('page', Session.get('page') + 1);
      if (Session.get('page') > Session.get('pageCount')) {
        Session.set('page', 1);
        Session.set('step', Session.get('step') + 1);
        Session.set('pageCount', pagesPerStep[Session.get('step')]);
        $('ul.tabs').tabs('select_tab', 'step' + Session.get('step'));
        console.log('advancing to next step');
      }

      if (skipThisPage()) {
        nextPage();
      }
  }

  function previousPage() {
      Session.set('page', Session.get('page') - 1);
      if (Session.get('page') == 0) {
        Session.set('step', Session.get('step') - 1);
        Session.set('pageCount', pagesPerStep[Session.get('step')]);
        Session.set('page', Session.get('pageCount'));
        $('ul.tabs').tabs('select_tab', 'step' + Session.get('step'));
        console.log('backing up');
      }

      if (skipThisPage()) {
        previousPage();
      }
  }

  function skipThisPage() {
    var doc = Session.get('doc');
    var step = Session.get('step');
    var page = Session.get('page');
    if (!Session.get('children') && step == 3 && page == 2)
      return true;

    return false;
  }

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.request_form.events({
    'change input': function(e) {
      var id = Session.get('doc')._id;

      var dest = $(e.target).data('pos');
      var value = $(e.target).val();
      if ($(e.target).attr('type') == 'checkbox') {
        value = $(e.target).attr('checked');
      }
      console.log(dest);
      console.log(value);
      console.log(e);
      var change = {};
      change[dest] = value;
      ProtectionOrderRequests.update(id, {$set: change} );
    },
    'click .tabs a': function(e) {
      // update the page an step after the user manually clicks on a tab
      if (e.toElement) {
        var hash = e.toElement.hash;
        Session.set('page', 1);
        Session.set('step', parseInt(hash[hash.length - 1]));
        Session.set('pageCount', pagesPerStep[Session.get('step')]);
      }
    },
    'click #hasOtherNames': function () {
      Session.set('hasOtherNames', !Session.get('hasOtherNames')); //toggle
    },
    'click #children': function () {
      Session.set('children', !Session.get('children')); //toggle
    },
    'click .next': function () {
      nextPage();
    },
    'click .back': function () {
      previousPage();
    }
  });

  Template.request_form.rendered = function() {
    var doc = Session.get("doc");
    Session.set('hasOtherNames', false);
    Session.set('children', doc.relationship.children.length > 0);
    Session.set('step', 1);
    Session.set('page', 1);
    Session.set('pageCount', pagesPerStep[Session.get('step')]);
    $(document).ready(function(){
      $('ul.tabs').tabs({ fx: { direction: 'left' } });
    });
  };

  Template.step_2.rendered = function() {
    $(document).ready(function(){
      console.log('123aa');
      $('select').material_select();
    });
  };

  Template.registerHelper('isPage', function (n) {
      return Session.get('page') == n;
  });

  Template.registerHelper('session', function (name) {
      return Session.get(name);
  });

