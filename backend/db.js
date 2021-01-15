const mongoose = require('mongoose');

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log(`Mongo DB connected ${conn.connection.host.green}`);
	} catch (error) {
		console.log(`Error: ${error.message}`.red.underline);
		process.exit(1);
	}
};

module.exports = connectDb;
