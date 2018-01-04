var AucklandAsk                          = require("../../app/models/askOffer/aucklandAsk"),
    AucklandOffer                        = require("../../app/models/askOffer/aucklandOffer"),
    AucklandAskComment                   = require("../../app/models/askOffer/aucklandAskComment"),
    AucklandOfferComment                 = require("../../app/models/askOffer/aucklandOfferComment"),
    BayOfPlentyRegionAsk                 = require("../../app/models/askOffer/bayOfPlentyRegionAsk"),
    BayOfPlentyRegionOffer               = require("../../app/models/askOffer/bayOfPlentyRegionOffer"),
    BayOfPlentyRegionAskComment          = require("../../app/models/askOffer/bayOfPlentyRegionAskComment"),
    BayOfPlentyRegionOfferComment        = require("../../app/models/askOffer/bayOfPlentyRegionOfferComment"),
    CentralOtagoAsk                      = require("../../app/models/askOffer/centralOtagoAsk"),
    CentralOtagoOffer                    = require("../../app/models/askOffer/centralOtagoOffer"),
    CentralOtagoAskComment               = require("../../app/models/askOffer/centralOtagoAskComment"),
    CentralOtagoOfferComment             = require("../../app/models/askOffer/centralOtagoOfferComment"),
    ChristchurchAsk                      = require("../../app/models/askOffer/christchurchAsk"),
    ChristchurchOffer                    = require("../../app/models/askOffer/christchurchOffer"),
    ChristchurchAskComment               = require("../../app/models/askOffer/christchurchAskComment"),
    ChristchurchOfferComment             = require("../../app/models/askOffer/christchurchOfferComment"),
    CoastalOtagoAsk                      = require("../../app/models/askOffer/coastalOtagoAsk"),
    CoastalOtagoOffer                    = require("../../app/models/askOffer/coastalOtagoOffer"),
    CoastalOtagoAskComment               = require("../../app/models/askOffer/coastalOtagoAskComment"),
    CoastalOtagoOfferComment             = require("../../app/models/askOffer/coastalOtagoOfferComment"),
    DunedinAsk                           = require("../../app/models/askOffer/dunedinAsk"),
    DunedinOffer                         = require("../../app/models/askOffer/dunedinOffer"),
    DunedinAskComment                    = require("../../app/models/askOffer/dunedinAskComment"),
    DunedinOfferComment                  = require("../../app/models/askOffer/dunedinOfferComment"),
    GisborneRegionAsk                    = require("../../app/models/askOffer/gisborneRegionAsk"),
    GisborneRegionOffer                  = require("../../app/models/askOffer/gisborneRegionOffer"),
    GisborneRegionAskComment             = require("../../app/models/askOffer/gisborneRegionAskComment"),
    GisborneRegionOfferComment           = require("../../app/models/askOffer/gisborneRegionOfferComment"),
    HamiltonAsk                          = require("../../app/models/askOffer/hamiltonAsk"),
    HamiltonOffer                        = require("../../app/models/askOffer/hamiltonOffer"),
    HamiltonAskComment                   = require("../../app/models/askOffer/hamiltonAskComment"),
    HamiltonOfferComment                 = require("../../app/models/askOffer/hamiltonOfferComment"),
    HawkesBayRegionAsk                   = require("../../app/models/askOffer/hawkesBayRegionAsk"),
    HawkesBayRegionOffer                 = require("../../app/models/askOffer/hawkesBayRegionOffer"),
    HawkesBayRegionAskComment            = require("../../app/models/askOffer/hawkesBayRegionAskComment"),
    HawkesBayRegionOfferComment          = require("../../app/models/askOffer/hawkesBayRegionOfferComment"),
    ManawatuWanganuiRegionAsk            = require("../../app/models/askOffer/manawatuWanganuiRegionAsk"),
    ManawatuWanganuiRegionOffer          = require("../../app/models/askOffer/manawatuWanganuiRegionOffer"),
    ManawatuWanganuiRegionAskComment     = require("../../app/models/askOffer/manawatuWanganuiRegionAskComment"),
    ManawatuWanganuiRegionOfferComment   = require("../../app/models/askOffer/manawatuWanganuiRegionOfferComment"),
    NelsonMarlboroughRegionAsk           = require("../../app/models/askOffer/nelsonMarlboroughRegionAsk"),
    NelsonMarlboroughRegionOffer         = require("../../app/models/askOffer/nelsonMarlboroughRegionOffer"),
    NelsonMarlboroughRegionAskComment    = require("../../app/models/askOffer/nelsonMarlboroughRegionAskComment"),
    NelsonMarlboroughRegionOfferComment  = require("../../app/models/askOffer/nelsonMarlboroughRegionOfferComment"),
    NorthlandRegionAsk                   = require("../../app/models/askOffer/northlandRegionAsk"),
    NorthlandRegionOffer                 = require("../../app/models/askOffer/northlandRegionOffer"),
    NorthlandRegionAskComment            = require("../../app/models/askOffer/northlandRegionAskComment"),
    NorthlandRegionOfferComment          = require("../../app/models/askOffer/northlandRegionOfferComment"),
    SouthCanterburyAsk                   = require("../../app/models/askOffer/southCanterburyAsk"),
    SouthCanterburyOffer                 = require("../../app/models/askOffer/southCanterburyOffer"),
    SouthCanterburyAskComment            = require("../../app/models/askOffer/southCanterburyAskComment"),
    SouthCanterburyOfferComment          = require("../../app/models/askOffer/southCanterburyOfferComment"),
    SouthlandRegionAsk                   = require("../../app/models/askOffer/southlandRegionAsk"),
    SouthlandRegionOffer                 = require("../../app/models/askOffer/southlandRegionOffer"),
    SouthlandRegionAskComment            = require("../../app/models/askOffer/southlandRegionAskComment"),
    SouthlandRegionOfferComment          = require("../../app/models/askOffer/southlandRegionOfferComment"),
    TaranakiRegionAsk                    = require("../../app/models/askOffer/taranakiRegionAsk"),
    TaranakiRegionOffer                  = require("../../app/models/askOffer/taranakiRegionOffer"),
    TaranakiRegionAskComment             = require("../../app/models/askOffer/taranakiRegionAskComment"),
    TaranakiRegionOfferComment           = require("../../app/models/askOffer/taranakiRegionOfferComment"),
    WaikatoRegionAsk                     = require("../../app/models/askOffer/waikatoRegionAsk"),
    WaikatoRegionOffer                   = require("../../app/models/askOffer/waikatoRegionOffer"),
    WaikatoRegionAskComment              = require("../../app/models/askOffer/waikatoRegionAskComment"),
    WaikatoRegionOfferComment            = require("../../app/models/askOffer/waikatoRegionOfferComment"),
    WellingtonAsk                        = require("../../app/models/askOffer/wellingtonAsk"),
    WellingtonOffer                      = require("../../app/models/askOffer/wellingtonOffer"),
    WellingtonAskComment                 = require("../../app/models/askOffer/wellingtonAskComment"),
    WellingtonOfferComment               = require("../../app/models/askOffer/wellingtonOfferComment"),
    WellingtonRegionAsk                  = require("../../app/models/askOffer/wellingtonRegionAsk"),
    WellingtonRegionOffer                = require("../../app/models/askOffer/wellingtonRegionOffer"),
    WellingtonRegionAskComment           = require("../../app/models/askOffer/wellingtonRegionAskComment"),
    WellingtonRegionOfferComment         = require("../../app/models/askOffer/wellingtonRegionOfferComment"),
    WestCoastRegionAsk                   = require("../../app/models/askOffer/westCoastRegionAsk"),
    WestCoastRegionOffer                 = require("../../app/models/askOffer/westCoastRegionOffer"),
    WestCoastRegionAskComment            = require("../../app/models/askOffer/westCoastRegionAskComment"),
    WestCoastRegionOfferComment          = require("../../app/models/askOffer/westCoastRegionOfferComment");
    

// All the middleware goes here
var middlewareObj = {};

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

middlewareObj.checkBayOfPlentyRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        BayOfPlentyRegionAskComment.findById(req.params.comment_id, function(err, foundBayOfPlentyRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundBayOfPlentyRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkBayOfPlentyRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        BayOfPlentyRegionOfferComment.findById(req.params.comment_id, function(err, foundBayOfPlentyRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundBayOfPlentyRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkCentralOtagoAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CentralOtagoAskComment.findById(req.params.comment_id, function(err, foundCentralOtagoAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundCentralOtagoAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkCentralOtagoOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CentralOtagoOfferComment.findById(req.params.comment_id, function(err, foundCentralOtagoOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundCentralOtagoOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkChristchurchAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ChristchurchAskComment.findById(req.params.comment_id, function(err, foundChristchurchAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundChristchurchAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkChristchurchOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ChristchurchOfferComment.findById(req.params.comment_id, function(err, foundChristchurchOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundChristchurchOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkCoastalOtagoAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CoastalOtagoAskComment.findById(req.params.comment_id, function(err, foundCoastalOtagoAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundCoastalOtagoAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkCoastalOtagoOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        CoastalOtagoOfferComment.findById(req.params.comment_id, function(err, foundCoastalOtagoOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundCoastalOtagoOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkDunedinAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        DunedinAskComment.findById(req.params.comment_id, function(err, foundDunedinAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundDunedinAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkDunedinOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        DunedinOfferComment.findById(req.params.comment_id, function(err, foundDunedinOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundDunedinOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkGisborneRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        GisborneRegionAskComment.findById(req.params.comment_id, function(err, foundGisborneRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundGisborneRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkGisborneRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        GisborneRegionOfferComment.findById(req.params.comment_id, function(err, foundGisborneRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundGisborneRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkHamiltonAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HamiltonAskComment.findById(req.params.comment_id, function(err, foundHamiltonAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundHamiltonAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkHamiltonOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HamiltonOfferComment.findById(req.params.comment_id, function(err, foundHamiltonOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundHamiltonOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkHawkesBayRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HawkesBayRegionAskComment.findById(req.params.comment_id, function(err, foundHawkesBayRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundHawkesBayRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkHawkesBayRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HawkesBayRegionOfferComment.findById(req.params.comment_id, function(err, foundHawkesBayRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundHawkesBayRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkManawatuWanganuiRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ManawatuWanganuiRegionAskComment.findById(req.params.comment_id, function(err, foundManawatuWanganuiRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundManawatuWanganuiRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkManawatuWanganuiRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        ManawatuWanganuiRegionOfferComment.findById(req.params.comment_id, function(err, foundManawatuWanganuiRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundManawatuWanganuiRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkNelsonMarlboroughRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        NelsonMarlboroughRegionAskComment.findById(req.params.comment_id, function(err, foundNelsonMarlboroughRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundNelsonMarlboroughRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkNelsonMarlboroughRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        NelsonMarlboroughRegionOfferComment.findById(req.params.comment_id, function(err, foundNelsonMarlboroughRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundNelsonMarlboroughRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkNorthlandRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        NorthlandRegionAskComment.findById(req.params.comment_id, function(err, foundNorthlandRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundNorthlandRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkNorthlandRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        NorthlandRegionOfferComment.findById(req.params.comment_id, function(err, foundNorthlandRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundNorthlandRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkSouthCanterburyAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SouthCanterburyAskComment.findById(req.params.comment_id, function(err, foundSouthCanterburyAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundSouthCanterburyAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkSouthCanterburyOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SouthCanterburyOfferComment.findById(req.params.comment_id, function(err, foundSouthCanterburyOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundSouthCanterburyOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkSouthlandRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SouthlandRegionAskComment.findById(req.params.comment_id, function(err, foundSouthlandRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundSouthlandRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkSouthlandRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        SouthlandRegionOfferComment.findById(req.params.comment_id, function(err, foundSouthlandRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundSouthlandRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkTaranakiRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        TaranakiRegionAskComment.findById(req.params.comment_id, function(err, foundTaranakiRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundTaranakiRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkTaranakiRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        TaranakiRegionOfferComment.findById(req.params.comment_id, function(err, foundTaranakiRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundTaranakiRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWaikatoRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WaikatoRegionAskComment.findById(req.params.comment_id, function(err, foundWaikatoRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWaikatoRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWaikatoRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WaikatoRegionOfferComment.findById(req.params.comment_id, function(err, foundWaikatoRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWaikatoRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWellingtonAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WellingtonAskComment.findById(req.params.comment_id, function(err, foundWellingtonAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWellingtonAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWellingtonOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WellingtonOfferComment.findById(req.params.comment_id, function(err, foundWellingtonOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWellingtonOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWellingtonRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WellingtonRegionAskComment.findById(req.params.comment_id, function(err, foundWellingtonRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWellingtonRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWellingtonRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WellingtonRegionOfferComment.findById(req.params.comment_id, function(err, foundWellingtonRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWellingtonRegionOfferComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWestCoastRegionAskCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WestCoastRegionAskComment.findById(req.params.comment_id, function(err, foundWestCoastRegionAskComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWestCoastRegionAskComment.author.id.equals(req.user._id)){
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

middlewareObj.checkWestCoastRegionOfferCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        WestCoastRegionOfferComment.findById(req.params.comment_id, function(err, foundWestCoastRegionOfferComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundWestCoastRegionOfferComment.author.id.equals(req.user._id)){
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