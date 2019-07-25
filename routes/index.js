var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Idea = require("../models/Idea");
var top100 = require('../public/javascripts/top250movies')
var topWords = require('../public/javascripts/topWords')
var myTopMovies = require('../public/javascripts/topMoviesMyList')
var asA = require('../public/javascripts/asA')
var genres = require('../public/javascripts/genres')
var passport = require("passport")
const bcrypt = require('bcryptjs')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

randomWord = (words) => {
  let randomNumber = Math.floor(Math.random() * words.length)
  return words[randomNumber]
}


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register POST
router.post('/register', (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  if (!email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log(errors)
    res.render('register', {
      errors,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          email,
          password,
          password2
        });
      } else {
        bcrypt.hash(password, 8, (err, hash) => {
          console.log(hash)
          User.create({
            password: hash,
            email
          })
            .then(() => {
              res.redirect(`login`)
            })
            .catch(e => console.log(e));
        })
      }
    });
  }
});

router.get('/', (req, res, next) => {
  res.redirect('/login')
})

router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    res.redirect('/dashboard');
  });

router.post('/submitidea', (req, res) => {
  let userId = req.user.id;
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

router.get("/keyword-connection", ensureAuthenticated, (req, res, next) => {
  const topWord1 = randomWord(topWords)
  const topWord2 = randomWord(topWords)
  if (topWord2 == topWord1) {
    topWord2 = randomWord(topWords)
  }
  res.render("keywordConnection", { topWord1, topWord2 })
})

router.get("/movieplusmovie", ensureAuthenticated, (req, res, next) => {
  const movie1 = randomWord(top100).title
  const movie2 = randomWord(top100).title
  if (movie2 == movie1) {
    movie2 = randomWord(myTopMovies)
  }
  res.render("moviePlus", { movie1, movie2 })
})

router.get("/genreswitch", ensureAuthenticated, (req, res, next) => {
  const movie = randomWord(top100).title
  genre = randomWord(genres)
  res.render("genreChange", { movie, genre })
})


router.get("/movie-meets", ensureAuthenticated, (req, res, next) => {
  const movie1 = randomWord(top100).title
  const asAthis = randomWord(asA)
  res.render("movieMeets", { movie1, asAthis })
})

router.get("/dashboard", ensureAuthenticated, function (req, res, next) {
  Idea.findAll({ where: { userId: req.user.id } })
    .then(ideas => {
      res.render("dashboard", { user: req.user, ideas });
    })
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});


module.exports = router;


