import express from "express";
const app = express();
import dotenv from "dotenv";
const port = 5173;
import {MongoClient, ObjectId} from "mongodb";
import session from "express-session";
import cors from "cors";
app.use(cors());

dotenv.config();
const url = process.env.MONGO_URL;
const dbconnect = new MongoClient(url);
let collection = null;

import passport from "passport";
import {Strategy as GitHubStrategy} from "passport-github";

app.use(session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb)
    {
        console.log(profile)
        return cb(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    console.log("Serialize: ", user)
    done(null, user);
})

passport.deserializeUser(function(obj, done) {
    console.log("Deserialize: ", obj)
    done(null, obj);
})

app.get("/auth/github",
    passport.authenticate("github", {scope: ["user: email"] })
);

app.get("/auth/github/callback",
    passport.authenticate("github", {failureRedirect: "/"}),
    function(req, res) {
        res.redirect("/queue");
    });

app.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
    });
    res.redirect("/");
});


app.get("/user", (req, res) => {
    if(req.isAuthenticated()) {
        res.json(req.user);
    }
    else {
        res.status(401).json({ message: "Not authenticated"});
    }
})


async function run() {
    await dbconnect.connect().then(() => console.log("Connected!"));
    collection = await dbconnect.db("cs4241").collection("comms");

    app.get("/getCommissions", async (req, res) => {
        const appdata = await collection.find({userId: req.user.id}).toArray();
        //const appdata = await collection.find().toArray();
        res.end(JSON.stringify(appdata))
    })

    app.post("/submit", async (req, res) => {

        let results;

        req.on( "data",  async function (data) {
            //console.log("Before: ", JSON.parse(data));
            let newData = JSON.parse(data);
            let tempDate = new Date(newData.dateissued);
            tempDate.setHours(tempDate.getDate() + 1);
            newData.dateissued = tempDate.toDateString();
            newData.deadline = calcDeadline(tempDate, newData.commtype, newData.styletype);
            //console.log("After: ", newData);
            newData.progress = "Not Started";
            newData.userId = req.user.id;

            results = await collection.insertOne(newData);
            console.log("results: ", results);
        })


        req.on( "end", function() {

            // ... do something with the data here and at least generate the derived data

            res.writeHead( 200, "OK", {"Content-Type": "application/json" })
            res.end(JSON.stringify(results))
        })
    });

    app.post("/update", (req, res) => {

        let results;

        req.on( "data", async function (data) {
            //console.log("Before: ", JSON.parse(data));
            let newData = JSON.parse(data);
            let tempDate = new Date(newData.dateissued);
            tempDate.setHours(tempDate.getDate() + 1);
            newData.dateissued = tempDate.toDateString();
            newData.deadline = calcDeadline(tempDate, newData.commtype, newData.styletype);
            //console.log("After: ", newData);

            const id = new ObjectId(newData._id);
            console.log("newData", newData)

            results = await collection.updateOne({_id:id}, {$set: {clientname: newData.clientname,
                    commtype: newData.commtype, styletype: newData.styletype, dateissued: newData.dateissued, commdesc: newData.commdesc, progress: newData.progress, deadline: newData.deadline}});
            console.log("results: ", results);
        })


        req.on( "end", function() {

            // ... do something with the data here and at least generate the derived data

            res.writeHead( 200, "OK", {"Content-Type": "application/json" })
            res.end(JSON.stringify(results))
        })
    });

    app.delete("/delete", async (req, res) => {

        let results;


        req.on( "data", async function (data) {
            const id = new ObjectId(JSON.parse(data));

            results = await collection.deleteOne({_id:id});
            console.log("results: ", results);
        })


        req.on("end", function () {
            res.writeHead(200, "OK", {"Content-Type": "application/json"})
            res.end(JSON.stringify(results))
        })
    });
}

const appRun = run();

app.listen(process.env.PORT || port, () => {
    console.log("Server running on http://localhost:5173");
});

function calcDeadline (startDate, commtype, styletype) {
    let date = startDate;
    const commTypeEfforts  = {
        "Icon": 3,
        "Half Body": 5,
        "Full Body": 7,
        "Scene": 12,
    };
    const styleTypeEfforts = {
        "Sketch": 1,
        "Flat": 3,
        "Shaded": 5,
    };

    if(commTypeEfforts[commtype]) {
        date.setDate(date.getDate() + commTypeEfforts[commtype]);
    }

    if(styleTypeEfforts[styletype]) {
        date.setDate(date.getDate() + styleTypeEfforts[styletype]);
    }

    return date.toDateString();
}