import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReduer from './modules';

const store = createStore(rootReduer, composeWithDevTools());

export default store;
