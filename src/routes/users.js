const express = require("express");
const router = express.Router();
const { hashPassword } = require("../middleware/passencrypt");

router.get("/", (req, res) =>{
    res.send("Users page");
});

router.post("/", hashPassword, (req, res) =>{
    // Get the data from the request
    const { firstName, email} = req.body;
    const hashedPassword = req.hashedPassword;
    res.json({
    firstName,
    email,
    hashedPassword,
    _id: "randomId4567"
    })
});


module.exports = router