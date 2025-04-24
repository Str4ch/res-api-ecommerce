const express = require("express");
const router = express.Router();
const { hashPassword } = require("../middleware/passencrypt");
const upload = require("../middleware/multerConfig")

const { userLogIn, userSignUp } = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/auth");

router.post("/login", userLogIn)

router.post("/signup", hashPassword, userSignUp);

// Update user route
// The route is protected by the verifyToken middleware
router.put("/userUpdate", verifyToken, upload.single("image"), sharpMiddleware(), (req, res) => {
  
    if (!req.file) {
     return res.status(400).json({ error: "Error uploading the file. Wrong format ?" })
    }
    console.log(req.body) // Logs the form fields
    console.log(req.file) // Logs the uploaded file details
    console.log(req.userId) // From the verifyToken middleware
    const fileUrl =
     req.protocol + "://" + req.get("host") + "/" + req.file.processedPath
    res.json({ message: "User response reached", fileUrl })
   })

module.exports = router