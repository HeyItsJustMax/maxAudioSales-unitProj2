/////////////////////////////////////
// IMPORT OUR DEPENDENCIES
/////////////////////////////////////

const mongoose = require("./connection")



/////////////////////////////////////
// DEFINE MODEL
/////////////////////////////////////

// pull schema and model from mongoose
const { Schema, model } = mongoose

// make gear schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// make gear model
const User = model("User", userSchema)



/////////////////////////////////////
// EXPORT MODEL
/////////////////////////////////////

module.exports = User