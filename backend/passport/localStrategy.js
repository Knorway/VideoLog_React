const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async (email, password, done) => {
				try {
					const user = await User.findOne({ email });
					if (!user) {
						throw new Error('User not found');
					}

					const isMatch = await user.matchPassword(password);
					if (!isMatch) {
						throw new Error('Password does not matchs');
					}

					done(null, user);
				} catch (error) {
					done(error.message);
				}
			}
		)
	);
};
