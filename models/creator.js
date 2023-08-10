const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
    name: {type: String, required:true, maxLength:100},
    date_of_creation: {type: Date},
    games: [{ type: Schema.Types.ObjectId, ref: "Game" }]
})

creatorSchema.virtual("url").get(function(){
    return `/catalog/creator/${this.id}`
})
module.exports = mongoose.model("Creator", creatorSchema)
