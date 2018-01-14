var express    = require("express"),
    router     = express();

router.get("/askOffer/northlandRegion/index", function(req, res){res.render("askOffer/northlandRegion/index");});

router.get("/askOffer/auckland/index", function(req, res){res.render("askOffer/auckland/index");});

router.get("/askOffer/waikatoRegion/index", function(req, res){res.render("askOffer/waikatoRegion/index");});

router.get("/askOffer/bayOfPlentyRegion/index", function(req, res){res.render("askOffer/bayOfPlentyRegion/index");});

router.get("/askOffer/hamilton/index", function(req, res){res.render("askOffer/hamilton/index");});

router.get("/askOffer/gisborneRegion/index", function(req, res){res.render("askOffer/gisborneRegion/index");});

router.get("/askOffer/taranakiRegion/index", function(req, res){res.render("askOffer/taranakiRegion/index");});

router.get("/askOffer/hawkesBayRegion/index", function(req, res){res.render("askOffer/hawkesBayRegion/index");});

router.get("/askOffer/manawatuWhanganuiRegion/index", function(req, res){res.render("askOffer/manawatuWhanganuiRegion/index");});

router.get("/askOffer/wellingtonRegion/index", function(req, res){res.render("askOffer/wellingtonRegion");});

router.get("/askOffer/wellington/index", function(req, res){res.render("askOffer/wellington/index");});

router.get("/askOffer/nelsonMarlboroughRegion/index", function(req, res){res.render("askOffer/nelsonMarlboroughRegion/index");});

router.get("/askOffer/westCoastRegion/index", function(req, res){res.render("askOffer/westCoastRegion/index");});

router.get("/askOffer/christchurch/index", function(req, res){res.render("askOffer/christchurch/index");});

router.get("/askOffer/southCanterbury/index", function(req, res){res.render("askOffer/southCanterbury/index");});

router.get("/askOffer/centralOtago/index", function(req, res){res.render("askOffer/centralOtago/index");});

router.get("/askOffer/coastalOtago/index", function(req, res){res.render("askOffer/coastalOtago/index");});

router.get("/askOffer/dunedin/index", function(req, res){res.render("askOffer/dunedin/index");});

router.get("/askOffer/southlandRegion/index", function(req, res){res.render("askOffer/southlandRegion/index");});

module.exports = router;