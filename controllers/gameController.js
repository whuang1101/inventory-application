const Game = require('../models/game');
const Genre = require('../models/genre');
const Creator = require('../models/creator');
const asyncHandler = require('../node_modules/express-async-handler');

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
    const game = await Game.find({_id: gameId}).populate("creator").populate("genre").exec();
    res.render("game",{title:game[0].name, gameInfo: game});
})

exports.game_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Game create GET");
  });
  
// Handle Author create on POST.
exports.game_create_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game create POST");
});

// Display Author delete form on GET.
exports.game_delete_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game delete GET");
});

// Handle Author delete on POST.
exports.game_delete_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game delete POST");
});

// Display Author update form on GET.
exports.game_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game update GET");
});

// Handle Author update on POST.
exports.game_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Game update POST");
});
