var Alcohol           = require("../../app/models/uniTalk/alcohol"),
    Career            = require("../../app/models/uniTalk/career"),
    FashionFemale     = require("../../app/models/uniTalk/fashionFemale"),
    FashionMale       = require("../../app/models/uniTalk/fashionMale"),
    Flatting          = require("../../app/models/uniTalk/flatting"),
    Food              = require("../../app/models/uniTalk/food"),
    Health            = require("../../app/models/uniTalk/health"),
    Money             = require("../../app/models/uniTalk/money"),
    Other             = require("../../app/models/uniTalk/other"),
    PartTimeWork      = require("../../app/models/uniTalk/partTimeWork"),
    Party             = require("../../app/models/uniTalk/party"),
    Relationship      = require("../../app/models/uniTalk/relationship"),
    Sex               = require("../../app/models/uniTalk/sex"),
    Sport             = require("../../app/models/uniTalk/sport"),
    Study             = require("../../app/models/uniTalk/study"),
    Vehicle           = require("../../app/models/uniTalk/vehicle");
    

// All the middleware goes here
var middlewareObj = {};

middlewareObj.checkAlcoholOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Alcohol.findById(req.params.id, function(err, foundAlcohol){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundAlcohol.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkCareerOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Career.findById(req.params.id, function(err, foundCareer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundCareer.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkFashionFemaleOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FashionFemale.findById(req.params.id, function(err, foundFashionFemale){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundFashionFemale.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkFashionMaleOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FashionMale.findById(req.params.id, function(err, foundFashionMale){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundFashionMale.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkFlattingOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Flatting.findById(req.params.id, function(err, foundFlatting){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundFlatting.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkFoodOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Food.findById(req.params.id, function(err, foundFood){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundFood.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkHealthOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Health.findById(req.params.id, function(err, foundHealth){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundHealth.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkMoneyOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Money.findById(req.params.id, function(err, foundMoney){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundMoney.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkOtherOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Other.findById(req.params.id, function(err, foundOther){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundOther.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkPartTimeWorkOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        PartTimeWork.findById(req.params.id, function(err, foundPartTimeWork){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundPartTimeWork.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkPartyOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Party.findById(req.params.id, function(err, foundParty){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundParty.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkRelationshipOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Relationship.findById(req.params.id, function(err, foundRelationship){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundRelationship.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkSexOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Sex.findById(req.params.id, function(err, foundSex){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundSex.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkSportOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Sport.findById(req.params.id, function(err, foundSport){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundSport.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkStudyOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Study.findById(req.params.id, function(err, foundStudy){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundStudy.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

middlewareObj.checkVehicleOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Vehicle.findById(req.params.id, function(err, foundVehicle){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundVehicle.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        }
};

module.exports = middlewareObj;