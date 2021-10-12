/////////////////////////////////////
// IMPORT DEPENDENCIES
/////////////////////////////////////

const express = require("express")
const Gear = require("../models/gear")



/////////////////////////////////////
// CREATE ROUTE
/////////////////////////////////////

const router = express.Router()



/////////////////////////////////////
// ROUTES
/////////////////////////////////////

// SEED ROUTE
router.get("/seed", (req, res) => {

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
router.get("/", (req, res) => {
    Gear.find({}, (err, gear) => {
        res.render("gear/index.ejs", { gear })
    })
})

// NEW ROUTE (GET => /gear/new)
router.get("/new", (req, res) => {
    res.render("gear/new.ejs")
})

// CREATE ROUTE (POST => /fruits)
router.post("/", (req, res) => {
    // check if the new and used property should be true or false
    req.body.new = req.body.new === "on" ? true : false
    req.body.used = req.body.used === "on" ? true : false
    // create the new gear listing
    Gear.create(req.body, (err, gear) => {
        // redirect the user back to the main fruits page after the listing is created
        res.redirect("/gear")
    })
})

// EDIT ROUTE (GET => /gear/:id/edit)
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the gear from the database
    Gear.findById(id, (err, gear) => {
        // render template and send it gear
        res.render("gear/edit.ejs", { gear })
    })
})

// UPDATE ROUTE (PUT => /gear/:id)
router.put("/:id", (req, res) => {
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

// DESTROY ROUTE (DELETE => /gear/:id)
router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the gear
    Gear.findByIdAndRemove(id, (err, gear) => {
        // redirect user back to index page
        res.redirect("/gear")
    })
})

// SHOW ROUTE (GET => /gear/:id)
router.get("/:id", (req, res) => {
    // get the id from the params
    const id = req.params.id
    // find the particular gear from the database
    Gear.findById(id, (err, gear) => {
        // render the template with the data from the database
        res.render("gear/show.ejs", { gear })
    })
})



/////////////////////////////////////
// EXPORT THE ROUTER 
/////////////////////////////////////

module.exports = router