const fs = require('fs');
const hbs = require('hbs');
const htmlPDF = require('puppeteer-html-pdf');
const readFile = require('util').promisify(fs.readFile);

class PostProformaInvoiceController {
    static async Execute(req, res) {

        const {
            date,
            from,
            fromAddress,
            fromPostCode,
            consignee,
            toAddress,
            toCountry,
            toPostCode,
            toContact,
            consigneePhone,
            airwayBill,
            peices,
            weight,
            hsCode,
            description,
            value,
            termsOfDelivery
        } = req.body;

        let buffer;

        const options = {
            format: 'A4',
            landscape: false,
            margin: { top: "0cm", bottom: "0cm", left: "0cm", right: "0cm" }
        }

        const pdfData = {
            date,
            from,
            fromAddress,
            fromPostCode,
            consignee,
            toAddress,
            toCountry,
            toPostCode,
            toContact,
            consigneePhone,
            airwayBill,
            peices,
            weight,
            hsCode,
            description,
            value,
            termsOfDelivery
        }

        try {
            const html = await readFile('views/proformaInvoice.hbs', 'utf8');
            const template = hbs.compile(html);
            const content = template(pdfData);

            buffer = await htmlPDF.create(content, options);

        } catch (error) {
            console.log(error);
        }

        try {
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(buffer);
        } catch (e) {
            console.log(e)
        }

    }
}


module.exports = PostProformaInvoiceController