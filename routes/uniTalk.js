var express    = require("express"),
    router     = express();

//Alcohol
router.get("/alcohol", function(req, res){res.render("uniTalk/alcohol");});
    
//Career
router.get("/career", function(req, res){res.render("uniTalk/career");});

//Fashion Female
router.get("/fashionFemale", function(req, res){res.render("uniTalk/fashionFemale");});

//Fashion Male
router.get("/fashionMale", function(req, res){res.render("uniTalk/fashionMale");});

//Flatting
router.get("/flatting", function(req, res){res.render("uniTalk/flatting");});

//Food
router.get("/food", function(req, res){res.render("uniTalk/food");});

//Health
router.get("/health", function(req, res){res.render("uniTalk/health");});

//Money
router.get("/money", function(req, res){res.render("uniTalk/money");});

//Other
router.get("/other", function(req, res){res.render("uniTalk/other");});

//Parties
router.get("/parties", function(req, res){res.render("uniTalk/parties");});

//Part Time Work
router.get("/partTimeWork", function(req, res){res.render("uniTalk/partTimeWork");});

//Relationships
router.get("/relationships", function(req, res){res.render("uniTalk/relationships");});

//Sex
router.get("/sex", function(req, res){res.render("uniTalk/sex");});

//Sport
router.get("/study", function(req, res){res.render("uniTalk/study");});

//Study
router.get("/study", function(req, res){res.render("uniTalk/study");});

//Vehicle
router.get("/vehicle", function(req, res){res.render("uniTalk/vehicle");});


module.exports = router;