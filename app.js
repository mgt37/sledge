var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    User           = require("./models/user"),  
    Topic          = require("./models/topic"),
    Comment        = require("./models/comment");
    //seedDB         = require("./seeds");
    
//Require Routes
var commentRoutes    = require("./routes/comments"),
    topicRoutes      = require("./routes/topics"),
    indexRoutes      = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/sledge";
mongoose.connect(url);
//mongoose.connect("mongodb://localhost/sledge", {useMongoClient: true} );

//mongoose.connect(process.env.DATABASEURL);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "The secret code",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/home", indexRoutes);
app.use("/topics", topicRoutes);
app.use("/topics/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Sledge server has started");
});