const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");

const { getInvoiceById, getInvoicesByParticipant, createInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoiceControllers");

router.get("/", verifyToken, getInvoicesByParticipant);

router.get("/getbyid", verifyToken, getInvoiceById);

router.post("/createinvoice", verifyToken, createInvoice);

router.put("/updateinvoice", verifyToken, updateInvoice);

router.delete("/deleteinvoice", verifyToken, deleteInvoice);

module.exports = router