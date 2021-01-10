const passport = require('passport');
const localStrategy = require('./localStrategy');
const User = require('../models/userModel');

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id)
			.then((user) => done(null, user))
			.catch((error) => done(error));
	});

	localStrategy();
};
