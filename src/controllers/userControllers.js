const User = require("../models/userModels")

exports.userLogIn = (req, res) => {
    res.send("User Login");
}

exports.userSignUp = async (req, res) => {
        // Get the data from the request
        const { firstName, email, lastName, imageUrl, role} = req.body;
        const hashedPassword = req.hashedPassword;

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            imageUrl,
            role,
            inventory: []
        })
        
        const savedUser = await newUser.save();
        res.status(201).json({"firstName": savedUser.firstName, "lastName": savedUser.lastName, "imageUrl": savedUser.imageUrl, "email": savedUser.email, "role": savedUser.role});
}