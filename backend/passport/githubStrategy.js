const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const User = require('../models/userModel');

module.exports = () => {
	passport.use(
		new GitHubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				callbackURL: 'http://localhost:4000/api/auth/github/callback',
			},
			async (accessToken, refreshToken, profile, done) => {
				const { login: name, id, email } = profile._json;
				try {
					const user = await User.findOne({ email });
					if (user) {
						user.githubId = id;
						await user.save();
						done(null, user);
					} else {
						const newUser = await User.create({
							name,
							email,
							githubId: id,
						});
						done(null, newUser);
					}
				} catch (error) {
					done(error.message);
				}
			}
		)
	);
};
