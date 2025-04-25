const Product = require("../models/productModels")

exports.getAllProducts = async (req, res) => {
    try {
      const products =  await Product.find({});
      res.send(products);
    } catch (err) {
      res.status(401).json({
        message: err.message,
      });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById({ id: req.body.id});
        res.send(product);
      } catch (err) {
        res.status(401).json({
          message: err.message,
        });
      }
}

exports.updateProduct = async (req, res) => {
    try{
        const userRole = req.userRole;
        if(userRole != "admin"){
            res.send("You can't add products")
        }

        //console.log(req);
        const {_id, brand, model, images, stock, price } = req.body;

        const savedProduct = await Product.updateOne({_id}, {brand, model, images, stock, price});

        res.status(201).json({"brand": savedProduct.brand, "model": savedProduct.model, "images": savedProduct.images, "stock": savedProduct.stock, "price": savedProduct.price});

    } catch (err) {
        res.status(400).json({
          message: err.message,
        });
    }
}

exports.createProduct = async(req, res) => {
    try{
        const userRole = req.userRole;
        if(userRole != "admin"){
            res.send("You can't add products")
        }

        //console.log(req);
        const { brand, model, images, stock, price } = req.body;

        const newProduct = new Product({
            brand,
            model,
            images,
            stock,
            price
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({"brand": savedProduct.brand, "model": savedProduct.model, "images": savedProduct.images, "stock": savedProduct.stock, "price": savedProduct.price});

    } catch (err) {
        res.status(400).json({
          message: err.message,
        });
    }
}

exports.deleteProduct = async(req, res) => {
    try{
        const userRole = req.userRole;
        if(userRole != "admin"){
            res.send("You can't add products")
        }

        //console.log(req);
        const { _id } = req.body;
        
        await Product.findByIdAndDelete(_id);

        res.status(201).json({"message": "succefully deleted"});

    } catch (err) {
        res.status(400).json({
          message: err.message,
        });
    }
   
}