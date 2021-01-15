const Video = require('../models/videoModel');

module.exports.uploadVideo = async (req, res) => {
	const { location } = req.file;
	const { title, description } = JSON.parse(req.body.form);

	try {
		const newVideo = await Video.create({
			title,
			description,
			fileUrl: location,
			creator: req.user.id,
		});

		req.user.videos.push(newVideo.id);
		await req.user.save();
		res.status(200).json({ message: 'video added', success: true, id: newVideo.id });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: 'failed to add video', success: false });
	}
};

module.exports.editVideo = async (req, res) => {
	const { title, description } = req.body;
	const { id } = req.params;

	try {
		await Video.findByIdAndUpdate(id, { title, description });
		res.json({ message: 'video edited', success: true });
	} catch (error) {
		console.error(error);
		res.json({ message: error, success: false });
	}
};

module.exports.deleteVideo = async (req, res) => {
	const { id } = req.params;

	try {
		await Video.findByIdAndDelete(id);
		res.json({ message: 'video edited', success: true });
	} catch (error) {
		console.error(error);
		res.json({ message: error, success: false });
	}
};

module.exports.getVideoList = async (req, res) => {
	try {
		const videos = await Video.find({});
		res.status(200).json(videos);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: 'failed to find videos', success: false });
	}
};

module.exports.getVideo = async (req, res) => {
	const { id } = req.params;

	try {
		const video = await Video.findById(id);
		res.status(200).json(video);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: 'failed to find video', success: false });
	}
};

module.exports.postComment = async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;

	try {
		const video = await Video.findById(id);
		video.comments.push({
			text: comment,
			creator: req.user.id,
		});
		await video.save();
		res.status(200).json({ message: 'comment added', success: true });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: 'failed to add comment', success: false });
	}
};

module.exports.deleteComment = async (req, res) => {};
