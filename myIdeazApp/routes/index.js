var express = require("express");
var router = express.Router();
var User = require("../models/User");
var adjectiveList = require('../public/javascripts/adjectives')
var nounList = require('../public/javascripts/nouns')
var verbList = require('../public/javascripts/verbs')
var top100 = require('../public/javascripts/top100movies')

/* GET signup page. */
router.get("/", function (req, res, next) {
  res.render("index", {});
});


router.get("/keyword-connection", (req, res, next) => {
  let ranNumAdj = Math.floor(Math.random() * adjectiveList.length)
  const adj = (adjectiveList[ranNumAdj])
  let ranNumNoun = Math.floor(Math.random() * nounList.length)
  const noun = (nounList[ranNumNoun])
  let ranNumVerb = Math.floor(Math.random() * verbList.length)
  const verb = (verbList[ranNumVerb])
  console.log(top100[5].title)
  res.render("keywordConnection", { adj, noun, verb })
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


