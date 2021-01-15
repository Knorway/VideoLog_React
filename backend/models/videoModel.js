const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const videoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: 'title is required',
		},
		description: String,
		fileUrl: {
			type: String,
			required: 'fileUrl is required',
		},
		views: {
			type: Number,
			default: 0,
		},
		comments: [commentSchema],
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Model = mongoose.model('video', videoSchema);

module.exports = Model;
