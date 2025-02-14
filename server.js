import express from "express";
import path from "path";
import { fileURLToPath } from "url";
//import {MongoClient, ObjectId} from "mongodb";
import session from "express-session";
import mime from "mime";

//import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5173;

app.use(express.static(path.join(__dirname, "src")));


//const url = process.env.MONGO_URL;
//const dbconnect = new MongoClient(url);
let collection = null;

import passport from "passport";
//const GitHubStrategy = require('passport-github').Strategy;


import React from "react";
import ReactDOMServer from "react-dom/server"
import LoginPage from "./src/LoginPage.jsx"
import fs from "fs";

app.get("/", (req, res) => {
    fs.readFile(path.resolve("./index.html"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred");
        }

        //ReactDOMServer.renderToString(<LoginPage />)

        return res.send(
            data.replace(
                "<main id=\"root\"></main>",
                `<main id="root">${React.createElement(LoginPage)}</main>`
            )
        );
    });
});

app.get("/queue", (req, res) => {
    //res.sendFile(path.join(__dirname, "site.html"));
    res.redirect("/");
})

app.listen(process.env.PORT || port);
