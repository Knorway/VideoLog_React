import { useRef, useState } from 'react';
import styled from 'styled-components';

let videoRecorder;
let stream;

const VideoRecorderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	.record-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 80%;
		margin-bottom: 50px;
		video {
			width: 100%;
			margin-bottom: 20px;
			background-color: #495057;
		}
	}
`;

const VideoRecorder = () => {
	const [onRecording, setOnRecording] = useState(false);
	const videoRef = useRef();

	const handleVideoData = (e) => {
		const { data: videoFile } = e;
		const link = document.createElement('a');

		link.href = URL.createObjectURL(videoFile);
		link.download = `${Date.now()}.webm`;
		document.body.appendChild(link);
		link.click();
	};

	const stopRecording = () => {
		const stream = videoRef.current.srcObject;
		const tracks = stream.getTracks();

		setOnRecording(false);
		videoRecorder.stop();

		tracks.forEach((track) => track.stop());
		videoRef.current.srcObject = null;
	};

	const startRecording = () => {
		videoRecorder = new MediaRecorder(stream, {
			mimeType: 'video/webm;codecs=h264,vp9,opus',
		});
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
		<VideoRecorderContainer>
			<div className='record-container'>
				<video ref={videoRef}></video>
				{!onRecording && (
					<button onClick={onRecording ? stopRecording : getPreview}>
						녹화 시작하기
					</button>
				)}
				{onRecording && (
					<button className='button-danger' onClick={stopRecording}>
						녹화 그만하기
					</button>
				)}
			</div>
		</VideoRecorderContainer>
	);
};

export default VideoRecorder;
