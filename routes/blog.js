var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../app/models/user");

// Blog Posts

router.get("/hayfever-treatment-on-a-budget", function(req, res){
    res.render("blog/2016/01/28/blogformat");
});

router.get("/what-is-important-to-consider-when-looking-for-a-flat", function(req, res){
    res.render("blog/2016/01/31/blogformat");
});

router.get("/food-budget", function(req, res){
    res.render("blog/2016/02/01/blogformat");
});

router.get("/where-you-are-in-life-right-now-is-just-fine", function(req, res){
    res.render("blog/2016/02/05/blogformat");
});

router.get("/money-plan", function(req, res){
    res.render("blog/2016/02/14/blogformat");
});

module.exports = router;