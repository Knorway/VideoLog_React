const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDb = require('./db');
const passportConfig = require('./passport/index');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');

const app = express();

// ------initial config------ #
require('colors');
dotenv.config();
connectDb();
passportConfig();
// -------------------------- #

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET,
		cookie: {
			httpOnly: true,
			secure: false,
		},
		name: 'session-cookie',
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// ----------------Ready for Deploy---------------- #
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve('frontend', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve('frontend', 'build', 'index.html'));
	});
} else {
	app.get('/', (req, res) => res.send('API is running...'));
}
// ------------------------------------------------ #

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(
		`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.cyan
	);
});
