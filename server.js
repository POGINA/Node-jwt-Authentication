var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express(),
    secureRoutes = express.Router();

var jwt = require("jsonwebtoken"), // use to create, sign, and verify person
    config = require("./server/models/config.js"), // get config file
    Users = require("./server/models/users.js"),
//  ======== CONTROLLERS ========
    dataControllers = require("./server/controllers/controllers.js"), // get mongoose model
    athenticateController = require("./server/controllers/authenticate-controller.js");

    process.env.SECRET_KEY = "iVapeBro";

var port = process.env.PORT || 8080;
//  ======== CONFIGURATION ========
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use('/secure-api',secureRoutes);

    config.setConfig();
    mongoose.connect(process.env.MONGOOSE_CONNECT);

var dummyData = [];
//  ======== Controllers//App Routes ========
    app.get('/api/auth', athenticateController.auth)
    app.get('/api/data', dataControllers.getData);
//  ======== Validation Middleware ========
    secureRoutes.use(function(req,res, next){
        var token = req.body.token || req.headers["token"];
        if(token){
            jwt.verify(token, process.env.SECRET_KEY,function(err, decoded){
                if(err){
                    res.status(500).send("invalid token")
                } else {
                    next();
                }
            })
        } else {
            res.send("send token")
        }
    })
    secureRoutes.post("/post",dataControllers.postData);


//  ======== start server ========
    app.listen(port,function(){
        console.log("Server Started at port: " + port)
    });
