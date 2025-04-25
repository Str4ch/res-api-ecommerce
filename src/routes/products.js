const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");

const { getProductById, getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productControllers");

router.get("/", verifyToken, getAllProducts);

router.get("/getbyid", verifyToken, getProductById);

router.post("/createproduct", verifyToken, createProduct);

router.put("/updateproduct", verifyToken, updateProduct);

router.delete("/deleteproduct", verifyToken, deleteProduct);

module.exports = router