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

const app = express();

// ------initial config------ #
require('colors');
dotenv.config();
connectDb();
passportConfig();
// -------------------------- #

app.use(helmet());
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

app.use('/test', (req, res) => {
	res.json({ message: 'backend' });
});
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(
		`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.cyan
	);
});
