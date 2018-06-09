var express = require('express');
var passport = require('passport');
var usersDAO = require('../model/usersDAO');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res) {
  res.render('signup', { message: ''});
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.post('/signup', function(req, res) {
  usersDAO.userFunctions.register(new usersDAO.userFunctions({ username : req.body.username }), req.body.password, function(err, user) {
      if (err) {
          console.log('ERROR', err);
          return res.render('signup', { message : 'UserName is already registered'});
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/');
      });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
  }));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});



module.exports = router;
