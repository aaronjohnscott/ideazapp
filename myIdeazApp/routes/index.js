var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Idea = require("../models/Idea");
var adjectives = require('../public/javascripts/adjectives')
var nouns = require('../public/javascripts/nouns')
var verbs = require('../public/javascripts/verbs')
var top100 = require('../public/javascripts/top250movies')
var topicList = require('../public/javascripts/genreTopics')
var topWords = require('../public/javascripts/topWords')
var myTopMovies = require('../public/javascripts/topMoviesMyList')
var asA = require('../public/javascripts/asA')
var genres = require('../public/javascripts/genres')

randomWord = (words) => {
  let randomNumber = Math.floor(Math.random() * words.length)
  return words[randomNumber]
}

/* GET login page. */
router.get("/", function (req, res, next) {
  req.session.userId = "Aaron"
  console.log(req.session.views)
  res.render("login", {
    title: "Form Validation",
    success: false,
    errors: req.session.errors
  })
  req.session.errors = null;
});

router.get('/register', (req, res, next) => {

  res.render('register', { alert: false })
})

router.post('/register', (req, res, next) => {
  //FIND ALL USERS AND SEARCH FOR EMAIL...
  let { email, password, password2 } = req.body;
  if (password !== password2) {
    res.render("register", {
      alert: "password does not match"
    })
    return
  }
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.render("register",
          { alert: "email already exists" })
        return
      }
      User.create({
        password,
        email
      })
        .then(() => {
          res.redirect(`login`)
        })
        .catch(e => console.log(e));
    }
    )
})

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  // get req.body info
  let { password, email } = req.body;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        res.render("login",
          { alert: "email not found" })
        return
      }
      if (user.password !== password) {
        res.render("login",
          { alert: "password doesn't match" })
        return
      }
      req.session.userId = user.id
      req.session.email = user.email
      res.redirect("/home")
    })
    .catch(err => console.log(err))
  // search db for email
  // if you find it, compare passwords
  // then start session 
})

router.post('/submitidea', (req, res) => {
  let userId = req.session.userId;
  let { genre, idea, keyword1, keyword2 } = req.body;
  Idea.create({
    genre,
    idea,
    keyword1,
    keyword2,
    userId
  })
    .then(() => {
      res.redirect(`back`)
    })
    .catch(e => console.log(e));
});

router.get("/keyword-connection", (req, res, next) => {
  if (!req.session.userId) {
    res.render('login')
    return
  }
  const topWord1 = randomWord(topWords)
  const topWord2 = randomWord(topWords)
  if (topWord2 == topWord1) {
    topWord2 = randomWord(topWords)
  }
  res.render("keywordConnection", { topWord1, topWord2 })
})

router.get("/movieplusmovie", (req, res, next) => {
  if (!req.session.userId) {
    res.render('login')
    return
  }
  const movie1 = randomWord(top100).title
  const movie2 = randomWord(top100).title
  if (movie2 == movie1) {
    movie2 = randomWord(myTopMovies)
    console.log(2)
  }
  res.render("moviePlus", { movie1, movie2 })
})

router.get("/genreswitch", (req, res, next) => {
  if (!req.session.userId) {
    res.render('login')
    return
  }
  const movie = randomWord(top100).title
  genre = randomWord(genres)
  res.render("genreChange", { movie, genre })
})


router.get("/movie-meets", (req, res, next) => {
  if (!req.session.userId) {
    res.render('login')
    return
  }
  const movie1 = randomWord(top100).title
  const asAthis = randomWord(asA)
  res.render("movieMeets", { movie1, asAthis })
})

router.get("/home", function (req, res, next) {
  res.render("dashboard", { username: req.session.email });
});


module.exports = router;


