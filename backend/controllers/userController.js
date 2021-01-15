const passport = require('passport');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports.registerUser = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;
	const userExists = await User.findOne({ email });
	console.log(name, email, password, confirmPassword);

	try {
		if (userExists) {
			res.status(400);
			throw new Error('User already exists');
		}

		if (password !== confirmPassword) {
			res.status(400);
			throw new Error('Please confirm your password');
		}

		const hash = await bcrypt.hash(password.toString(), 12);
		const user = await User.create({ name, email, password: hash });

		if (user) {
			res.status(200).json({
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
				},
			});
		} else {
			res.status(400);
			throw new Error('Invalid user data');
		}
	} catch (error) {
		res.json({ message: error.message, succsess: false });
	}
};

module.exports.passportLogin = (option) => async (req, res, next) => {
	passport.authenticate(option, (authError, user, _) => {
		if (authError) {
			console.error(authError);
			// res.status(400);
			return res.status(400).json({ message: authError, succsess: true });
		}

		return req.logIn(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}
			return res.json({
				message: 'Login success',
				succsess: true,
				user: {
					id: req.user.id,
					name: req.user.name,
					email: req.user.email,
					isAdmin: req.user.isAdmin,
				},
			});
		});
	})(req, res, next);
};

module.exports.logout = (req, res) => {
	req.logout();
	req.session.destroy();
	res.json({ message: 'Logout success', succsess: true });
};
