//Load dependencies
var express          = require('express'),
    app              = express(),
    mongoose         = require('mongoose'),
    /*session          = require('express-session'),*/
    flash            = require("connect-flash"),
    morgan           = require('morgan'),
    cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'),
    passport         = require('passport'),
    methodOverride   = require('method-override'),
    User             = require('./app/models/user'); 

//Require Routes
var commentRoutes    = require('./routes/comments'),
    topicRoutes      = require('./routes/topics'),
    indexRoutes      = require('./routes/index'),
    blogRoutes       = require('./routes/blog');
    
// Uni Talk routes - require    
/*var uniTalkRoutes    = require('./routes/uniTalk');*/
var alcoholRoutes         = require('./routes/uniTalk/alcohol'),
    careerRoutes          = require('./routes/uniTalk/careers'),
    fashionFemaleRoutes   = require('./routes/uniTalk/fashionFemale'),
    fashionMaleRoutes     = require('./routes/uniTalk/fashionMale'),
    flattingRoutes        = require('./routes/uniTalk/flatting'),
    foodRoutes            = require('./routes/uniTalk/food'),
    healthRoutes          = require('./routes/uniTalk/health'),
    moneyRoutes           = require('./routes/uniTalk/money'),
    otherRoutes           = require('./routes/uniTalk/other'),
    partyRoutes           = require('./routes/uniTalk/parties'),
    partTimeWorkRoutes    = require('./routes/uniTalk/partTimeWork'),
    relationshipRoutes    = require('./routes/uniTalk/relationships'),
    sexRoutes             = require('./routes/uniTalk/sex'),
    sportRoutes           = require('./routes/uniTalk/sports'),
    studyRoutes           = require('./routes/uniTalk/study'),
    vehicleRoutes         = require('./routes/uniTalk/vehicle');
    
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


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "The secret code",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
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

//Uni Talk routes - use
/*app.use("/uniTalk", uniTalkRoutes);*/
app.use("/uniTalk/alcohol", alcoholRoutes);
app.use("/uniTalk/career", careerRoutes);
app.use("/uniTalk/fashionFemale", fashionFemaleRoutes);
app.use("/uniTalk/fashionMale", fashionMaleRoutes);
app.use("/uniTalk/flatting", flattingRoutes);
app.use("/uniTalk/food", foodRoutes);
app.use("/uniTalk/health", healthRoutes);
app.use("/uniTalk/money", moneyRoutes);
app.use("/uniTalk/other", otherRoutes);
app.use("/uniTalk/partTimeWork", partTimeWorkRoutes);
app.use("/uniTalk/party", partyRoutes);
app.use("/uniTalk/relationship", relationshipRoutes);
app.use("/uniTalk/sex", sexRoutes);
app.use("/uniTalk/sport", sportRoutes);
app.use("/uniTalk/study", studyRoutes);
app.use("/uniTalk/vehicle", vehicleRoutes);


require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Sledge server has started");
});