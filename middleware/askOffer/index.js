var AucklandAsk                   = require("../../app/models/askOffer/aucklandAsk"),
    AucklandAskComment            = require("../../app/models/askOffer/aucklandAskComment"),
    AucklandOffer                 = require("../../app/models/askOffer/aucklandOffer"),
    AucklandOfferComment          = require("../../app/models/askOffer/aucklandOfferComment"),
    BayOfPlentyRegionAsk          = require("../../app/models/askOffer/bayOfPlentyRegionAsk"),
    BayOfPlentyRegionOffer        = require("../../app/models/askOffer/bayOfPlentyRegionOffer"),
    CentralOtagoAsk               = require("../../app/models/askOffer/centralOtagoAsk"),
    CentralOtagoOffer             = require("../../app/models/askOffer/centralOtagoOffer"),
    ChristchurchAsk               = require("../../app/models/askOffer/christchurchAsk"),
    ChristchurchOffer             = require("../../app/models/askOffer/christchurchOffer"),
    CoastalOtagoAsk               = require("../../app/models/askOffer/coastalOtagoAsk"),
    CoastalOtagoOffer             = require("../../app/models/askOffer/coastalOtagoOffer"),
    DunedinAsk                    = require("../../app/models/askOffer/dunedinAsk"),
    DunedinOffer                  = require("../../app/models/askOffer/dunedinOffer"),
    GisborneRegionAsk             = require("../../app/models/askOffer/gisborneRegionAsk"),
    GisborneRegionOffer           = require("../../app/models/askOffer/gisborneRegionOffer"),
    HamiltonAsk                   = require("../../app/models/askOffer/hamiltonAsk"),
    HamiltonOffer                 = require("../../app/models/askOffer/hamiltonOffer"),
    HawkesBayRegionAsk            = require("../../app/models/askOffer/hawkesBayRegionAsk"),
    HawkesBayRegionOffer          = require("../../app/models/askOffer/hawkesBayRegionOffer"),
    ManawatuWanganuiRegionAsk     = require("../../app/models/askOffer/manawatuWanganuiRegionAsk"),
    ManawatuWanganuiRegionOffer   = require("../../app/models/askOffer/manawatuWanganuiRegionOffer"),
    NelsonMarlboroughRegionAsk    = require("../../app/models/askOffer/nelsonMarlboroughRegionAsk"),
    NelsonMarlboroughRegionOffer  = require("../../app/models/askOffer/nelsonMarlboroughRegionOffer"),
    NorthlandRegionAsk            = require("../../app/models/askOffer/northlandRegionAsk"),
    NorthlandRegionOffer          = require("../../app/models/askOffer/northlandRegionOffer"),
    SouthCanterburyAsk            = require("../../app/models/askOffer/southCanterburyAsk"),
    SouthCanterburyOffer          = require("../../app/models/askOffer/southCanterburyOffer"),
    SouthlandRegionAsk            = require("../../app/models/askOffer/southlandRegionAsk"),
    SouthlandRegionOffer          = require("../../app/models/askOffer/southlandRegionOffer"),
    TaranakiRegionAsk          = require("../../app/models/askOffer/taranakiRegionAsk"),
    TaranakiRegionOffer        = require("../../app/models/askOffer/taranakiRegionOffer"),
    WaikatoRegionAsk          = require("../../app/models/askOffer/waikatoRegionAsk"),
    WaikatoRegionOffer        = require("../../app/models/askOffer/waikatoRegionOffer"),
    WellingtonAsk          = require("../../app/models/askOffer/wellingtonAsk"),
    WellingtonOffer        = require("../../app/models/askOffer/wellingtonOffer"),
    WellingtonRegionAsk          = require("../../app/models/askOffer/wellingtonRegionAsk"),
    WellingtonRegionOffer        = require("../../app/models/askOffer/wellingtonRegionOffer"),
    WestCoastRegionAsk          = require("../../app/models/askOffer/westCoastRegionAsk"),
    WestCoastRegionOffer        = require("../../app/models/askOffer/westCoastRegionOffer");
    

// All the middleware goes here
var middlewareObj = {};

middlewareObj.checkAucklandAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        AucklandAsk.findById(req.params.id, function(err, foundAucklandAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundAucklandAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkAucklandAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        AucklandAskComment.findById(req.params.comment_id, function(err, foundAucklandAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundAucklandAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkAucklandOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        AucklandOffer.findById(req.params.id, function(err, foundAucklandOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundAucklandOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkAucklandOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        AucklandOfferComment.findById(req.params.comment_id, function(err, foundAucklandOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundAucklandOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkBayOfPlentyRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        BayOfPlentyRegionAsk.findById(req.params.id, function(err, foundBayOfPlentyRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundBayOfPlentyRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkBayOfPlentyRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        BayOfPlentyRegionOffer.findById(req.params.id, function(err, foundBayOfPlentyRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundBayOfPlentyRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkCentralOtagoAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CentralOtagoAsk.findById(req.params.id, function(err, foundCentralOtagoAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundCentralOtagoAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkCentralOtagoOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CentralOtagoOffer.findById(req.params.id, function(err, foundCentralOtagoOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundCentralOtagoOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkChristchurchAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ChristchurchAsk.findById(req.params.id, function(err, foundChristchurchAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundChristchurchAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkChristchurchOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ChristchurchOffer.findById(req.params.id, function(err, foundChristchurchOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundChristchurchOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkCoastalOtagoAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CoastalOtagoAsk.findById(req.params.id, function(err, foundCoastalOtagoAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundCoastalOtagoAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkCoastalOtagoOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CoastalOtagoOffer.findById(req.params.id, function(err, foundCoastalOtagoOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundCoastalOtagoOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkDunedinAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        DunedinAsk.findById(req.params.id, function(err, foundDunedinAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundDunedinAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkDunedinOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        DunedinOffer.findById(req.params.id, function(err, foundDunedinOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundDunedinOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkGisborneRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        GisborneRegionAsk.findById(req.params.id, function(err, foundGisborneRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundGisborneRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkGisborneRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        GisborneRegionOffer.findById(req.params.id, function(err, foundGisborneRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundGisborneRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkHamiltonAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HamiltonAsk.findById(req.params.id, function(err, foundHamiltonAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundHamiltonAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkHamiltonOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HamiltonOffer.findById(req.params.id, function(err, foundHamiltonOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundHamiltonOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkHawkesBayRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HawkesBayRegionAsk.findById(req.params.id, function(err, foundHawkesBayRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundHawkesBayRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkHawkesBayRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HawkesBayRegionOffer.findById(req.params.id, function(err, foundHawkesBayRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundHawkesBayRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkManawatuWanganuiRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ManawatuWanganuiRegionAsk.findById(req.params.id, function(err, foundManawatuWanganuiRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundManawatuWanganuiRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkManawatuWanganuiRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ManawatuWanganuiRegionOffer.findById(req.params.id, function(err, foundManawatuWanganuiRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundManawatuWanganuiRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkNelsonMarlboroughRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        NelsonMarlboroughRegionAsk.findById(req.params.id, function(err, foundNelsonMarlboroughRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundNelsonMarlboroughRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkNelsonMarlboroughRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        NelsonMarlboroughRegionOffer.findById(req.params.id, function(err, foundNelsonMarlboroughRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundNelsonMarlboroughRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkNorthlandRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        NorthlandRegionAsk.findById(req.params.id, function(err, foundNorthlandRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundNorthlandRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkNorthlandRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        NorthlandRegionOffer.findById(req.params.id, function(err, foundNorthlandRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundNorthlandRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkSouthCanterburyAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SouthCanterburyAsk.findById(req.params.id, function(err, foundSouthCanterburyAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundSouthCanterburyAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkSouthCanterburyOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SouthCanterburyOffer.findById(req.params.id, function(err, foundSouthCanterburyOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundSouthCanterburyOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkSouthlandRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SouthlandRegionAsk.findById(req.params.id, function(err, foundSouthlandRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundSouthlandRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkSouthlandRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SouthlandRegionOffer.findById(req.params.id, function(err, foundSouthlandRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundSouthlandRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkTaranakiRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        TaranakiRegionAsk.findById(req.params.id, function(err, foundTaranakiRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundTaranakiRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkTaranakiRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        TaranakiRegionOffer.findById(req.params.id, function(err, foundTaranakiRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundTaranakiRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkWaikatoRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WaikatoRegionAsk.findById(req.params.id, function(err, foundWaikatoRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundWaikatoRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkWaikatoRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WaikatoRegionOffer.findById(req.params.id, function(err, foundWaikatoRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundWaikatoRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkWellingtonAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WellingtonAsk.findById(req.params.id, function(err, foundWellingtonAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundWellingtonAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkWellingtonOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WellingtonOffer.findById(req.params.id, function(err, foundWellingtonOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundWellingtonOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkWellingtonRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WellingtonRegionAsk.findById(req.params.id, function(err, foundWellingtonRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundWellingtonRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkWellingtonRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WellingtonRegionOffer.findById(req.params.id, function(err, foundWellingtonRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundWellingtonRegionOffer.author.id.equals(req.user._id)){
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

middlewareObj.checkWestCoastRegionAskOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WestCoastRegionAsk.findById(req.params.id, function(err, foundWestCoastRegionAsk){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundWestCoastRegionAsk.author.id.equals(req.user._id)){
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

middlewareObj.checkWestCoastRegionOfferOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WestCoastRegionOffer.findById(req.params.id, function(err, foundWestCoastRegionOffer){
            if(err){
                req.flash("error", "item not found");
                res.redirect("back");
            } else {
            //does user own the uniTalk?
                if(foundWestCoastRegionOffer.author.id.equals(req.user._id)){
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