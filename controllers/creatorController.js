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
    res.render("creator", {title: currentCreator});
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
        const creatorExists = await Creator.findOne({name: req.body.name}).exec();
        if (creatorExists){
            res.redirect(creatorExists.url);
        } else {
            await creator.save()
            res.redirect(creator.url)
        }
    }
})];

// Display Author delete form on GET.
exports.creator_delete_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Creator delete GET");
});

// Handle Author delete on POST.
exports.creator_delete_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Creator delete POST");
});

// Display Author update form on GET.
exports.creator_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Creator update GET");
});

// Handle Author update on POST.
exports.creator_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Creator update POST");
});
