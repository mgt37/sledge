var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../app/models/user");

// Blog Sections

router.get("/sections/alcohol", function(req, res){
    res.render("blog/sections/alcohol");
});

router.get("/sections/career", function(req, res){
    res.render("blog/sections/career");
});

router.get("/sections/fashionFemale", function(req, res){
    res.render("blog/sections/fashionFemale");
});

router.get("/sections/fashionMale", function(req, res){
    res.render("blog/sections/fashionMale");
});

router.get("/sections/food", function(req, res){
    res.render("blog/sections/food");
});

router.get("/sections/flatting", function(req, res){
    res.render("blog/sections/flatting");
});

router.get("/sections/health", function(req, res){
    res.render("blog/sections/health");
});

router.get("/sections/money", function(req, res){
    res.render("blog/sections/money");
});

router.get("/sections/partTimeWork", function(req, res){
    res.render("blog/sections/partTimeWork");
});

router.get("/sections/parties", function(req, res){
    res.render("blog/sections/parties");
});

router.get("/sections/relationships", function(req, res){
    res.render("blog/sections/relationships");
});

router.get("/sections/sex", function(req, res){
    res.render("blog/sections/sex");
});

router.get("/sections/sport", function(req, res){
    res.render("blog/sections/sport");
});

router.get("/sections/study", function(req, res){
    res.render("blog/sections/study");
});

router.get("/sections/vehicle", function(req, res){
    res.render("blog/sections/vehicle");
});

router.get("/sections/other", function(req, res){
    res.render("blog/sections/other");
});


// Blog Posts

router.get("/posts/hayfeverTreatmentOnABudget", function(req, res){
    res.render("blog/posts/hayfeverTreatmentOnABudget/index");
});

router.get("/posts/whatIsImportantToConsiderWhenLookingForAFlat", function(req, res){
    res.render("blog/posts/whatIsImportantToConsiderWhenLookingForAFlat/index");
});

router.get("/posts/foodBudget", function(req, res){
    res.render("blog/posts/foodBudget/index");
});

router.get("/posts/whereYouAreInLifeRightNowIsJustFine", function(req, res){
    res.render("blog/posts/whereYouAreInLifeRightNowIsJustFine/index");
});

router.get("/posts/moneyPlan", function(req, res){
    res.render("blog/posts/moneyPlan/index");
});

router.get("/posts/takeSomeTimeToThinkAboutDepression", function(req, res){
    res.render("blog/posts/takeSomeTimeToThinkAboutDepression/index");
});

router.get("/posts/bHASWYF", function(req, res){
    res.render("blog/posts/bHASWYF/index");
});

router.get("/posts/howToSleepEffectivelyWhileStudying", function(req, res){
    res.render("blog/posts/howToSleepEffectivelyWhileStudying/index");
});

router.get("/posts/thereIsMoreToItThanJustBreakfast", function(req, res){
    res.render("blog/posts/thereIsMoreToItThanJustBreakfast/index");
});

router.get("/posts/stopWearingSkinnyJeans", function(req, res){
    res.render("blog/posts/stopWearingSkinnyJeans/index");
});

router.get("/posts/studyIsStressfulFindWaysToManageIt", function(req, res){
    res.render("blog/posts/studyIsStressfulFindWaysToManageIt/index");
});

router.get("/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat", function(req, res){
    res.render("blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat/index");
});

router.get("/posts/talkToARecruitmentAgentAndStartYourCareer", function(req, res){
    res.render("blog/posts/talkToARecruitmentAgentAndStartYourCareer/index");
});

router.get("/posts/getTheBalanceRightWithPartTimeWork", function(req, res){
    res.render("blog/posts/getTheBalanceRightWithPartTimeWork/index");
});

router.get("/posts/beSocialAndBuildYourNetwork", function(req, res){
    res.render("blog/posts/beSocialAndBuildYourNetwork/index");
});

router.get("/posts/waysToHaveFunOutsideOfStudy", function(req, res){
    res.render("blog/posts/waysToHaveFunOutsideOfStudy/index");
});

router.get("/posts/takeOnTheChallengeToCorrectYourHabits", function(req, res){
    res.render("blog/posts/takeOnTheChallengeToCorrectYourHabits/index");
});

router.get("/posts/ideasForYourNextParty", function(req, res){
    res.render("blog/posts/ideasForYourNextParty/index");
});

router.get("/posts/whatIsAFairAmountToPayForDrivingOnATrip", function(req, res){
    res.render("blog/posts/whatIsAFairAmountToPayForDrivingOnATrip/index");
});

router.get("/posts/findYourFlawsAndLearnToImproveOnThem", function(req, res){
    res.render("blog/posts/findYourFlawsAndLearnToImproveOnThem/index");
});

router.get("/posts/solvingTheToiletShortageProblemAtParties", function(req, res){
    res.render("blog/posts/solvingTheToiletShortageProblemAtParties/index");
});

router.get("/posts/howToOvercomeProcrastination", function(req, res){
    res.render("blog/posts/howToOvercomeProcrastination/index");
});

router.get("/posts/whatIdeasAreThereForFindingPartTimeWork", function(req, res){
    res.render("blog/posts/whatIdeasAreThereForFindingPartTimeWork/index");
});

module.exports = router;