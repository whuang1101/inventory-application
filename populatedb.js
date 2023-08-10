// #! /usr/bin/env node

// console.log(
//     'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
//   );
  
//   // Get arguments passed on command line
//   const userArgs = process.argv.slice(2);
  
//   const Creator = require("./models/creator");
//   const Genre = require("./models/genre");
//   const Game = require("./models/game");
  
//   const creators = [];
//   const genres = [];
//   const games = [];
  
//   const mongoose = require("mongoose");
// const game = require("./models/game");
//   mongoose.set("strictQuery", false);
  
//   const mongoDB = userArgs[0];
  
//   main().catch((err) => console.log(err));
  
//   async function main() {
//     console.log("Debug: About to connect");
//     await mongoose.connect(mongoDB);
//     console.log("Debug: Should be connected?");
//     await createGenres();
//     await createAuthors();
//     await createBooks();
//     console.log("Debug: Closing mongoose");
//     mongoose.connection.close();
//   }
  
//   // We pass the index to the ...Create functions so that, for example,
//   // genre[0] will always be the Fantasy genre, regardless of the order
//   // in which the elements of promise.all's argument complete.
//   async function genreCreate(index, name) {
//     const genre = new Genre({ name: name });
//     await genre.save();
//     genres[index] = genre;
//     console.log(`Added genre: ${name}`);
//   }
  
//   async function authorCreate(index, name, date_of_creation) {
//     const authordetail = { company_name: name , date_of_creation: date_of_creation};
  
//     const author = new Creator(authordetail);
  
//     await author.save();
//     creators[index] = author;
    
//   }
  
//   async function bookCreate(index, name, creator, genre, description, price) {
//     const gamedetail = {
//       name: name,
//       creator: creator,
//       genre: genre,
//       description: description,
//       price: price,
//     };
//     if (genre != false) gamedetail.genre = genre;
  
//     const game = new Game(gamedetail);
//     await game.save();
//     games[index] = game;
//     console.log(`Added book: ${name}`);
//   }
  
  
//   async function createGenres() {
//     console.log("Adding genres");
//     await Promise.all([
//       genreCreate(0, "Platformer"),
//       genreCreate(1, "FPS, "),
//       genreCreate(2, "MOBA"),
//     ]);
//   }
  
//   async function createAuthors() {
//     console.log("Adding authors");
//     await Promise.all([
//       authorCreate(0, "Riot", "2006-09-06"),
//       authorCreate(1,"Nintendo", "1889-09-23"),
//     ]);
//   }
  
//   async function createBooks() {
//     console.log("Adding Books");
//     await Promise.all([
//       bookCreate(0,
//         "League of Legends",
//         creators[0],
//         [genres[2]],
//         "The best game",
//         0
//       ),
//       bookCreate(1,
//         "Super Mario Bros",
//         creators[1],
//         [genres[0]],
//         "A super solid game",
//         32
//       ),

//     ]);
//   }
  