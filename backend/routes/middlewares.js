module.exports.onlyFor = (role) => {
	return (req, res, next) => {
		switch (role) {
			case 'public':
				if (!req.isAuthenticated()) {
					return next();
				}
				return res
					.status(400)
					.json({ message: 'not authorized', success: false });
			case 'user':
				if (req.isAuthenticated()) {
					return next();
				}
				return res
					.status(400)
					.json({ message: 'not authorized', success: false });
			case 'admin':
				if (req.isAuthenticated() && req.user.isAdmin) {
					return next();
				}
				return res
					.status(400)
					.json({ message: 'not authorized', success: false });
			default:
				return res
					.status(400)
					.json({ message: 'not authorized', success: false });
		}
	};
};
