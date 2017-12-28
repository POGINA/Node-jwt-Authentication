var jwt = require("jsonwebtoken");

module.exports.auth = function(req,res){
    var user = {
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin
    }

var token = jwt.sign(user, process.env.SECRET_KEY,{
        expiresIn: 1440 // expires in 24hrs
    })

    res.json({
        success: true,
        token: token,
        message: "Welcome in!"
    })
}
