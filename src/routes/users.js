const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    res.send("Users page");
});

router.post("/", (req, res) =>{
    // Get the data from the request
    console.log(req.body);
    const { firstName, email, password } = req.body;

    res.json({
    firstName,
    email,
    password,
    _id: "randomId4567"
    })
});


module.exports = router