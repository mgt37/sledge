var express    = require("express"),
    router     = express();

//Alcohol
router.get("/liquor", function(req, res){res.render("uniTalk/liquor/index");});

//Career
router.get("/career", function(req, res){res.render("uniTalk/career/index");});

//Fashion Female
router.get("/fashionFemale", function(req, res){res.render("uniTalk/fashionFemale/index");});

//Fashion Male
router.get("/fashionMale", function(req, res){res.render("uniTalk/fashionMale/index");});

//Flatting
router.get("/flatting", function(req, res){res.render("uniTalk/flatting/index");});

//Food
router.get("/food", function(req, res){res.render("uniTalk/food/index");});

//Health
router.get("/health", function(req, res){res.render("uniTalk/health/index");});

//Money
router.get("/money", function(req, res){res.render("uniTalk/money/index");});

//Other
router.get("/other", function(req, res){res.render("uniTalk/other/index");});

//Parties
router.get("/parties", function(req, res){res.render("uniTalk/parties/index");});

//Part Time Work
router.get("/partTimeWork", function(req, res){res.render("uniTalk/partTimeWork/index");});

//Relationships
router.get("/relationships", function(req, res){res.render("uniTalk/relationships/index");});

//Sex
router.get("/sex", function(req, res){res.render("uniTalk/sex/index");});

//Sport
router.get("/sport", function(req, res){res.render("uniTalk/sport/index");});

//Study
router.get("/study", function(req, res){res.render("uniTalk/study/index");});

//Vehicle
router.get("/vehicle", function(req, res){res.render("uniTalk/vehicle/index");});

module.exports = router;