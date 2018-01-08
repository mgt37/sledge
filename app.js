//Load dependencies
var express          = require('express'),
    app              = express(),
    google           = require('google'),
    mongoose         = require('mongoose'),
    flash            = require("connect-flash"),
    morgan           = require('morgan'),
    multer           = require('multer'),
    nodeMailer       = require('nodemailer'),
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
    socialPlacesRoutes = require('./routes/socialPlaces'),
    blogRoutes        = require('./routes/blog'),
    contactRoutes     = require('./routes/contact');
    
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
var aucklandAskRoutes                          = require('./routes/askOffer/aucklandAsk'),
    aucklandOfferRoutes                        = require('./routes/askOffer/aucklandOffer'),
    aucklandAskCommentRoutes                   = require('./routes/askOffer/aucklandAskComments'),
    aucklandOfferCommentRoutes                 = require('./routes/askOffer/aucklandOfferComments'),
    bayOfPlentyRegionAskRoutes                 = require('./routes/askOffer/bayOfPlentyRegionAsk'),
    bayOfPlentyRegionOfferRoutes               = require('./routes/askOffer/bayOfPlentyRegionOffer'),
    bayOfPlentyRegionAskCommentRoutes          = require('./routes/askOffer/bayOfPlentyRegionAskComments'),
    bayOfPlentyRegionOfferCommentRoutes        = require('./routes/askOffer/bayOfPlentyRegionOfferComments'),
    centralOtagoAskRoutes                      = require('./routes/askOffer/centralOtagoAsk'),
    centralOtagoOfferRoutes                    = require('./routes/askOffer/centralOtagoOffer'),
    centralOtagoAskCommentRoutes               = require('./routes/askOffer/centralOtagoAskComments'),
    centralOtagoOfferCommentRoutes             = require('./routes/askOffer/centralOtagoOfferComments'),
    christchurchAskRoutes                      = require('./routes/askOffer/christchurchAsk'),
    christchurchOfferRoutes                    = require('./routes/askOffer/christchurchOffer'),
    christchurchAskCommentRoutes               = require('./routes/askOffer/christchurchAskComments'),
    christchurchOfferCommentRoutes             = require('./routes/askOffer/christchurchOfferComments'),
    coastalOtagoAskRoutes                      = require('./routes/askOffer/coastalOtagoAsk'),
    coastalOtagoOfferRoutes                    = require('./routes/askOffer/coastalOtagoOffer'),
    coastalOtagoAskCommentRoutes               = require('./routes/askOffer/coastalOtagoAskComments'),
    coastalOtagoOfferCommentRoutes             = require('./routes/askOffer/coastalOtagoOfferComments'),
    dunedinAskRoutes                           = require('./routes/askOffer/dunedinAsk'),
    dunedinOfferRoutes                         = require('./routes/askOffer/dunedinOffer'),
    dunedinAskCommentRoutes                    = require('./routes/askOffer/dunedinAskComments'),
    dunedinOfferCommentRoutes                  = require('./routes/askOffer/dunedinOfferComments'),
    gisborneRegionAskRoutes                    = require('./routes/askOffer/gisborneRegionAsk'),
    gisborneRegionOfferRoutes                  = require('./routes/askOffer/gisborneRegionOffer'),
    gisborneRegionAskCommentRoutes             = require('./routes/askOffer/gisborneRegionAskComments'),
    gisborneRegionOfferCommentRoutes           = require('./routes/askOffer/gisborneRegionOfferComments'),
    hamiltonAskRoutes                          = require('./routes/askOffer/hamiltonAsk'),
    hamiltonOfferRoutes                        = require('./routes/askOffer/hamiltonOffer'),
    hamiltonAskCommentRoutes                   = require('./routes/askOffer/hamiltonAskComments'),
    hamiltonOfferCommentRoutes                 = require('./routes/askOffer/hamiltonOfferComments'),
    hawkesBayRegionAskRoutes                   = require('./routes/askOffer/hawkesBayRegionAsk'),
    hawkesBayRegionOfferRoutes                 = require('./routes/askOffer/hawkesBayRegionOffer'),
    hawkesBayRegionAskCommentRoutes            = require('./routes/askOffer/hawkesBayRegionAskComments'),
    hawkesBayRegionOfferCommentRoutes          = require('./routes/askOffer/hawkesBayRegionOfferComments'),
    manawatuWanganuiRegionAskRoutes            = require('./routes/askOffer/manawatuWanganuiRegionAsk'),
    manawatuWanganuiRegionOfferRoutes          = require('./routes/askOffer/manawatuWanganuiRegionOffer'),
    manawatuWanganuiRegionAskCommentRoutes     = require('./routes/askOffer/manawatuWanganuiRegionAskComments'),
    manawatuWanganuiRegionOfferCommentRoutes   = require('./routes/askOffer/manawatuWanganuiRegionOfferComments'),
    nelsonMarlboroughRegionAskRoutes           = require('./routes/askOffer/nelsonMarlboroughRegionAsk'),
    nelsonMarlboroughRegionOfferRoutes         = require('./routes/askOffer/nelsonMarlboroughRegionOffer'),
    nelsonMarlboroughRegionAskCommentRoutes    = require('./routes/askOffer/nelsonMarlboroughRegionAskComments'),
    nelsonMarlboroughRegionOfferCommentRoutes  = require('./routes/askOffer/nelsonMarlboroughRegionOfferComments'),
    northlandRegionAskRoutes                   = require('./routes/askOffer/northlandRegionAsk'),
    northlandRegionOfferRoutes                 = require('./routes/askOffer/northlandRegionOffer'),
    northlandRegionAskCommentRoutes            = require('./routes/askOffer/northlandRegionAskComments'),
    northlandRegionOfferCommentRoutes          = require('./routes/askOffer/northlandRegionOfferComments'),
    southCanterburyAskRoutes                   = require('./routes/askOffer/southCanterburyAsk'),
    southCanterburyOfferRoutes                 = require('./routes/askOffer/southCanterburyOffer'),
    southCanterburyAskCommentRoutes            = require('./routes/askOffer/southCanterburyAskComments'),
    southCanterburyOfferCommentRoutes          = require('./routes/askOffer/southCanterburyOfferComments'),
    southlandRegionAskRoutes                   = require('./routes/askOffer/southlandRegionAsk'),
    southlandRegionOfferRoutes                 = require('./routes/askOffer/southlandRegionOffer'),
    southlandRegionAskCommentRoutes            = require('./routes/askOffer/southlandRegionAskComments'),
    southlandRegionOfferCommentRoutes          = require('./routes/askOffer/southlandRegionOfferComments'),
    taranakiRegionAskRoutes                    = require('./routes/askOffer/taranakiRegionAsk'),
    taranakiRegionOfferRoutes                  = require('./routes/askOffer/taranakiRegionOffer'),
    taranakiRegionAskCommentRoutes             = require('./routes/askOffer/taranakiRegionAskComments'),
    taranakiRegionOfferCommentRoutes           = require('./routes/askOffer/taranakiRegionOfferComments'),
    waikatoRegionAskRoutes                     = require('./routes/askOffer/waikatoRegionAsk'),
    waikatoRegionOfferRoutes                   = require('./routes/askOffer/waikatoRegionOffer'),
    waikatoRegionAskCommentRoutes              = require('./routes/askOffer/waikatoRegionAskComments'),
    waikatoRegionOfferCommentRoutes            = require('./routes/askOffer/waikatoRegionOfferComments'),
    wellingtonAskRoutes                        = require('./routes/askOffer/wellingtonAsk'),
    wellingtonOfferRoutes                      = require('./routes/askOffer/wellingtonOffer'),
    wellingtonAskCommentRoutes                 = require('./routes/askOffer/wellingtonAskComments'),
    wellingtonOfferCommentRoutes               = require('./routes/askOffer/wellingtonOfferComments'),
    wellingtonRegionAskRoutes                  = require('./routes/askOffer/wellingtonRegionAsk'),
    wellingtonRegionOfferRoutes                = require('./routes/askOffer/wellingtonRegionOffer'),
    wellingtonRegionAskCommentRoutes           = require('./routes/askOffer/wellingtonRegionAskComments'),
    wellingtonRegionOfferCommentRoutes         = require('./routes/askOffer/wellingtonRegionOfferComments'),
    westCoastRegionAskRoutes                   = require('./routes/askOffer/westCoastRegionAsk'),
    westCoastRegionOfferRoutes                 = require('./routes/askOffer/westCoastRegionOffer'),
    westCoastRegionAskCommentRoutes            = require('./routes/askOffer/westCoastRegionAskComments'),
    westCoastRegionOfferCommentRoutes          = require('./routes/askOffer/westCoastRegionOfferComments');
    
// blog routes - require    
var beHonestAboutSexCommentRoutes               = require('./routes/blog/beHonestAboutSexComment');
var buildYourNetworkCommentRoutes               = require('./routes/blog/buildYourNetworkComment');
var findYourFlawsCommentRoutes                  = require('./routes/blog/findYourFlawsComment');
var foodBudgetCommentRoutes                     = require('./routes/blog/foodBudgetComment');
var balancePartTimeWorkCommentRoutes            = require('./routes/blog/balancePartTimeWorkComment');
var hayfeverTreatmentCommentRoutes              = require('./routes/blog/hayfeverTreatmentComment');
var overcomeProcrastinationCommentRoutes        = require('./routes/blog/overcomeProcrastinationComment');
var sleepEffectivelyCommentRoutes               = require('./routes/blog/sleepEffectivelyComment');
var partyIdeasCommentRoutes                     = require('./routes/blog/partyIdeasComment');
var moneyPlanCommentRoutes                      = require('./routes/blog/moneyPlanComment');
var toiletShortageAtPartiesCommentRoutes        = require('./routes/blog/toiletShortageAtPartiesComment');
var stopWearingSkinnyJeansCommentRoutes         = require('./routes/blog/stopWearingSkinnyJeansComment');
var studyIsStressfulCommentRoutes               = require('./routes/blog/studyIsStressfulComment');
var correctYourHabitsCommentRoutes              = require('./routes/blog/correctYourHabitsComment');
var thinkAboutDepressionCommentRoutes           = require('./routes/blog/thinkAboutDepressionComment');
var talkToARecruitmentAgentCommentRoutes        = require('./routes/blog/talkToARecruitmentAgentComment');
var moreThanJustBreakfastCommentRoutes          = require('./routes/blog/moreThanJustBreakfastComment');
var funOutsideOfStudyCommentRoutes              = require('./routes/blog/funOutsideOfStudyComment');
var findingPartTimeWorkCommentRoutes            = require('./routes/blog/findingPartTimeWorkComment');
var payForDrivingOnATripCommentRoutes           = require('./routes/blog/payForDrivingOnATripComment');
var lookingForAFlatCommentRoutes                = require('./routes/blog/lookingForAFlatComment');
var friendStaysOverAtFlatCommentRoutes          = require('./routes/blog/friendStaysOverAtFlatComment'); 
var whereYouAreInLifeCommentRoutes              = require('./routes/blog/whereYouAreInLifeComment'); 
    
   require('./config/passport')(passport); // pass passport for configuration 
   
//------------------------------------------------------------------------------
// MULTER - move to separate file -- START
//------------------------------------------------------------------------------   
 
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
// MULTER - move to separate file -- END
//------------------------------------------------------------------------------

//Connect to mongo database
var url = process.env.DATABASEURL || "mongodb://localhost/sledge";
mongoose.connect(url, {useMongoClient: true} );

mongoose.connect(process.env.DATABASEURL);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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
app.use("/", socialPlacesRoutes);
/*app.use("/home", indexRoutes);*/
app.use("/blog", blogRoutes);
app.use("/topics", topicRoutes);
app.use("/topics/:id/comments", commentRoutes);
app.use("/", contactRoutes);

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
app.use("/askOffer/auckland/ask/:id/aucklandAskComments", aucklandAskCommentRoutes);
app.use("/askOffer/auckland/offer/:id/aucklandOfferComments", aucklandOfferCommentRoutes);
app.use("/askOffer/bayOfPlentyRegion/ask", bayOfPlentyRegionAskRoutes);
app.use("/askOffer/bayOfPlentyRegion/offer", bayOfPlentyRegionOfferRoutes);
app.use("/askOffer/bayOfPlentyRegion/ask/:id/bayOfPlentyRegionAskComments", bayOfPlentyRegionAskCommentRoutes);
app.use("/askOffer/bayOfPlentyRegion/offer/:id/bayOfPlentyRegionOfferComments", bayOfPlentyRegionOfferCommentRoutes);
app.use("/askOffer/centralOtago/ask", centralOtagoAskRoutes);
app.use("/askOffer/centralOtago/offer", centralOtagoOfferRoutes);
app.use("/askOffer/centralOtago/ask/:id/centralOtagoAskComments", centralOtagoAskCommentRoutes);
app.use("/askOffer/centralOtago/offer/:id/centralOtagoOfferComments", centralOtagoOfferCommentRoutes);
app.use("/askOffer/christchurch/ask", christchurchAskRoutes);
app.use("/askOffer/christchurch/offer", christchurchOfferRoutes);
app.use("/askOffer/christchurch/ask/:id/christchurchAskComments", christchurchAskCommentRoutes);
app.use("/askOffer/christchurch/offer/:id/christchurchOfferComments", christchurchOfferCommentRoutes);
app.use("/askOffer/coastalOtago/ask", coastalOtagoAskRoutes);
app.use("/askOffer/coastalOtago/offer", coastalOtagoOfferRoutes);
app.use("/askOffer/coastalOtago/ask/:id/coastalOtagoAskComments", coastalOtagoAskCommentRoutes);
app.use("/askOffer/coastalOtago/offer/:id/coastalOtagoOfferComments", coastalOtagoOfferCommentRoutes);
app.use("/askOffer/dunedin/ask", dunedinAskRoutes);
app.use("/askOffer/dunedin/offer", dunedinOfferRoutes);
app.use("/askOffer/dunedin/ask/:id/dunedinAskComments", dunedinAskCommentRoutes);
app.use("/askOffer/dunedin/offer/:id/dunedinOfferComments", dunedinOfferCommentRoutes);
app.use("/askOffer/gisborneRegion/ask", gisborneRegionAskRoutes);
app.use("/askOffer/gisborneRegion/offer", gisborneRegionOfferRoutes);
app.use("/askOffer/gisborneRegion/ask/:id/gisborneRegionAskComments", gisborneRegionAskCommentRoutes);
app.use("/askOffer/gisborneRegion/offer/:id/gisborneRegionOfferComments", gisborneRegionOfferCommentRoutes);
app.use("/askOffer/hamilton/ask", hamiltonAskRoutes);
app.use("/askOffer/hamilton/offer", hamiltonOfferRoutes);
app.use("/askOffer/hamilton/ask/:id/hamiltonAskComments", hamiltonAskCommentRoutes);
app.use("/askOffer/hamilton/offer/:id/hamiltonOfferComments", hamiltonOfferCommentRoutes);
app.use("/askOffer/hawkesBayRegion/ask", hawkesBayRegionAskRoutes);
app.use("/askOffer/hawkesBayRegion/offer", hawkesBayRegionOfferRoutes);
app.use("/askOffer/hawkesBayRegion/ask/:id/hawkesBayRegionAskComments", hawkesBayRegionAskCommentRoutes);
app.use("/askOffer/hawkesBayRegion/offer/:id/hawkesBayRegionOfferComments", hawkesBayRegionOfferCommentRoutes);
app.use("/askOffer/manawatuWanganuiRegion/ask", manawatuWanganuiRegionAskRoutes);
app.use("/askOffer/manawatuWanganuiRegion/offer", manawatuWanganuiRegionOfferRoutes);
app.use("/askOffer/manawatuWanganuiRegion/ask/:id/manawatuWanganuiRegionAskComments", manawatuWanganuiRegionAskCommentRoutes);
app.use("/askOffer/manawatuWanganuiRegion/offer/:id/manawatuWanganuiRegionOfferComments", manawatuWanganuiRegionOfferCommentRoutes);
app.use("/askOffer/nelsonMarlboroughRegion/ask", nelsonMarlboroughRegionAskRoutes);
app.use("/askOffer/nelsonMarlboroughRegion/offer", nelsonMarlboroughRegionOfferRoutes);
app.use("/askOffer/nelsonMarlboroughRegion/ask/:id/nelsonMarlboroughRegionAskComments", nelsonMarlboroughRegionAskCommentRoutes);
app.use("/askOffer/nelsonMarlboroughRegion/offer/:id/nelsonMarlboroughRegionOfferComments", nelsonMarlboroughRegionOfferCommentRoutes);
app.use("/askOffer/northlandRegion/ask", northlandRegionAskRoutes);
app.use("/askOffer/northlandRegion/offer", northlandRegionOfferRoutes);
app.use("/askOffer/northlandRegion/ask/:id/northlandRegionAskComments", northlandRegionAskCommentRoutes);
app.use("/askOffer/northlandRegion/offer/:id/northlandRegionOfferComments", northlandRegionOfferCommentRoutes);
app.use("/askOffer/southCanterbury/ask", southCanterburyAskRoutes);
app.use("/askOffer/southCanterbury/offer", southCanterburyOfferRoutes);
app.use("/askOffer/southCanterbury/ask/:id/southCanterburyAskComments", southCanterburyAskCommentRoutes);
app.use("/askOffer/southCanterbury/offer/:id/southCanterburyOfferComments", southCanterburyOfferCommentRoutes);
app.use("/askOffer/southlandRegion/ask", southlandRegionAskRoutes);
app.use("/askOffer/southlandRegion/offer", southlandRegionOfferRoutes);
app.use("/askOffer/southlandRegion/ask/:id/southlandRegionAskComments", southlandRegionAskCommentRoutes);
app.use("/askOffer/southlandRegion/offer/:id/southlandRegionOfferComments", southlandRegionOfferCommentRoutes);
app.use("/askOffer/taranakiRegion/ask", taranakiRegionAskRoutes);
app.use("/askOffer/taranakiRegion/offer", taranakiRegionOfferRoutes);
app.use("/askOffer/taranakiRegion/ask/:id/taranakiRegionAskComments", taranakiRegionAskCommentRoutes);
app.use("/askOffer/taranakiRegion/offer/:id/taranakiRegionOfferComments", taranakiRegionOfferCommentRoutes);
app.use("/askOffer/waikatoRegion/ask", waikatoRegionAskRoutes);
app.use("/askOffer/waikatoRegion/offer", waikatoRegionOfferRoutes);
app.use("/askOffer/waikatoRegion/ask/:id/waikatoRegionAskComments", waikatoRegionAskCommentRoutes);
app.use("/askOffer/waikatoRegion/offer/:id/waikatoRegionOfferComments", waikatoRegionOfferCommentRoutes);
app.use("/askOffer/wellington/ask", wellingtonAskRoutes);
app.use("/askOffer/wellington/offer", wellingtonOfferRoutes);
app.use("/askOffer/wellington/ask/:id/wellingtonAskComments", wellingtonAskCommentRoutes);
app.use("/askOffer/wellington/offer/:id/wellingtonOfferComments", wellingtonOfferCommentRoutes);
app.use("/askOffer/wellingtonRegion/ask", wellingtonRegionAskRoutes);
app.use("/askOffer/wellingtonRegion/offer", wellingtonRegionOfferRoutes);
app.use("/askOffer/wellingtonRegion/ask/:id/wellingtonRegionAskComments", wellingtonRegionAskCommentRoutes);
app.use("/askOffer/wellingtonRegion/offer/:id/wellingtonRegionOfferComments", wellingtonRegionOfferCommentRoutes);
app.use("/askOffer/westCoastRegion/ask", westCoastRegionAskRoutes);
app.use("/askOffer/westCoastRegion/offer", westCoastRegionOfferRoutes);
app.use("/askOffer/westCoastRegion/ask/:id/westCoastRegionAskComments", westCoastRegionAskCommentRoutes);
app.use("/askOffer/westCoastRegion/offer/:id/westCoastRegionOfferComments", westCoastRegionOfferCommentRoutes);

//Blog routes
app.use("/blog/beHonestAboutSexWithYourFlatmates", beHonestAboutSexCommentRoutes);
app.use("/blog/beSocialAndBuildYourNetwork", buildYourNetworkCommentRoutes);
app.use("/blog/findYourFlawsAndLearnToImproveOnThem", findYourFlawsCommentRoutes);
app.use("/blog/foodBudget", foodBudgetCommentRoutes);
app.use("/blog/getTheBalanceRightWithPartTimeWork", balancePartTimeWorkCommentRoutes);
app.use("/blog/hayfeverTreatmentOnABudget", hayfeverTreatmentCommentRoutes);
app.use("/blog/howToOvercomeProcrastination", overcomeProcrastinationCommentRoutes);
app.use("/blog/howToSleepEffectivelyWhileStudying", sleepEffectivelyCommentRoutes);
app.use("/blog/ideasForYourNextParty", partyIdeasCommentRoutes);
app.use("/blog/moneyPlan", moneyPlanCommentRoutes);
app.use("/blog/solvingTheToiletShortageProblemAtParties", toiletShortageAtPartiesCommentRoutes);
app.use("/blog/stopWearingSkinnyJeans", stopWearingSkinnyJeansCommentRoutes);
app.use("/blog/studyIsStressfulFindWaysToManageIt", studyIsStressfulCommentRoutes);
app.use("/blog/takeOnTheChallengeToCorrectYourHabits", correctYourHabitsCommentRoutes);
app.use("/blog/takeSomeTimeToThinkAboutDepression", thinkAboutDepressionCommentRoutes);
app.use("/blog/talkToARecruitmentAgentAndStartYourCareer", talkToARecruitmentAgentCommentRoutes);
app.use("/blog/thereIsMoreToItThanJustBreakfast", moreThanJustBreakfastCommentRoutes);
app.use("/blog/waysToHaveFunOutsideOfStudy", funOutsideOfStudyCommentRoutes);
app.use("/blog/whatIdeasAreThereForFindingPartTimeWork", findingPartTimeWorkCommentRoutes);
app.use("/blog/whatIsAFairAmountToPayForDrivingOnATrip", payForDrivingOnATripCommentRoutes);
app.use("/blog/whatIsImportantToConsiderWhenLookingForAFlat", lookingForAFlatCommentRoutes);
app.use("/blog/whatToConsiderWhenAFriendStaysOverAtYourFlat", friendStaysOverAtFlatCommentRoutes);
app.use("/blog/whereYouAreInLifeRightNowIsJustFine", whereYouAreInLifeCommentRoutes);

require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

/*app.listen(3000,function(){
console.log("Express Started on Port 3000");
});*/

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Sledge server has started");
});