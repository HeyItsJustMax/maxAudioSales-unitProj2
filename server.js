/////////////////////////////////////
// IMPORT DEPENDENCIES
/////////////////////////////////////

require("dotenv").config() // load ENV variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const GearRouter = require("./controllers/gear")
const UserRouter = require("./controllers/user")
const session = require("express-session")
const MongoStore = require("connect-mongo")



/////////////////////////////////////
// CREATE EXPRESS APPLICATION OBJECT
/////////////////////////////////////

const app = express()

////////////////////////////////////
//
////////////////////////////////////

const db = mongoose.connection



////////////////////////////////////
// DATABASE
////////////////////////////////////

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })

// Error / Success
db.on("error", (err) => console.log(err.message + " is mongod not running?"))
db.on("connected", () => console.log("mongod connected: ", MONGODB_URI))
db.on("disconnected", () => console.log("mongod disconnected"))



/////////////////////////////////////
// MIDDLEWARE
/////////////////////////////////////

app.use(morgan("tiny")) // logging
app.use(methodOverride("_method")) // override for post, put, and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
app.use(express.json()) // returns middleware that only parses JSON - may not need it depending on your project
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false
}))

app.use("/gear", GearRouter)
app.use("/user", UserRouter) // "/user/signup" & "/user/login" are the two added routes

/////////////////////////////////////
// ROUTES
/////////////////////////////////////

// INITIAL ROUTE
app.get("/", (req, res) => {
    res.render("index.ejs")
})



/////////////////////////////////////
// SERVER LISTENER
/////////////////////////////////////

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))