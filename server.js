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

// INITAL ROUTE
app.get("/", (req, res) => {
    res.send("your Max Audio Sales server is running...better catch it!")

})

// SEED ROUTE
app.get("/gear/seed", (req, res) => {

    // array of Max's starter gear
    const startGear = [
        {    
            name: "0-Coast",
            maker: "Make Noise",
            type: "Analog Synthesizer",
            price: 425,
            new: false,
            used: true,
            mint: false,
            great: true,
            good: false,
            poor: false,
            description: "Small desktop, semi-modular analog synthsizer made my MakeNoise. Been used in home setup for a few years. Great condition, no dents/scratches. Please feel free to message me if you have more questions!"
        },
        {    
            name: "RE-20",
            maker: "Electro-Voice",
            type: "Microphone",
            price: 250,
            new: false,
            used: true,
            mint: false,
            great: false,
            good: true,
            poor: false,
            description: "Industry standard, dynamic microphone. Dinged, scratched, and battered but still works and sounds absolutely wonderful. Great price if the used look doesn't bother you too much. Please feel free to message me if you have more questions!"
        },
        {    
            name: "TLM 102",
            maker: "Neumann",
            type: "Microphone",
            price: 600,
            new: false,
            used: true,
            mint: true,
            great: false,
            good: false,
            poor: false,
            description: "Neumann's TLM 102 Large-diaphragm Condenser Microphone. Beautifully taken care of, looks and sounds fresh out of the box. A good option if you are looking for the classic Neumann inner workings without paying the price of a U-87 or the bigger TLM-103 model. Please feel free to message me if you have more questions!"
        },
        {    
            name: "MPC Live",
            maker: "Akai Professional",
            type: "Sampler / Sequencer",
            price: 1000,
            new: false,
            used: true,
            mint: false,
            great: true,
            good: false,
            poor: false,
            description: "Nearly new MPC Live made by Akai. Great condition - buttons, knobs, screen feel and function like brand new. No dents or scratches. Really don't want to part with it honestly but I need the money. Not the original, classic Analog MPC sound from the earlier models but feels great, very intuitive functionalities and most importantly just a blast to play. Certainly the best MPC you can use for gigging. Please feel free to message me if you have more questions!"
        },
        {   
            name: "Sub Phatty",
            maker: "Moog",
            type: "Analog Synthesizer",
            price: 700,
            new: false,
            used: true,
            mint: false,
            great: true,
            good: false,
            poor: false,
            description: "Not much description needed. Great condition. A fun, 'PHAT', two-octave, analog synth made by Moog. Quite a big beast for such a small synth. Perfect entry point into the Moog world (other models can often times be very pricey). Not as big or badass as some of Moog's classic models, the Sub Phatty still delivers with all you could want for an alalog bass synth with the classic, sought-after filters used in every piece of Moog gear. Highly recommend! Please feel free to message me if you have more questions!"
        }
    ]

    // Delete all gear
    Gear.remove({}, (err, data) => {
        // Seed Starter Gear
        Gear.create(startGear, (err, data) => {
            // send created gear as a response to confirm creation
            res.json(data)
        })
    })
})

// INDEX ROUTE (GET => /gear)
app.get("/gear", (req, res) => {
    Gear.find({}, (err, gear) => {
        res.render("gear/index.ejs", { gear })
    })
})

// NEW ROUTE (GET => /gear/new)
app.get("/gear/new", (req, res) => {
    res.render("gear/new.ejs")
})

// CREATE ROUTE (POST => /fruits)
app.post("/gear", (req, res) => {
    // check if the 

    // create the new gear listing
    Gear.create(req.body, (err, gear) => {
        // redirect the user back to the main fruits page after the listing is created
        res.redirect("/gear")
    })
})

// EDIT ROUTE (GET => /gear/:id/edit)
app.get("/gear/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the gear from the database
    Gear.findById(id, (err, gear) => {
        // render template and send it gear
        res.render("gear/edit.ejs", { gear })
    })
})

// UPDATE ROUTE (PUT => /gear/:id)
app.put("/gear/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // check if the new and used property should be true or false
    req.body.new = req.body.new === "on" ? true : false
    req.body.used = req.body.used === "on" ? true : false
    // update the gear
    Gear.findByIdAndUpdate(id, req.body, {new: true}, (err, gear) => {
        // redirect user back to main page when gear
        res.redirect("/gear")
    })
})

// SHOW ROUTE (GET => /gear/:id)
app.get("/gear/:id", (req, res) => {
    // get the id from the params
    const id = req.params.id
    // find the particular gear from the database
    Gear.findById(id, (err, gear) => {
        // render the template with the data from the database
        res.render("gear/show.ejs", { gear })
    })
})



/////////////////////////////////////
// SERVER LISTENER
/////////////////////////////////////

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))