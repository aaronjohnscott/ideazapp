var express = require('express');
var router = express.Router();
var User = require('../models/User')

/* GET users listing. */


module.exports = function (passport) {
    router.post('/login', function (req, res, next) {
        console.log(req.body)
        var body = req.body,
            username = body.username,
            password = body.password,
            email = body.email
        User.findOne({ where: { email: email } }, (err, doc) => {
            if (err) { res.status(500).send('error occured') }
            else {
                if (doc) {
                    res.status(500).send("Username already exists")
                } else {
                    User.create({
                        username: username,
                        email: email,
                        password: password
                    }).then(res.send("yo"))

                }
            }
        })
    });
    return router
};
