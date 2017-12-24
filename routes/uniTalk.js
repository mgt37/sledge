var express    = require("express"),
    router     = express();

//Alcohol
router.get("/alcohol", function(req, res){res.render("uniTalk/alcohol/index");});
    
//Career
router.get("/career", function(req, res){res.render("uniTalk/career/index");});

//Fashion Female
router.get("/fashionFemale", function(req, res){res.render("uniTalk/fashionFemale/fashionFemale");});

//Fashion Male
router.get("/fashionMale", function(req, res){res.render("uniTalk/fashionMale/fashionMale");});

//Flatting
router.get("/flatting", function(req, res){res.render("uniTalk/flatting/flatting");});

//Food
router.get("/food", function(req, res){res.render("uniTalk/food/food");});

//Health
router.get("/health", function(req, res){res.render("uniTalk/health/health");});

//Money
router.get("/money", function(req, res){res.render("uniTalk/money/money");});

//Other
router.get("/other", function(req, res){res.render("uniTalk/other/other");});

//Parties
router.get("/parties", function(req, res){res.render("uniTalk/parties/parties");});

//Part Time Work
router.get("/partTimeWork", function(req, res){res.render("uniTalk/partTimeWork/partTimeWork");});

//Relationships
router.get("/relationships", function(req, res){res.render("uniTalk/relationships/relationships");});

//Sex
router.get("/sex", function(req, res){res.render("uniTalk/sex/sex");});

//Sport
router.get("/sport", function(req, res){res.render("uniTalk/sport/sport");});

//Study
router.get("/study", function(req, res){res.render("uniTalk/study/study");});

//Vehicle
router.get("/vehicle", function(req, res){res.render("uniTalk/vehicle/vehicle");});

module.exports = router;