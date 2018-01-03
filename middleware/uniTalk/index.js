var Career               = require("../../app/models/uniTalk/career"),
    CareerComment        = require("../../app/models/uniTalk/careerComment"),
    FashionFemale        = require("../../app/models/uniTalk/fashionFemale"),
    FashionFemaleComment = require("../../app/models/uniTalk/fashionFemaleComment"),
    FashionMale          = require("../../app/models/uniTalk/fashionMale"),
    FashionMaleComment   = require("../../app/models/uniTalk/fashionMaleComment"),
    Flatting             = require("../../app/models/uniTalk/flatting"),
    FlattingComment      = require("../../app/models/uniTalk/flattingComment"),
    Food                 = require("../../app/models/uniTalk/food"),
    FoodComment          = require("../../app/models/uniTalk/foodComment"),
    Health               = require("../../app/models/uniTalk/health"),
    HealthComment        = require("../../app/models/uniTalk/healthComment"),
    Liquor               = require("../../app/models/uniTalk/liquor"),
    LiquorComment        = require("../../app/models/uniTalk/liquorComment"),
    Money                = require("../../app/models/uniTalk/money"),
    MoneyComment         = require("../../app/models/uniTalk/moneyComment"),
    Other                = require("../../app/models/uniTalk/other"),
    OtherComment         = require("../../app/models/uniTalk/otherComment"),
    PartTimeWork         = require("../../app/models/uniTalk/partTimeWork"),
    PartTimeWorkComment  = require("../../app/models/uniTalk/partTimeWorkComment"),
    Party                = require("../../app/models/uniTalk/party"),
    PartyComment         = require("../../app/models/uniTalk/partyComment"),
    Relationship         = require("../../app/models/uniTalk/relationship"),
    RelationshipComment  = require("../../app/models/uniTalk/relationshipComment"),
    Sex                  = require("../../app/models/uniTalk/sex"),
    SexComment           = require("../../app/models/uniTalk/sexComment"),
    Sport                = require("../../app/models/uniTalk/sport"),
    SportComment         = require("../../app/models/uniTalk/sportComment"),
    Study                = require("../../app/models/uniTalk/study"),
    StudyComment         = require("../../app/models/uniTalk/studyComment"),
    Vehicle              = require("../../app/models/uniTalk/vehicle"),
    VehicleComment       = require("../../app/models/uniTalk/vehicleComment");


// All the middleware goes here
var middlewareObj = {};

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

middlewareObj.checkCareerCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CareerComment.findById(req.params.comment_id, function(err, foundCareerComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundCareerComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkFashionFemaleCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FashionFemaleComment.findById(req.params.comment_id, function(err, foundFashionFemaleComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFashionFemaleComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkFashionMaleCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FashionMaleComment.findById(req.params.comment_id, function(err, foundFashionMaleComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFashionMaleComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkFlattingCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FlattingComment.findById(req.params.comment_id, function(err, foundFlattingComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFlattingComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkFoodCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FoodComment.findById(req.params.comment_id, function(err, foundFoodComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFoodComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkHealthCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HealthComment.findById(req.params.comment_id, function(err, foundHealthComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundHealthComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
        res.redirect("back");
        }
};

middlewareObj.checkLiquorOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Liquor.findById(req.params.id, function(err, foundLiquor){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundLiquor.author.id.equals(req.user._id)){
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

middlewareObj.checkLiquorCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        LiquorComment.findById(req.params.comment_id, function(err, foundLiquorComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundLiquorComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkMoneyCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        MoneyComment.findById(req.params.comment_id, function(err, foundMoneyComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundMoneyComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkOtherCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        OtherComment.findById(req.params.comment_id, function(err, foundOtherComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundOtherComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkPartTimeWorkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        PartTimeWorkComment.findById(req.params.comment_id, function(err, foundPartTimeWorkComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundPartTimeWorkComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkPartyCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        PartyComment.findById(req.params.comment_id, function(err, foundPartyComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundPartyComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkRelationshipCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        RelationshipComment.findById(req.params.comment_id, function(err, foundRelationshipComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundRelationshipComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkSexCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SexComment.findById(req.params.comment_id, function(err, foundSexComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundSexComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkSportCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SportComment.findById(req.params.comment_id, function(err, foundSportComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundSportComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkStudyCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        StudyComment.findById(req.params.comment_id, function(err, foundStudyComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundStudyComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
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

middlewareObj.checkVehicleCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        VehicleComment.findById(req.params.comment_id, function(err, foundVehicleComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundVehicleComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
        res.redirect("back");
        }
};

module.exports = middlewareObj;