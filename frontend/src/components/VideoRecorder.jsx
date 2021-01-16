import { useRef, useState } from 'react';

let videoRecorder;
let stream;

const VideoRecorder = () => {
	const [onRecording, setOnRecording] = useState(false);
	const videoRef = useRef();

	const handleVideoData = (e) => {
		const { data: videoFile } = e;
		const link = document.createElement('a');
		console.log(videoFile);

		link.href = URL.createObjectURL(videoFile);
		link.download = `${Date.now()}.webm`;
		document.body.appendChild(link);
		link.click();
	};

	const stopRecording = () => {
		setOnRecording(false);
		videoRecorder.stop();
	};

	const startRecording = () => {
		videoRecorder = new MediaRecorder(stream);
		videoRecorder.addEventListener('dataavailable', handleVideoData);
		videoRecorder.start();
	};

	const getPreview = async () => {
		stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});

		videoRef.current.srcObject = stream;
		videoRef.current.muted = true;
		videoRef.current.play();

		setOnRecording(true);
		startRecording();
	};

	return (
		<div>
			<video ref={videoRef}></video>
			{!onRecording && (
				<button onClick={onRecording ? stopRecording : getPreview}>
					start recording
				</button>
			)}
			{onRecording && (
				<button className='button-danger' onClick={stopRecording}>
					stop recording
				</button>
			)}
		</div>
	);
};

export default VideoRecorder;
