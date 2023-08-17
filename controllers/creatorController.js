const Creator = require('../models/creator');
const asyncHandler = require('../node_modules/express-async-handler');
const Game = require('../models/game');
const {body, validationResult} = require("express-validator");

exports.creator_list = asyncHandler(async(req, res, next) => {
    const allCreators = await Creator.find({}).exec();
    res.render("allX", {title: "Creators", neutral: allCreators, url:"creator/"});
    
})

exports.creator_detail = asyncHandler(async (req, res,next) => {
    const id = req.params.id;
    const currentCreator = await Creator.findOne({_id:id}).populate("games").exec();
    const allGamesByCreator = await Game.find({creator:id}).exec();
    console.log(allGamesByCreator);
    res.render("creator", {title: currentCreator, games: allGamesByCreator});
})

exports.creator_create_get = asyncHandler(async (req, res, next) => {
    res.render("form",{title:"Create Creator", creator: undefined, errors: undefined});
  });
  
// Handle Author create on POST.
exports.creator_create_post = [
    body("name", "Author name must contain at least 3 characters")
    .trim().isLength({min: 3}).escape(),
    body('date_of_creation', "Date is required'")
    .notEmpty()
    .toDate(),
    asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    
    const creator = new Creator({name: req.body.name, date_of_creation:req.body.date_of_creation}); 

    if (!errors.isEmpty()){
        res.render("form", {
            title: "Create Creator",
            creator: creator,
            errors: errors.array(),
        })
        return;
    }
    else{
        const creatorExists = await Creator.findOne({name: req.body.name}).exec();
        if (creatorExists){
            res.redirect(creatorExists.url);
        } else {
            await creator.save()
            res.redirect(creator.url)
        }
    }
})];


exports.creator_delete_get = asyncHandler(async (req, res, next) => {
    const oneCreator = await Creator.findOne({_id:req.params.id}).exec();
    res.render("delete.ejs", {title: "the creator", main:oneCreator});
});


exports.creator_delete_post = asyncHandler(async (req, res, next) => {
    const validation = req.body.delete;
    const gameId = req.params.id;
    const newGame = await Game.find({creator:gameId});

    if(validation === "yes" && newGame.length === 0){
      const oneGame = await Creator.deleteOne({_id: gameId});
      if(oneGame.deletedCount === 1){
          console.log("Creator deleted successfully");
      }
      else{
          console.log("Failed to delete");
      }
      res.redirect("/catalog/creators");
    }
    else {
      const game = Creator.findOne({_id: gameId}).exec();
      res.redirect(`/catalog/creator/${gameId}`);
    }
});


exports.creator_update_get = asyncHandler(async (req, res, next) => {
    const updatedCreator = await Creator.findOne({_id: req.params.id});
    const formattedDate = updatedCreator.date_of_creation.toISOString();
    console.log(formattedDate.substring(0,10));
    res.render("form",{title:"Create Creator", creator: updatedCreator, errors: undefined});
});

exports.creator_update_post = [
    body("name", "Author name must contain at least 3 characters")
    .trim().isLength({min: 3}).escape(),
    body('date_of_creation', "Date is required'")
    .notEmpty()
    .toDate(),
    asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    
    const creator = new Creator({name: req.body.name, date_of_creation:req.body.date_of_creation}); 


    if (!errors.isEmpty()){
        res.render("form", {
            title: "Create Creator",
            creator: creator,
            errors: errors.array(),
        })
        return;
    }
    else{
        const creatorExists = await Creator.findOne({name: req.body.name, date_of_creation:req.body.date_of_creation}).exec();
        if (creatorExists){
            res.redirect(creatorExists.url);
        } else {
            await Creator.updateOne({_id:req.params.id}, {name:creator.name, date_of_creation:creator.date_of_creation})
            res.redirect(`/catalog/creator/${req.params.id}`);
        }
    }
})];
