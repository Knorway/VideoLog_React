import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import { MainContainer } from './styles/StyledConfig';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<MainContainer className='container'>
				<Route path='/' exact component={HomePage} />
				<Route path='/login' exact component={LoginPage} />
				<Route path='/join' exact component={JoinPage} />
				<Route path='/upload' exact component={UploadPage} />
			</MainContainer>
		</BrowserRouter>
	);
};

export default App;
