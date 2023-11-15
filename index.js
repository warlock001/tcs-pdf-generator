const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/invoice"));
app.use(require("./routes/proformaInvoice"));

app.use(cors(corsOptions, { credentials: true, origin: true }));

var server = app.listen(process.env.API_PORT, (error) => {
    if (error) {
        console.error("Error Occurred while connecting to server: ", error);
    } else {
        console.log("App is listining on port " + process.env.API_PORT);

        console.log("Trying to connect to database server...");

        mongoose.connect(process.env.DB_CONNECTION_STRING).then(res => {
            console.log("Connected to Database Successfully!");
        }).catch(err => {
            console.error("Error Occurred while connecting to database: ", err);
        })
    }
});