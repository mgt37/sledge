//Load dependencies
var express          = require("express"),
    app              = express(),
    /*port             = process.env.PORT || 8080,*/
    mongoose         = require('mongoose'),
    session          = require('express-session'),
    flash            = require("connect-flash"),
    morgan           = require('morgan'),
    cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'),
    passport         = require('passport'),
    /*passport         = require('./config/passport'),*/
    configAuth       = require('./config/auth'),
    LocalStrategy    = require('passport-local').Strategy,
    /*OpenIDStrategy   = require('passport-openid').Strategy,*/
    /*OAuthStrategy    = require('passport-oauth').OAuthStrategy,*/
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy  = require('passport-twitter').Strategy,
    GoogleStrategy   = require('passport-google-oauth20').Strategy,
    /*GoogleStrategy   = require('passport-google-oauth').Auth20Strategy,*/
    methodOverride   = require('method-override'),
    User             = require('./app/models/user'),  
    Topic            = require('./app/models/topic'),
    Comment          = require('./app/models/comment');
    
//Require Routes
var commentRoutes    = require('./routes/comments'),
    topicRoutes      = require('./routes/topics'),
    indexRoutes      = require('./routes/index'),
    /*appRoutes        = require('./routes/login'),*/
    blogRoutes       = require('./routes/blog');
    
   
   require('./config/passport')(passport); // pass passport for configuration 

//Connect to mongo database
var url = process.env.DATABASEURL || "mongodb://localhost/sledge";
mongoose.connect(url, {useMongoClient: true} );

mongoose.connect(process.env.DATABASEURL);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
/*app.use(bodyParser());*/ // get information from html forms

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "The secret code",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
/*passport.use(new LocalStrategy(User.authenticate()));*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error     = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});






// Use Routes
app.use("/", indexRoutes);
app.use("/home", indexRoutes);
app.use("/blog", blogRoutes);
app.use("/topics", topicRoutes);
app.use("/topics/:id/comments", commentRoutes);
/*app.use("/", appRoutes);*/

require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

/*  require('./app/routes');*/
  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Sledge server has started");
});