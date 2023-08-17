const Genre = require('../models/genre');
const Game = require('../models/game')
const asyncHandler = require('../node_modules/express-async-handler');
const { body, validationResult } = require("express-validator");
const { find } = require('../models/creator');


exports.genre_list = asyncHandler(async(req, res, next) => {
    const allGenre = await Genre.find({}).exec();
    res.render("allX", {title: "Genres", neutral: allGenre, url:"genre/"})
})

exports.genre_detail = asyncHandler(async (req, res,next) => {
    const id = req.params.id;
    const currentGenre = await Genre.findOne({_id:id}).exec();
    const allGamesInGenre = await Game.find({genre:id}).exec();
    console.log(allGamesInGenre)
    res.render("genre", {title: currentGenre, games:allGamesInGenre})
})

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.render("form", {title: "Create Genre", genre: undefined, errors: undefined})
  });
  
// Handle Author create on POST.
exports.genre_create_post = [
    
    body("name", "Genre name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),
  
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
  
      const genre = new Genre({ name: req.body.name });
  
      if (!errors.isEmpty()) {
        console.log(errors)
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("form", {
          title: "Create Genre",
          genre: genre,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        const genreExists = await Genre.findOne({ name: req.body.name }).exec();
        if (genreExists) {
          // Genre exists, redirect to its detail page.
          res.redirect(genreExists.url);
        } else {
          await genre.save();
          // New genre saved. Redirect to genre detail page.
          res.redirect(genre.url);
        }
      }
    }),
  ];

// Display Author delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  const oneGenre = await Genre.findOne({_id:req.params.id}).exec();
  res.render("delete.ejs", {title: "the genre", main:oneGenre});
});

// Handle Author delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  const validation = req.body.delete;
  const gameId = req.params.id;
  const newGame = await Game.find({genre:gameId});
  console.log(newGame);
  if(validation === "yes" && newGame.length === 0){
    const oneGame = await Genre.deleteOne({_id: gameId});
    if(oneGame.deletedCount === 1){
        console.log("Game deleted successfully");
    }
    else{
        console.log("Failed to delete");
    }
    res.redirect("/catalog/genres");
  }
  else {
    const game = Genre.findOne({_id: gameId}).exec();
    res.redirect(`/catalog/genre/${gameId}`);
  }
});

// Display Author update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  const updatedGenre = await Genre.findOne({_id:req.params.id}).exec();
  res.render("form", {title: "Update Genre", genre: updatedGenre, errors: undefined})
});

// Handle Author update on POST.
exports.genre_update_post = [
body("name", "Genre name must contain at least 3 characters")
  .trim()
  .isLength({ min: 3 })
  .escape(),
  asyncHandler(async (req, res, next) => {
    const genre = new Genre({ name: req.body.name });
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
      res.render("form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }
    else{
      const update = {
        name: genre.name,
      }
      const genreExists = await Genre.findOne({ name: req.body.name }).exec();
      if(genreExists){
        res.redirect(genreExists.url);
      }
      else{
      const result = Genre.updateOne({_id: req.params.id}, update).exec();
      if (result.matchedCount === 1 && result.modifiedCount === 1) {
        console.log('Document updated successfully');
      } else {
        console.log('Document not found or not updated');
      }
      res.redirect(`/catalog/genre/${req.params.id}`);
    }
    }
  })
];
