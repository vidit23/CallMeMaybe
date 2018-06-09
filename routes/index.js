var express = require('express');
var passport = require('passport');
var usersDAO = require('../model/usersDAO');
var router = express.Router();
var serverHelper = require('../server/serverhelper');

function isAuthenticated(req,res,next){
  if(req.user)
     return next();
  else
     return next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res) {
  res.render('signup', { message: ''});
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
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

router.get('/dashboard', isAuthenticated, function(req, res, next) {
  res.render('dashboard', {user: req.user});
});

router.get('/video', isAuthenticated,function(req, res, next) {
  res.render('video');
});

router.get('/search', isAuthenticated,function(req, res, next) {
  res.render('search');
});

router.get('/getUser', function(req,res) {
  serverHelper.getUser(req.query.name).then((response) => {
    res.status(200).send(response);
  }).catch(err => {
    console.log('Error', err);
    res.status(500).send('Something broke');
  });
})

router.post('/addTag', isAuthenticated, function(req,res) {
  serverHelper.addTag(req.body.name).then((response) => {
    res.status(200).send(response);
  }).catch(err => {
    console.log('Error', err);
    res.status(500).send('Something broke');
  });
})

router.get('/getDistinctTags', isAuthenticated, function(req,res) {
  serverHelper.getDistinctTags().then((response) => {
    res.status(200).send(response);
  }).catch(err => {
    console.log('Error', err);
    res.status(500).send('Something broke');
  });
})

router.get('/getUserByTag', isAuthenticated, function(req,res) {
  serverHelper.getUserByTag(req.query.tag).then((response) => {
    res.status(200).send(response);
  }).catch(err => {
    console.log('Error', err);
    res.status(500).send('Something broke');
  });
})

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});



module.exports = router;
