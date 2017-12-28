var Users = require("../models/users.js");

module.exports.getData = function (req,res){
    Users.find({}, function (err, users){
        if(err) {
            return res.status(500).send("Could not run query.")
        }
        res.json({data:users})
    })
}

module.exports.postData = function(req,res){
    var usersData = new Users({
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin
    })

    usersData.save(function(err){
        if(err){
            throw err
        }

        res.status(200).send("New User added.")

    })
}
