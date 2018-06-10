var express = require('express');
var passport = require('passport');
var usersDAO = require('../model/usersDAO');
var router = express.Router();
var serverHelper = require('../server/serverhelper');

function isAuthenticated(req, res, next) {
    if (req.user)
        return next();
    else
        return next();
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {user: req.user});
});

router.get('/signup', function (req, res) {
    res.render('signup', { message: '' });
});

router.post('/signup', function (req, res) {
    usersDAO.userFunctions.register(new usersDAO.userFunctions({
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            console.log('ERROR', err);
            return res.render('signup', { message: 'UserName is already registered' });
        }

        passport.authenticate('local')(req, res, function () {
            serverHelper.updateUserByName(req.body.username, 'isActive', true).then(() => {
                res.redirect('/dashboard');
            }).catch(() => {
                res.redirect('/login');
            });
        });
    });
});

router.get('/login', function (req, res) {
    res.render('login', { user: req.user });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            serverHelper.updateUserByName(req.body.username, 'isActive', true).then(() => {
                console.log('update', req.body.username);
                return res.redirect('/dashboard');
            }).catch(() => {
                return res.redirect('/login');
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    serverHelper.updateUserByName(req.user.username, 'isActive', false).then(() => {
        req.session.destroy();
        req.logout();
        res.redirect('/');
    }).catch(() => {
        req.session.destroy();
        req.logout();
        res.redirect('/');
    })
});

router.get('/dashboard', isAuthenticated, function (req, res, next) {
    res.render('dashboard', { user: req.user });
});

router.get('/video', isAuthenticated, function (req, res, next) {
    res.render('video', { user: req.user });
});

router.get('/getUser', function (req, res) {
    serverHelper.getUser(req.query.name).then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        console.log('Error', err);
        res.status(500).send('Something broke');
    });
});

router.get('/search', isAuthenticated,function(req, res, next) {
    res.render('search', { user: req.user });
});

router.post('/addTag', isAuthenticated, function (req, res) {
    serverHelper.addTag(req.body.name).then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        console.log('Error', err);
        res.status(500).send('Something broke');
    });
});

router.post('/matchIsHelp', isAuthenticated, function (req, res) {
    let param = req.body;
    serverHelper.matchIsHelp(param.giver, param.receiver, param.calledWho, param.isHelp).then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        console.log('Error', err);
        res.status(500).send('Something broke');
    });
});

router.get('/getDistinctTags', isAuthenticated, function (req, res) {
    serverHelper.getDistinctTags().then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        console.log('Error', err);
        res.status(500).send('Something broke');
    });
});

router.get('/getUserByTag', isAuthenticated, function (req, res) {
    serverHelper.getUserByTag(req.query.tag).then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        console.log('Error', err);
        res.status(500).send('Something broke');
    });
});

<<<<<<< HEAD
router.get('/name', isAuthenticated, function(req, res, next) {
  res.render('name', {giver: req.user, receiver: req.query.username});
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
=======
router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
>>>>>>> master
});



module.exports = router;