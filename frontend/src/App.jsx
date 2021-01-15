import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import VideoDetailPage from './pages/VideoDetailPage';
import videoEditPage from './pages/videoEditPage';
import { MainContainer } from './styles/StyledConfig';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<MainContainer className='container'>
				<Route path='/' exact component={HomePage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/join' component={JoinPage} />
				<Route path='/upload' component={UploadPage} />
				<Route path='/videos/:id' exact component={VideoDetailPage} />
				<Route path='/videos/:id/edit' component={videoEditPage} />
			</MainContainer>
			{/* switch */}
		</BrowserRouter>
	);
};

export default App;
