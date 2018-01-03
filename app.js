//Load dependencies
var express          = require('express'),
    app              = express(),
    google           = require('google'),
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
 
// Content Filter    
var filter = require('content-filter');
app.use(filter());
    
//Require Routes
var commentRoutes     = require('./routes/comments'),
    topicRoutes       = require('./routes/topics'),
    indexRoutes       = require('./routes/index'),
    askOfferRoutes    = require('./routes/askOffer'),
    studySearchRoutes = require('./routes/studySearch'),
    blogRoutes        = require('./routes/blog'),
    emailRoutes       = require('./routes/email');
    
// Uni Talk routes - require    
var careerRoutes                 = require('./routes/uniTalk/careers'),
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
    liquorRoutes                 = require('./routes/uniTalk/liquor'),
    liquorCommentRoutes          = require('./routes/uniTalk/liquorComments'),
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
    
// Ask offer routes - require
var aucklandAskRoutes                   = require('./routes/askOffer/aucklandAsk'),
    aucklandOfferRoutes                 = require('./routes/askOffer/aucklandOffer'),
    bayOfPlentyRegionAskRoutes          = require('./routes/askOffer/bayOfPlentyRegionAsk'),
    bayOfPlentyRegionOfferRoutes        = require('./routes/askOffer/bayOfPlentyRegionOffer'),
    centralOtagoAskRoutes               = require('./routes/askOffer/centralOtagoAsk'),
    centralOtagoOfferRoutes             = require('./routes/askOffer/centralOtagoOffer'),
    christchurchAskRoutes               = require('./routes/askOffer/christchurchAsk'),
    christchurchOfferRoutes             = require('./routes/askOffer/christchurchOffer'),
    coastalOtagoAskRoutes               = require('./routes/askOffer/coastalOtagoAsk'),
    coastalOtagoOfferRoutes             = require('./routes/askOffer/coastalOtagoOffer'),
    dunedinAskRoutes                    = require('./routes/askOffer/dunedinAsk'),
    dunedinOfferRoutes                  = require('./routes/askOffer/dunedinOffer'),
    gisborneRegionAskRoutes             = require('./routes/askOffer/gisborneRegionAsk'),
    gisborneRegionOfferRoutes           = require('./routes/askOffer/gisborneRegionOffer'),
    hamiltonAskRoutes                   = require('./routes/askOffer/hamiltonAsk'),
    hamiltonOfferRoutes                 = require('./routes/askOffer/hamiltonOffer'),
    hawkesBayRegionAskRoutes            = require('./routes/askOffer/hawkesBayRegionAsk'),
    hawkesBayRegionOfferRoutes          = require('./routes/askOffer/hawkesBayRegionOffer'),
    manawatuWanganuiRegionAskRoutes     = require('./routes/askOffer/manawatuWanganuiRegionAsk'),
    manawatuWanganuiRegionOfferRoutes   = require('./routes/askOffer/manawatuWanganuiRegionOffer'),
    nelsonMarlboroughRegionAskRoutes    = require('./routes/askOffer/nelsonMarlboroughRegionAsk'),
    nelsonMarlboroughRegionOfferRoutes  = require('./routes/askOffer/nelsonMarlboroughRegionOffer'),
    northlandRegionAskRoutes            = require('./routes/askOffer/northlandRegionAsk'),
    northlandRegionOfferRoutes          = require('./routes/askOffer/northlandRegionOffer'),
    southCanterburyAskRoutes            = require('./routes/askOffer/southCanterburyAsk'),
    southCanterburyOfferRoutes          = require('./routes/askOffer/southCanterburyOffer'),
    southlandRegionAskRoutes            = require('./routes/askOffer/southlandRegionAsk'),
    southlandRegionOfferRoutes          = require('./routes/askOffer/southlandRegionOffer'),
    taranakiRegionAskRoutes             = require('./routes/askOffer/taranakiRegionAsk'),
    taranakiRegionOfferRoutes           = require('./routes/askOffer/taranakiRegionOffer'),
    waikatoRegionAskRoutes              = require('./routes/askOffer/waikatoRegionAsk'),
    waikatoRegionOfferRoutes            = require('./routes/askOffer/waikatoRegionOffer'),
    wellingtonAskRoutes                 = require('./routes/askOffer/wellingtonAsk'),
    wellingtonOfferRoutes               = require('./routes/askOffer/wellingtonOffer'),
    wellingtonRegionAskRoutes           = require('./routes/askOffer/wellingtonRegionAsk'),
    wellingtonRegionOfferRoutes         = require('./routes/askOffer/wellingtonRegionOffer'),
    westCoastRegionAskRoutes            = require('./routes/askOffer/westCoastRegionAsk'),
    westCoastRegionOfferRoutes          = require('./routes/askOffer/westCoastRegionOffer');
    
// blog routes - require    
var hayfeverTreatmentCommentRoutes             = require('./routes/blog/hayfeverTreatmentComments');    
var lookingForAFlatCommentRoutes             = require('./routes/blog/lookingForAFlatComments');    
    
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
app.use("/", askOfferRoutes);
app.use("/", studySearchRoutes);
app.use("/home", indexRoutes);
app.use("/blog", blogRoutes);
app.use("/topics", topicRoutes);
app.use("/topics/:id/comments", commentRoutes);
app.use("/", emailRoutes);

//Uni Talk routes
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
app.use("/uniTalk/liquor", liquorRoutes);
app.use("/uniTalk/liquor/:id/liquorComments", liquorCommentRoutes);
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

//Ask Offer routes
app.use("/askOffer/auckland/ask", aucklandAskRoutes);
app.use("/askOffer/auckland/offer", aucklandOfferRoutes);
app.use("/askOffer/bayOfPlentyRegion/ask", bayOfPlentyRegionAskRoutes);
app.use("/askOffer/bayOfPlentyRegion/offer", bayOfPlentyRegionOfferRoutes);
app.use("/askOffer/centralOtago/ask", centralOtagoAskRoutes);
app.use("/askOffer/centralOtago/offer", centralOtagoOfferRoutes);
app.use("/askOffer/christchurch/ask", christchurchAskRoutes);
app.use("/askOffer/christchurch/offer", christchurchOfferRoutes);
app.use("/askOffer/coastalOtago/ask", coastalOtagoAskRoutes);
app.use("/askOffer/coastalOtago/offer", coastalOtagoOfferRoutes);
app.use("/askOffer/dunedin/ask", dunedinAskRoutes);
app.use("/askOffer/dunedin/offer", dunedinOfferRoutes);
app.use("/askOffer/gisborneRegion/ask", gisborneRegionAskRoutes);
app.use("/askOffer/gisborneRegion/offer", gisborneRegionOfferRoutes);
app.use("/askOffer/hamilton/ask", hamiltonAskRoutes);
app.use("/askOffer/hamilton/offer", hamiltonOfferRoutes);
app.use("/askOffer/hawkesBayRegion/ask", hawkesBayRegionAskRoutes);
app.use("/askOffer/hawkesBayRegion/offer", hawkesBayRegionOfferRoutes);
app.use("/askOffer/manawatuWanganuiRegion/ask", manawatuWanganuiRegionAskRoutes);
app.use("/askOffer/manawatuWanganuiRegion/offer", manawatuWanganuiRegionOfferRoutes);
app.use("/askOffer/nelsonMarlboroughRegion/ask", nelsonMarlboroughRegionAskRoutes);
app.use("/askOffer/nelsonMarlboroughRegion/offer", nelsonMarlboroughRegionOfferRoutes);
app.use("/askOffer/northlandRegion/ask", northlandRegionAskRoutes);
app.use("/askOffer/northlandRegion/offer", northlandRegionOfferRoutes);
app.use("/askOffer/southCanterbury/ask", southCanterburyAskRoutes);
app.use("/askOffer/southCanterbury/offer", southCanterburyOfferRoutes);
app.use("/askOffer/southlandRegion/ask", southlandRegionAskRoutes);
app.use("/askOffer/southlandRegion/offer", southlandRegionOfferRoutes);
app.use("/askOffer/taranakiRegion/ask", taranakiRegionAskRoutes);
app.use("/askOffer/taranakiRegion/offer", taranakiRegionOfferRoutes);
app.use("/askOffer/waikatoRegion/ask", waikatoRegionAskRoutes);
app.use("/askOffer/waikatoRegion/offer", waikatoRegionOfferRoutes);
app.use("/askOffer/wellington/ask", wellingtonAskRoutes);
app.use("/askOffer/wellington/offer", wellingtonOfferRoutes);
app.use("/askOffer/wellingtonRegion/ask", wellingtonRegionAskRoutes);
app.use("/askOffer/wellingtonRegion/offer", wellingtonRegionOfferRoutes);
app.use("/askOffer/westCoastRegion/ask", westCoastRegionAskRoutes);
app.use("/askOffer/westCoastRegion/offer", westCoastRegionOfferRoutes);

//Ask Offer routes
app.use("/blog/hayfever-treatment-on-a-budget", hayfeverTreatmentCommentRoutes);
app.use("/blog/what-is-important-to-consider-when-looking-for-a-flat", lookingForAFlatCommentRoutes);

require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

/*app.listen(3000,function(){
console.log("Express Started on Port 3000");
});*/

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Sledge server has started");
});