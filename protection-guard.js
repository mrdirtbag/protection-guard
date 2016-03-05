pagesPerStep = [undefined, 2, 2, 2];

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click .tab a': function(e) {
      // update the page an step after the user manually clicks on a tab
      var hash = e.toElement.hash;
      Session.set('page', 1);
      Session.set('step', parseInt(hash[hash.length - 1]));
    },
    'click #hasOtherNames': function () {
      Session.set('hasOtherNames', !Session.get('hasOtherNames')); //toggle
    },
    'click .next': function () {
      // go to next page
      Session.set('page', Session.get('page') + 1);
      if (Session.get('page') > pagesPerStep[Session.get('step')]) {
        Session.set('page', 1);
        Session.set('step', Session.get('step') + 1);
        $('ul.tabs').tabs('select_tab', 'step' + Session.get('step'));
        console.log('advancing to next step');
      }
    }
  });

  Template.hello.rendered = function() {
    Session.set('hasOtherNames', false)
    Session.set('step', 1);
    Session.set('page', 1);
    $(document).ready(function(){
      $('ul.tabs').tabs({ fx: { direction: 'left' } });
    });
  };

  Template.hello.helpers({
    session: function (name) {
      return Session.get(name);
    },
    isPage: function (n) {
      return Session.get('page') == n;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}