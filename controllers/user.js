/////////////////////////////////////
// IMPORT OUR DEPENDENCIES
/////////////////////////////////////

const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")


/////////////////////////////////////
// CREATE ROUTE
/////////////////////////////////////

const router = express.Router()


/////////////////////////////////////
// ROUTES
/////////////////////////////////////

// The Signup Routes (GET => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", (req, res) => {
    res.send("signup")
})

// The Login Routes (GET => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    res.send("login")
})



/////////////////////////////////////
// EXPORT THE ROUTER
/////////////////////////////////////

module.exports = router
