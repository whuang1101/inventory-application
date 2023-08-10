const Genre = require('../models/genre');
const Game = require('../models/game')
const asyncHandler = require('../node_modules/express-async-handler');
const { body, validationResult } = require("express-validator");


exports.genre_list = asyncHandler(async(req, res, next) => {
    const allGenre = await Genre.find({}).exec();
    res.render("allX", {title: "Genres", neutral: allGenre, url:"genre/"})
})

exports.genre_detail = asyncHandler(async (req, res,next) => {
    const id = req.params.id;
    const currentGenre = await Genre.findOne({_id:id}).exec();
    const allGamesInGenre = await Game.find({genre:id}).exec();
    console.log(allGamesInGenre)
    res.render("genre", {title: currentGenre.name, games:allGamesInGenre})
})

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.render("form", {title: "Create Genre", genre: undefined, errors: undefined})
  });
  
// Handle Author create on POST.
exports.genre_create_post = [
    // Validate and sanitize the name field.
    body("name", "Genre name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),
  
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
  
      const genre = new Genre({ name: req.body.name });
  
      if (!errors.isEmpty()) {
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
res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Author delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Author update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Author update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: Genre update POST");
});
