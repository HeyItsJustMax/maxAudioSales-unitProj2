/////////////////////////////////////
// IMPORT DEPENDENCIES
/////////////////////////////////////

require("dotenv").config() // load ENV variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")



/////////////////////////////////////
// ESTABLISH DATABASE CONNECTION
/////////////////////////////////////

// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))



/////////////////////////////////////
// OUR MODELS
/////////////////////////////////////

// pull schema and model from mongoose
const {Schema, model} = mongoose

// make gear schema
const gearSchema = new Schema({
    name: String,
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
// CREATE EXPRESS APPLICATION OBJECT
/////////////////////////////////////

const app = express()



/////////////////////////////////////
// MIDDLEWARE
/////////////////////////////////////

app.use(morgan("tiny")) // logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically



/////////////////////////////////////
// ROUTES
/////////////////////////////////////

app.get("/", (req, res) => {
    res.send("your Max Audio Sales server is running...better catch it!")
})



/////////////////////////////////////
// SERVER LISTENER
/////////////////////////////////////

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))