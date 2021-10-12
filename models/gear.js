/////////////////////////////////////
// IMPORT OUR DEPENDENCIES
/////////////////////////////////////

const mongoose = require("./connection")



/////////////////////////////////////
// OUR MODELS
/////////////////////////////////////

// pull schema and model from mongoose
const {Schema, model} = mongoose

// make gear schema
const gearSchema = new Schema({
    name: String,
    maker: String,
    type: String,
    price: Number,
    new: Boolean,
    used: Boolean,
    mint: Boolean,
    great: Boolean,
    good: Boolean,
    poor: Boolean,
    description: String
})

// make gear model
const Gear = model("Gear", gearSchema)


/////////////////////////////////////
// EXPORT MODEL
/////////////////////////////////////

module.exports = Gear