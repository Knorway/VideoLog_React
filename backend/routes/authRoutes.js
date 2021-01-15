const express = require('express');
const { registerUser, logout, passportLogin } = require('../controllers/userController');
const passport = require('passport');
const { onlyFor } = require('./middlewares');

const router = express.Router();

router.post('/register', onlyFor('public'), registerUser);
router.post('/login', passportLogin('local')); // not only public for manual localstorage clear on browser
router.get('/logout', logout);
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passportLogin('github'));

module.exports = router;
