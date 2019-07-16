var express = require("express");
var router = express.Router();
var User = require("../models/User");
var adjectives = require('../public/javascripts/adjectives')
var nouns = require('../public/javascripts/nouns')
var verbs = require('../public/javascripts/verbs')
var top100 = require('../public/javascripts/top100movies')
var topicList = require('../public/javascripts/genreTopics')
var topWords = require('../public/javascripts/topWords')
var myTopMovies = require('../public/javascripts/topMoviesMyList')
var asA = require('../public/javascripts/asA')

randomWord = (words) => {
  let randomNumber = Math.floor(Math.random() * words.length)
  return words[randomNumber]
}

/* GET signup page. */
router.get("/", function (req, res, next) {
  res.render("index", {});
});


router.get("/keyword-connection", (req, res, next) => {
  const adj = randomWord(adjectives);
  const noun = randomWord(nouns);
  const verb = randomWord(verbs);
  const topic = randomWord(topicList)
  const topWord = randomWord(topWords)
  res.render("keywordConnection", { adj, noun, verb, topic, topWord })
})


router.get("/movie-meets", (req, res, next) => {
  const movie1 = randomWord(top100).title
  const movie2 = randomWord(top100).title
  const movie3 = randomWord(myTopMovies)
  const asAthis = randomWord(asA)
  res.render("movieMeets", { movie1, movie2, movie3, asAthis })
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


