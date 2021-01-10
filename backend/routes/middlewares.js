module.exports.onlyFor = (role) => {
	return (req, res, next) => {
		switch (role) {
			case 'public':
				if (!req.isAuthenticated()) {
					return next();
				}
				return res.redirect('/');
			case 'user':
				if (req.isAuthenticated()) {
					return next();
				}
				return res.redirect('/');
			// case 'admin':
			// 	if (req.isAuthenticated()) {
			// 		return next();
			// 	}
			// 	return res.redirect('/');
			default:
				return res.redirect('/');
		}
	};
};
