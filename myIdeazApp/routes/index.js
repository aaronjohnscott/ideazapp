var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET signup page. */
router.get("/", function (req, res, next) {
  res.render("index", {});
});

router.get("/home", function (req, res, next) {
  res.render("home");
});


router.post("/addUser", (req, res) => {

  let { username, email, password } = req.body;


  User.create({
    username,
    password,
    email
  })
    .then(() => {
      res.redirect("/home")
    })
    .catch(e => console.log(e));
});




module.exports = router;


