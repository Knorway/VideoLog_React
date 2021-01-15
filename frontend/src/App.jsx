import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
import VideoDetailPage from './pages/VideoDetailPage';
import videoEditPage from './pages/videoEditPage';
import { MainContainer } from './styles/StyledConfig';

const App = () => {
	return (
		<Router>
			<Header />
			<MainContainer className='container'>
				<Route path='/' exact component={HomePage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/join' component={JoinPage} />
				<Route path='/upload' component={UploadPage} />
				<Route path='/profile' component={ProfilePage} />
				<Route path='/users/:id' component={ProfilePage} />
				<Route path='/search/:keyword' component={SearchPage} />
				<Route path='/videos/:id' exact component={VideoDetailPage} />
				<Route path='/videos/:id/edit' component={videoEditPage} />
			</MainContainer>
			{/* switch */}
		</Router>
	);
};

export default App;
