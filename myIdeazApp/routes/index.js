var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET signup page. */
router.get("/", function (req, res, next) {
  res.render("index", {});
});

router.get("/home/:username", function (req, res, next) {
  let { username } = req.params
  res.render("home", { username });
});


router.post("/addUser", (req, res) => {
  let { username, email, password } = req.body;
  User.create({
    username,
    password,
    email
  })
    .then(() => {
      res.redirect(`/home/${username}`)
    })
    .catch(e => console.log(e));
});

module.exports = router;


