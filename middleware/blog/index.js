var BHASWYF                        = require('../../app/models/blog/bHASWYF');
var BuildYourNetworkComment               = require('../../app/models/blog/buildYourNetworkComment');
var FindYourFlawsComment                  = require('../../app/models/blog/findYourFlawsComment');
var FoodBudgetComment                     = require('../../app/models/blog/foodBudgetComment');
var BalancePartTimeWorkComment            = require('../../app/models/blog/balancePartTimeWorkComment');
var HayfeverTreatmentComment              = require('../../app/models/blog/hayfeverTreatmentComment');
var OvercomeProcrastinationComment        = require('../../app/models/blog/overcomeProcrastinationComment');
var SleepEffectivelyComment               = require('../../app/models/blog/sleepEffectivelyComment');
var PartyIdeasComment                     = require('../../app/models/blog/partyIdeasComment');
var MoneyPlanComment                      = require('../../app/models/blog/moneyPlanComment');
var ToiletShortageAtPartiesComment        = require('../../app/models/blog/toiletShortageAtPartiesComment');
var StopWearingSkinnyJeansComment         = require('../../app/models/blog/stopWearingSkinnyJeansComment');
var StudyIsStressfulComment               = require('../../app/models/blog/studyIsStressfulComment');
var CorrectYourHabitsComment              = require('../../app/models/blog/correctYourHabitsComment');
var ThinkAboutDepressionComment           = require('../../app/models/blog/thinkAboutDepressionComment');
var TalkToARecruitmentAgentComment        = require('../../app/models/blog/talkToARecruitmentAgentComment');
var MoreThanJustBreakfastComment          = require('../../app/models/blog/moreThanJustBreakfastComment');
var FunOutsideOfStudyComment              = require('../../app/models/blog/funOutsideOfStudyComment');
var FindingPartTimeWorkComment            = require('../../app/models/blog/findingPartTimeWorkComment');
var PayForDrivingOnATripComment           = require('../../app/models/blog/payForDrivingOnATripComment');
var LookingForAFlatComment                = require('../../app/models/blog/lookingForAFlatComment');
var FriendStaysOverAtFlatComment          = require('../../app/models/blog/friendStaysOverAtFlatComment'); 
var WhereYouAreInLifeComment              = require('../../app/models/blog/whereYouAreInLifeComment'); 

// All the middleware goes here
var middlewareObj = {};

middlewareObj.checkBHASWYFOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        BHASWYF.findById(req.params.id, function(err, foundBHASWYF){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundBHASWYF.author.id.equals(req.user._id)){
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

middlewareObj.checkBuildYourNetworkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        BuildYourNetworkComment.findById(req.params.id, function(err, foundBuildYourNetworkComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundBuildYourNetworkComment.author.id.equals(req.user._id)){
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

middlewareObj.checkFindYourFlawsCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FindYourFlawsComment.findById(req.params.id, function(err, foundFindYourFlawsComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFindYourFlawsComment.author.id.equals(req.user._id)){
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

middlewareObj.checkFoodBudgetCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FoodBudgetComment.findById(req.params.id, function(err, foundFoodBudgetComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFoodBudgetComment.author.id.equals(req.user._id)){
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

middlewareObj.checkBalancePartTimeWorkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        BalancePartTimeWorkComment.findById(req.params.id, function(err, foundBalancePartTimeWorkComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundBalancePartTimeWorkComment.author.id.equals(req.user._id)){
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

middlewareObj.checkHayfeverTreatmentCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HayfeverTreatmentComment.findById(req.params.id, function(err, foundHayfeverTreatmentComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundHayfeverTreatmentComment.author.id.equals(req.user._id)){
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

middlewareObj.checkOvercomeProcrastinationCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        OvercomeProcrastinationComment.findById(req.params.id, function(err, foundOvercomeProcrastinationComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundOvercomeProcrastinationComment.author.id.equals(req.user._id)){
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

middlewareObj.checkSleepEffectivelyCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SleepEffectivelyComment.findById(req.params.id, function(err, foundSleepEffectivelyComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundSleepEffectivelyComment.author.id.equals(req.user._id)){
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

middlewareObj.checkPartyIdeasCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        PartyIdeasComment.findById(req.params.id, function(err, foundPartyIdeasComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundPartyIdeasComment.author.id.equals(req.user._id)){
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

middlewareObj.checkMoneyPlanCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        MoneyPlanComment.findById(req.params.id, function(err, foundMoneyPlanComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundMoneyPlanComment.author.id.equals(req.user._id)){
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

middlewareObj.checkToiletShortageAtPartiesCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ToiletShortageAtPartiesComment.findById(req.params.id, function(err, foundToiletShortageAtPartiesComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundToiletShortageAtPartiesComment.author.id.equals(req.user._id)){
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

middlewareObj.checkStopWearingSkinnyJeansCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        StopWearingSkinnyJeansComment.findById(req.params.id, function(err, foundStopWearingSkinnyJeansComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundStopWearingSkinnyJeansComment.author.id.equals(req.user._id)){
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

middlewareObj.checkStudyIsStressfulCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        StudyIsStressfulComment.findById(req.params.id, function(err, foundStudyIsStressfulComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundStudyIsStressfulComment.author.id.equals(req.user._id)){
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

middlewareObj.checkCorrectYourHabitsCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CorrectYourHabitsComment.findById(req.params.id, function(err, foundCorrectYourHabitsComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundCorrectYourHabitsComment.author.id.equals(req.user._id)){
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

middlewareObj.checkThinkAboutDepressionCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ThinkAboutDepressionComment.findById(req.params.id, function(err, foundThinkAboutDepressionComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundThinkAboutDepressionComment.author.id.equals(req.user._id)){
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

middlewareObj.checkTalkToARecruitmentAgentCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        TalkToARecruitmentAgentComment.findById(req.params.id, function(err, foundTalkToARecruitmentAgentComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundTalkToARecruitmentAgentComment.author.id.equals(req.user._id)){
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

middlewareObj.checkMoreThanJustBreakfastCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        MoreThanJustBreakfastComment.findById(req.params.id, function(err, foundMoreThanJustBreakfastComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundMoreThanJustBreakfastComment.author.id.equals(req.user._id)){
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

middlewareObj.checkFunOutsideOfStudyCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FunOutsideOfStudyComment.findById(req.params.id, function(err, foundFunOutsideOfStudyComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFunOutsideOfStudyComment.author.id.equals(req.user._id)){
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

middlewareObj.checkFindingPartTimeWorkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FindingPartTimeWorkComment.findById(req.params.id, function(err, foundFindingPartTimeWorkComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFindingPartTimeWorkComment.author.id.equals(req.user._id)){
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

middlewareObj.checkPayForDrivingOnATripCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        PayForDrivingOnATripComment.findById(req.params.id, function(err, foundPayForDrivingOnATripComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundPayForDrivingOnATripComment.author.id.equals(req.user._id)){
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

middlewareObj.checkLookingForAFlatCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        LookingForAFlatComment.findById(req.params.id, function(err, foundLookingForAFlatComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundLookingForAFlatComment.author.id.equals(req.user._id)){
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

middlewareObj.checkFriendStaysOverAtFlatCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        FriendStaysOverAtFlatComment.findById(req.params.id, function(err, foundFriendStaysOverAtFlatComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundFriendStaysOverAtFlatComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWhereYouAreInLifeCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WhereYouAreInLifeComment.findById(req.params.id, function(err, foundWhereYouAreInLifeComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWhereYouAreInLifeComment.author.id.equals(req.user._id)){
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