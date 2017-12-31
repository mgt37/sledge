var express    = require("express"),
    router     = express();

router.get("/askOffer/northlandRegion", function(req, res){res.render("askOffer/northlandRegion");});

router.get("/askOffer/auckland", function(req, res){res.render("askOffer/auckland");});

router.get("/askOffer/waikatoRegion", function(req, res){res.render("askOffer/waikatoRegion");});

router.get("/askOffer/bayOfPlentyRegion", function(req, res){res.render("askOffer/bayOfPlentyRegion");});

router.get("/askOffer/hamilton", function(req, res){res.render("askOffer/hamilton");});

router.get("/askOffer/gisborneRegion", function(req, res){res.render("askOffer/gisborneRegion");});

router.get("/askOffer/taranakiRegion", function(req, res){res.render("askOffer/taranakiRegion");});

router.get("/askOffer/hawkesBayRegion", function(req, res){res.render("askOffer/hawkesBayRegion");});

router.get("/askOffer/manawatuWanganuiRegion", function(req, res){res.render("askOffer/manawatuWanganuiRegion");});

router.get("/askOffer/wellingtonRegion", function(req, res){res.render("askOffer/wellingtonRegion");});

router.get("/askOffer/wellington", function(req, res){res.render("askOffer/wellington");});

router.get("/askOffer/nelsonMarlboroughRegion", function(req, res){res.render("askOffer/nelsonMarlboroughRegion");});

router.get("/askOffer/westCoastRegion", function(req, res){res.render("askOffer/westCoastRegion");});

router.get("/askOffer/christchurch", function(req, res){res.render("askOffer/christchurch");});

router.get("/askOffer/southCanterbury", function(req, res){res.render("askOffer/southCanterbury");});

router.get("/askOffer/centralOtago", function(req, res){res.render("askOffer/centralOtago");});

router.get("/askOffer/coastalOtago", function(req, res){res.render("askOffer/coastalOtago");});

router.get("/askOffer/dunedin", function(req, res){res.render("askOffer/dunedin");});

router.get("/askOffer/southlandRegion", function(req, res){res.render("askOffer/southlandRegion");});

module.exports = router;