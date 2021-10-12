/////////////////////////////////////
// IMPORT DEPENDENCIES
/////////////////////////////////////

require("dotenv").config() // load ENV variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const methodOverride = require("method-override")
const GearRouter = require("./controllers/gear")



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
app.use("/gear", GearRouter)



/////////////////////////////////////
// SERVER LISTENER
/////////////////////////////////////

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))