const Invoice = require("../models/invoiceModels")

exports.getInvoicesByParticipant = async (req, res) => {
    try {
        const participant = req.userEmail;
    
        const invoices = await Invoice.find({
          participants: { $in: [participant] }
        });
    
        res.send(invoices);
      } catch (err) {
        res.status(401).json({
            message: err.message,
          });
      }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById({ id: req.body.id});
        res.send(invoice);
      } catch (err) {
        res.status(401).json({
          message: err.message,
        });
      }
}

exports.updateInvoice = async (req, res) => {
    try{
        const userRole = req.userRole;
        if(userRole != "admin"){
            res.send("You can't add invoices")
        }

        const {_id, date, parcticipants, images, stock, totalAmount, items } = req.body;

        await Invoice.updateOne({_id}, {date, parcticipants, images, stock, totalAmount, items});

        res.status(201).json({"message": "Successful update"});

    } catch (err) {
        res.status(400).json({
          message: err.message,
        });
    }
}

exports.createInvoice = async(req, res) => {
    try{
        const userRole = req.userRole;
        if(userRole != "admin"){
            res.send("You can't add invoices")
        }

        //console.log(req);
        const {date, parcticipants, images, stock, totalAmount, items } = req.body;

        const newInvoice = new Invoice({
            date, 
            parcticipants,
            images,
            stock,
            totalAmount,
            items
        });

        const savedInvoice = await newInvoice.save();

        res.status(201).json({"date": savedInvoice.date, "parcticipants": savedInvoice.parcticipants, "images": savedInvoice.images, 
            "stock": savedInvoice.stock, "totalAmount": savedInvoice.totalAmount, "items": savedInvoice.items});

    } catch (err) {
        res.status(400).json({
          message: err.message,
        });
    }
}

exports.deleteInvoice = async(req, res) => {
    try{
        const userRole = req.userRole;
        if(userRole != "admin"){
            res.send("You can't add invoices")
        }

        const { _id } = req.body;
        
        await Invoice.findByIdAndDelete(_id);

        res.status(201).json({"message": "succefully deleted"});

    } catch (err) {
        res.status(400).json({
          message: err.message,
        });
    }
   
}