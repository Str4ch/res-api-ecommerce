const User = require("../models/userModels")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.userLogIn = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user in the database
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
  
      // Compare the password from found user with the password from the request
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }
  
      // Create a token
      const token = jwt.sign(
        {
          userId: foundUser._id,
        },
        process.env.SECRET_TOKEN_KEY,
        { expiresIn: "24h" }
      );
  
      res.status(200).json(token);
    } catch (err) {
      res.status(401).json({
        message: err.message,
      });
    }
};
  
  

exports.userSignUp = async (req, res) => {
    try{
        // Get the data from the request
        const { firstName, email, lastName, imageUrl, role} = req.body;
        console.log(req.body);
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

            res.status(201).json({"firstName": savedUser.firstName, "lastName": savedUser.lastName, 
                "imageUrl": savedUser.imageUrl, "email": savedUser.email, "role": savedUser.role});
        }
        catch (err){
            res.status(400).json({message: err.message})
        }
    }