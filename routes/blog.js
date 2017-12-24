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

router.get("/take-some-time-to-think-about-depression", function(req, res){
    res.render("blog/2016/02/22/blogformat");
});

router.get("/be-honest-about-sex-with-your-flatmates", function(req, res){
    res.render("blog/2016/02/24/blogformat");
});

router.get("/how-to-sleep-effectively-while-studying", function(req, res){
    res.render("blog/2016/02/28/blogformat");
});

router.get("/there-is-more-to-it-than-just-breakfast", function(req, res){
    res.render("blog/2016/03/06/blogformat");
});

router.get("/stop-wearing-skinny-jeans", function(req, res){
    res.render("blog/2016/03/10/blogformat");
});

router.get("/study-is-stressful-find-ways-to-manage-it", function(req, res){
    res.render("blog/2016/03/17/blogformat");
});

router.get("/what-to-consider-when-a-friend-stays-over-at-your-flat", function(req, res){
    res.render("blog/2016/03/25/blogformat");
});

router.get("/talk-to-a-recruitment-agent-and-start-your-career", function(req, res){
    res.render("blog/2016/03/31/blogformat");
});

router.get("/get-the-balance-right-with-part-time-work", function(req, res){
    res.render("blog/2016/04/07/blogformat");
});

router.get("/be-social-and-build-your-network", function(req, res){
    res.render("blog/2016/05/10/blogformat");
});

router.get("/ways-to-have-fun-outside-of-study", function(req, res){
    res.render("blog/2016/05/22/blogformat");
});

router.get("/take-on-the-challenge-to-correct-your-habits", function(req, res){
    res.render("blog/2016/05/31/blogformat");
});

router.get("/ideas-for-your-next-party", function(req, res){
    res.render("blog/2016/06/14/blogformat");
});

router.get("/what-is-a-fair-amount-to-pay-for-driving-on-a-trip", function(req, res){
    res.render("blog/2016/08/16/blogformat");
});

router.get("/find-your-flaws-and-learn-to-improve-on-them", function(req, res){
    res.render("blog/2016/09/18/blogformat");
});

router.get("/solving-the-toilet-shortage-problem-at-parties", function(req, res){
    res.render("blog/2016/09/25/blogformat");
});

router.get("/how-to-overcome-procrastination", function(req, res){
    res.render("blog/2016/11/28/blogformat");
});

router.get("/what-ideas-are-there-for-finding-part-time-work", function(req, res){
    res.render("blog/2017/03/25/blogformat");
});

module.exports = router;