const Game = require('../models/game');
const Genre = require('../models/genre');
const Creator = require('../models/creator');
const asyncHandler = require('../node_modules/express-async-handler');
const {body, validationResult} = require("express-validator")

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numGames,
        numAuthors,
        numGenres
    ] = await Promise.all([
        Game.countDocuments({}).exec(),
        Creator.countDocuments({}).exec(),
        Genre.countDocuments({}).exec()
    ])
    res.render("index", {
        title:"Game Shopping Cart!",
        game_count: numGames,
        author_count: numAuthors,
        genre_count: numGenres,
    });
});
exports.game_list = asyncHandler(async(req, res, next) => {
    const allGames = await Game.find({}).exec();
    res.render(
        "allX", {
            title: "Games",
            neutral: allGames,
            url:"game/"
        }
    )
})

exports.game_detail = asyncHandler(async (req, res,next) => {
    const gameId = req.params.id;
    console.log(gameId);
    const url = await Game.find({_id: gameId});
    const game = await Game.find({_id: gameId}).populate("creator").populate("genre").exec();
    res.render("game",{title:game[0].name, gameInfo: game, urlInfo: url});
    console.log(url)
})

exports.game_create_get = asyncHandler(async (req, res, next) => {
    const [allCreators, allGenres] = await Promise.all([
        Creator.find().exec(),
        Genre.find().exec(),
    ])
    res.render("form", {title: "Create Game", game: undefined, errors: undefined, creator: allCreators, genre:allGenres,})
  });
  

exports.game_create_post = [

    body("name", "Game name must have at least 1 character").trim().isLength({ min: 1 }).escape(),
    body("price", "Price cannot be left blank").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async(req,res,next) => {
        const [allCreators, allGenres] = await Promise.all([
            Creator.find().exec(),
            Genre.find().exec(),
        ])
        const errors = validationResult(req);
        const game = new Game({name:req.body.name, creator: req.body.creator, description: req.body.description, genre: req.body.genre, price:req.body.price})
        if (!errors.isEmpty()){
            console.log(errors)
            res.render("form", {
                title: "Create Game", game: game,errors: errors, creator: allCreators, genre:allGenres
            })
            return;
        }
        else{
            console.log("good path")
            const gameExists = await Game.findOne({name: req.body.name, creator: req.body.creator}).exec();
            if (gameExists){
                res.redirect(gameExists.url);
            }
            else {
                await game.save();
                res.redirect(game.url)
            }
        }
     })

    ];


exports.game_delete_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game delete GET");
});


exports.game_delete_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game delete POST");
});

exports.game_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game update GET");
});

// Handle Author update on POST.
exports.game_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game update POST");
});
