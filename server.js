const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {

});

app.get("/queue", (req, res) => {

});



app.listen(process.env.PORT || port);