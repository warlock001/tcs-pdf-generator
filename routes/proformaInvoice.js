const ProformaInvoiceRouter = require("express").Router();
const PostProformaInvoice = require("../controllers/PostProformaInvoice")

ProformaInvoiceRouter.post("/proformainvoice", async (req, res) => {
    PostProformaInvoice.Execute(req, res);
});

ProformaInvoiceRouter.get("/proformainvoice", async (req, res) => {
    PostProformaInvoice.Execute(req, res);
});

module.exports = ProformaInvoiceRouter;