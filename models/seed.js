/////////////////////////////////////
// IMPORT OUR DEPENDENCIES
/////////////////////////////////////

const mongoose = require("./connection")
const Gear = require("./gear")


/////////////////////////////////////
// SEED CODE
/////////////////////////////////////

// Make sure your code is not run until connected
mongoose.connection.on("open", () => {

    /////////////////////////////////////
    // WRITE YOUR SEED CODE BELOW
    /////////////////////////////////////

    // Run any database queries in this function
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
            // log created gear to confirm
            console.log("----------GEAR CREATED----------")
            console.log(data)
            console.log("----------GEAR CREATED----------")

            // close the databse connection
            mongoose.connection.close()
        })
    })
})