const InvoiceRouter = require("express").Router();
const PostInvoice = require("../controllers/PostInvoice")

InvoiceRouter.post("/invoice", async (req, res) => {
    PostInvoice.Execute(req, res);
});

InvoiceRouter.get("/invoice", async (req, res) => {
    PostInvoice.Execute(req, res);
});

module.exports = InvoiceRouter;