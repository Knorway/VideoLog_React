const express = require('express');
const {
	// loginUser,
	// loginGithub,
	registerUser,
	logout,
	passportLogin,
} = require('../controllers/userController');
const passport = require('passport');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', passportLogin('local'));
router.get('/logout', logout);
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passportLogin('github'));

module.exports = router;
