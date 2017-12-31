var express    = require("express"),
    router     = express();

// Landing page route
router.get("/", function(req, res){res.render("landing");});

// Home page route
router.get('/home', function(req, res) {res.render('home');});

// Blog page route
router.get("/blog", function(req, res){res.render("blog");});

// Uni Talk page route
router.get("/uniTalk", function(req, res){res.render("uniTalk");});

// Ask / Offer page route
router.get("/askOffer", function(req, res){res.render("askOffer");});

// Study search page route
router.get("/studySearch", function(req, res){res.render("studySearch");});

// Show our vision page
router.get("/our_vision", function(req, res){res.render("our_vision");});

// Show about us page
router.get("/about_us", function(req, res){res.render("about_us");});

// Show FAQ page
router.get("/FAQ", function(req, res){res.render("FAQ");});

// Show contact us page
router.get("/contact_us", function(req, res){res.render("contact_us");});


module.exports = router;