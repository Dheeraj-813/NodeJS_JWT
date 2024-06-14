// Calling express framework with JWT(Jason web token)..........

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Get method for message received......

app.get("/api", (req,res) => {
    res.json({
        message:"Hey there.! Welcome to JWT with API service."
    });
});

// Getting info for authorization............

app.post("/api/posts", verifyToken,(req,res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if(err){
            res.sendStatus(403); //Forbidden.....
        }
        else{
            res.json({
                message:"posts created...!",
                authData
            });
        }
    });
});

// Creating token..........

app.post("/api/login", (req,res) => {
    const user = {
        id: 1,
        userName: "John",
        email: "john@gmail.com",
    };
    jwt.sign({user: user}, "secret key", (err, token) =>{
        res.json({
            token
        });
    });
});

// Creating function for verify the token........

function verifyToken(req,res,next){
    const bearerHeader = req.header["authorization"];
    if(typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split('')[1]
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

// Listening the port.....

app.listen(3000, (req,res) => {
    console.log("server started on port 3000");
});