//Load dependencies
var express          = require('express'),
    app              = express(),
    mongoose         = require('mongoose'),
    flash            = require("connect-flash"),
    morgan           = require('morgan'),
    multer           = require('multer'),
    /*nodeMailer       = require('nodemailer'),*/
    path             = require('path'),
    timestamp        = require('time-stamp'),
    cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'),
    passport         = require('passport'),
    methodOverride   = require('method-override'),
    User             = require('./app/models/user');
    
//Require Routes
var commentRoutes    = require('./routes/comments'),
    topicRoutes      = require('./routes/topics'),
    indexRoutes      = require('./routes/index'),
    blogRoutes       = require('./routes/blog'),
    emailRoutes      = require('./routes/email');
    
// Uni Talk routes - require    
/*var uniTalkRoutes    = require('./routes/uniTalk');*/
var alcoholRoutes                = require('./routes/uniTalk/alcohol'),
    alcoholCommentRoutes         = require('./routes/uniTalk/alcoholComments'),
    careerRoutes                 = require('./routes/uniTalk/careers'),
    careerCommentRoutes          = require('./routes/uniTalk/careerComments'),
    fashionFemaleRoutes          = require('./routes/uniTalk/fashionFemale'),
    fashionFemaleCommentRoutes   = require('./routes/uniTalk/fashionFemaleComments'),
    fashionMaleRoutes            = require('./routes/uniTalk/fashionMale'),
    fashionMaleCommentRoutes     = require('./routes/uniTalk/fashionMaleComments'),
    flattingRoutes               = require('./routes/uniTalk/flatting'),
    flattingCommentRoutes        = require('./routes/uniTalk/flattingComments'),
    foodRoutes                   = require('./routes/uniTalk/food'),
    foodCommentRoutes            = require('./routes/uniTalk/foodComments'),
    healthRoutes                 = require('./routes/uniTalk/health'),
    healthCommentRoutes          = require('./routes/uniTalk/healthComments'),
    moneyRoutes                  = require('./routes/uniTalk/money'),
    moneyCommentRoutes           = require('./routes/uniTalk/moneyComments'),
    otherRoutes                  = require('./routes/uniTalk/other'),
    otherCommentRoutes           = require('./routes/uniTalk/otherComments'),
    partyRoutes                  = require('./routes/uniTalk/parties'),
    partyCommentRoutes           = require('./routes/uniTalk/partyComments'),
    partTimeWorkRoutes           = require('./routes/uniTalk/partTimeWork'),
    partTimeWorkCommentRoutes    = require('./routes/uniTalk/partTimeWorkComments'),
    relationshipRoutes           = require('./routes/uniTalk/relationships'),
    relationshipCommentRoutes    = require('./routes/uniTalk/relationshipComments'),
    sexRoutes                    = require('./routes/uniTalk/sex'),
    sexCommentRoutes             = require('./routes/uniTalk/sexComments'),
    sportRoutes                  = require('./routes/uniTalk/sports'),
    sportCommentRoutes           = require('./routes/uniTalk/sportComments'),
    studyRoutes                  = require('./routes/uniTalk/study'),
    studyCommentRoutes           = require('./routes/uniTalk/studyComments'),
    vehicleRoutes                = require('./routes/uniTalk/vehicle'),
    vehicleCommentRoutes         = require('./routes/uniTalk/vehicleComments');
    
   require('./config/passport')(passport); // pass passport for configuration 
   
// MULTER - move to separate file ---------------------------------------------- 
// Set storage engine
var storage =   multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// Initialise upload
var upload = multer({ 
    storage : storage,
    limits:{filesize: 5000000},
    fileFilter: function(req, file, callback){
        checkFileType(file, callback);
    }
}).single('image');

//Check File Type
function checkFileType(file, callback){
    // Allowed extensions
    var filetypes =/jpeg|jpg|png|gif/;
    // Check extensions
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    var mimetype = filetypes.test(file.mimetype);
    
    if(mimetype && extname){
        return callback(null, true);
    } else {
        callback('Error: Images Only!')
    }
}

/*app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
   */
//------------------------------------------------------------------------------   
   
   

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
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

// Use Routes
app.use("/", indexRoutes);
app.use("/home", indexRoutes);
app.use("/blog", blogRoutes);
app.use("/topics", topicRoutes);
app.use("/topics/:id/comments", commentRoutes);
app.use("/", emailRoutes);

//Uni Talk routes
/*app.use("/uniTalk", uniTalkRoutes);*/
app.use("/uniTalk/alcohol", alcoholRoutes);
app.use("/uniTalk/alcohol/:id/alcoholComments", alcoholCommentRoutes);
app.use("/uniTalk/career", careerRoutes);
app.use("/uniTalk/career/:id/careerComments", careerCommentRoutes);
app.use("/uniTalk/fashionFemale", fashionFemaleRoutes);
app.use("/uniTalk/fashionFemale/:id/fashionFemaleComments", fashionFemaleCommentRoutes);
app.use("/uniTalk/fashionMale", fashionMaleRoutes);
app.use("/uniTalk/fashionMale/:id/fashionMaleComments", fashionMaleCommentRoutes);
app.use("/uniTalk/flatting", flattingRoutes);
app.use("/uniTalk/flatting/:id/flattingComments", flattingCommentRoutes);
app.use("/uniTalk/food", foodRoutes);
app.use("/uniTalk/food/:id/foodComments", foodCommentRoutes);
app.use("/uniTalk/health", healthRoutes);
app.use("/uniTalk/health/:id/healthComments", healthCommentRoutes);
app.use("/uniTalk/money", moneyRoutes);
app.use("/uniTalk/money/:id/moneyComments", moneyCommentRoutes);
app.use("/uniTalk/other", otherRoutes);
app.use("/uniTalk/other/:id/otherComments", otherCommentRoutes);
app.use("/uniTalk/partTimeWork", partTimeWorkRoutes);
app.use("/uniTalk/partTimeWork/:id/partTimeWorkComments", partTimeWorkCommentRoutes);
app.use("/uniTalk/party", partyRoutes);
app.use("/uniTalk/party/:id/partyComments", partyCommentRoutes);
app.use("/uniTalk/relationship", relationshipRoutes);
app.use("/uniTalk/relationship/:id/relationshipComments", relationshipCommentRoutes);
app.use("/uniTalk/sex", sexRoutes);
app.use("/uniTalk/sex/:id/sexComments", sexCommentRoutes);
app.use("/uniTalk/sport", sportRoutes);
app.use("/uniTalk/sport/:id/sportComments", sportCommentRoutes);
app.use("/uniTalk/study", studyRoutes);
app.use("/uniTalk/study/:id/studyComments", studyCommentRoutes);
app.use("/uniTalk/vehicle", vehicleRoutes);
app.use("/uniTalk/vehicle/:id/vehicleComments", vehicleCommentRoutes);

require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

/*app.listen(3000,function(){
console.log("Express Started on Port 3000");
});*/

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Sledge server has started");
});