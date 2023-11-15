const fs = require('fs');
const hbs = require('hbs');
const htmlPDF = require('puppeteer-html-pdf');
const readFile = require('util').promisify(fs.readFile);

class PostInvoiceController {
    static async Execute(req, res) {

        const {
            termsOfDelivery,
            airwayBill,
            date,
            weight,
            pieces,
            from,
            fromPhone,
            shipperName,
            fromPostCode,
            fromAddress,
            fromDoorNo,
            fromCity,
            fromCountry,
            fromState,
            consignee,
            attn,
            toAddress,
            toCity,
            toCountry,
            consigneePhone,
            description,
            value,
        } = req.body;

        let buffer;

        const options = {
            format: 'A4',
            landscape: false,
            margin: { top: "0cm", bottom: "0cm", left: "0cm", right: "0cm" }
        }

        const pdfData = {
            termsOfDelivery: termsOfDelivery,
            airwayBill: airwayBill,
            date: date,
            weight: weight,
            pieces: pieces,
            from: from,
            fromPhone: fromPhone,
            shipperName: shipperName,
            fromPostCode: fromPostCode,
            fromAddress: fromAddress,
            fromDoorNo: fromDoorNo,
            fromCity: fromCity,
            fromCountry: fromCountry,
            fromState: fromState,
            consignee: consignee,
            attn: attn,
            toAddress: toAddress,
            toCity: toCity,
            toCountry: toCountry,
            consigneePhone: consigneePhone,
            description: description,
            value: value
        }

        try {
            const html = await readFile('views/invoice.hbs', 'utf8');
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


module.exports = PostInvoiceController