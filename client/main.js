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
  this.render("hello", {to:"main"});  
});

//////////////////
// accounts config
/////////
Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
});
