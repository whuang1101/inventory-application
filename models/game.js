const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {type: String, required: true, maxLength:100},
    creator:  { type: Schema.Types.ObjectId, ref: "Creator", required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    description: {type:String, maxLength: 500},
    number_in_stock: {type:Number},
    price: {type: Number, required: true},
})

gameSchema.virtual("url").get(function () {
    return `/catalog/game/${this.id}`;
})

module.exports = mongoose.model("Game", gameSchema);