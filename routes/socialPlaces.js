var express    = require("express"),
    router     = express();

router.get("/socialPlaces/whangarei/index", function(req, res){res.render("socialPlaces/whangarei/index");});

router.get("/socialPlaces/auckland/index", function(req, res){res.render("socialPlaces/auckland/index");});

router.get("/socialPlaces/tauranga/index", function(req, res){res.render("socialPlaces/tauranga/index");});

router.get("/socialPlaces/hamilton/index", function(req, res){res.render("socialPlaces/hamilton/index");});

router.get("/socialPlaces/rotorua/index", function(req, res){res.render("socialPlaces/rotorua/index");});

router.get("/socialPlaces/gisborne/index", function(req, res){res.render("socialPlaces/gisborne/index");});

router.get("/socialPlaces/newPlymouth/index", function(req, res){res.render("socialPlaces/newPlymouth/index");});

router.get("/socialPlaces/napier/index", function(req, res){res.render("socialPlaces/napier/index");});

router.get("/socialPlaces/hastings/index", function(req, res){res.render("socialPlaces/hastings/index");});

router.get("/socialPlaces/whanganui/index", function(req, res){res.render("socialPlaces/whanganui/index");});

router.get("/socialPlaces/palmerstonNorth/index", function(req, res){res.render("socialPlaces/palmerstonNorth");});

router.get("/socialPlaces/wellington/index", function(req, res){res.render("socialPlaces/wellington/index");});

router.get("/socialPlaces/nelson/index", function(req, res){res.render("socialPlaces/nelson/index");});

router.get("/socialPlaces/christchurch/index", function(req, res){res.render("socialPlaces/christchurch/index");});

router.get("/socialPlaces/timaru/index", function(req, res){res.render("socialPlaces/timaru/index");});

router.get("/socialPlaces/queenstown/index", function(req, res){res.render("socialPlaces/queenstown/index");});

router.get("/socialPlaces/dunedin/index", function(req, res){res.render("socialPlaces/dunedin/index");});

router.get("/socialPlaces/invercargill/index", function(req, res){res.render("socialPlaces/invercargill/index");});

module.exports = router;