var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require('dotenv').config();

const mongoDB = process.env.SECRET_KEY;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected")
}

/* GET home page. */
router.get("/", function (req, res) {
  res.redirect("/catalog");
});

module.exports = router;
