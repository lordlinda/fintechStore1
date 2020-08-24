import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootReducer from './reducers/index.js'
import axios from 'axios'
const token = localStorage.getItem('token')
axios.defaults.headers.common['authorization'] = token;
const store = createStore(rootReducer,{
} ,composeWithDevTools(
  applyMiddleware(thunk),
));


export default store