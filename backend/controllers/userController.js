const passport = require('passport');
const User = require('../models/userModel');

module.exports.registerUser = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;
	const userExists = await User.findOne({ email });

	try {
		if (userExists) {
			res.status(400);
			throw new Error('User already exists');
		}

		if (password !== confirmPassword) {
			res.status(400);
			throw new Error('Please confirm your password');
		}

		const user = await User.create({ name, email, password });

		if (user) {
			res.status(200).json({
				id: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(400);
			throw new Error('Invalid user data');
		}
	} catch (error) {
		res.json({ message: error.message });
	}
};

module.exports.loginUser = async (req, res, next) => {
	passport.authenticate('local', (authError, user, __) => {
		if (authError) {
			console.error(authError);
			return res.json({ message: authError });
		}

		return req.logIn(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}
			return res.json({ message: 'Login success' });
		});
	})(req, res, next);
};

module.exports.logout = (req, res) => {
	req.logout();
	req.session.destroy();
	res.json({ message: 'logout success' });
};
