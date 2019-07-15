var express = require("express");
var router = express.Router();
var User = require("../models/User");
var adjectives = require('../public/javascripts/adjectives')
var nouns = require('../public/javascripts/nouns')
var verbs = require('../public/javascripts/verbs')
var top100 = require('../public/javascripts/top100movies')

randomWord = (words) => {
  let randomNumber = Math.floor(Math.random() * words.length)
  return words[randomNumber]
}

/* GET signup page. */
router.get("/", function (req, res, next) {
  res.render("index", {});
});


router.get("/keyword-connection", (req, res, next) => {
  res.render("keywordConnection", { adj: randomWord(adjectives), noun: randomWord(nouns), verb: randomWord(verbs) })
})

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


