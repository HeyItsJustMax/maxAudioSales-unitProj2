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

router.post("/signup", async (req, res) => {
    // hashing/encrypting the password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create the new user
    User.create(req.body, (err, user) => {
        // redirect to login page
        res.redirect("/user/login")
    })
})

// The Login Routes (GET => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    // get the data from the request body
    const { username, password } = req.body
    User.findOne({ username }, (err, user) => {
        // console.log(err, user)
        // checking if user exists
        if (!user) {
            res.send("user doesn't exist")
        } else {
            // check if password matches
            const result = bcrypt.compareSync(password, user.password)
            if (result) {
                req.session.username = username
                req.session.logginIn = true
                res.redirect("/gear")
            } else {
                res.send("wrong password")
            }
        }
    })
})

// The Logout Route
router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/gear")
    })
})


/////////////////////////////////////
// EXPORT THE ROUTER
/////////////////////////////////////

module.exports = router
