const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const {
	uploadVideo,
	getVideoList,
	getVideo,
	editVideo,
	deleteVideo,
	postComment,
	deleteComment,
} = require('../controllers/videoController');
const { onlyFor } = require('./middlewares');

const router = express.Router();

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: 'ap-northeast-2',
});

const videoUpload = multer({
	storage: multerS3({
		s3,
		acl: 'public-read',
		bucket: 'videolog-react/videos',
		key: (req, file, callback) => {
			callback(null, `${Date.now()}_` + file.originalname);
		},
	}),
});

router
	.route('/')
	.get(getVideoList)
	.post(onlyFor('user'), videoUpload.single('videoFile'), uploadVideo);

router
	.route('/:id')
	.get(getVideo)
	.put(onlyFor('user'), editVideo)
	.delete(onlyFor('user'), deleteVideo);

router
	.route('/:id/comments')
	.post(onlyFor('user'), postComment)
	.delete(onlyFor('user'), deleteComment);

module.exports = router;
