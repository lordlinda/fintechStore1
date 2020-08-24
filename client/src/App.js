import React from 'react';
import {Provider} from 'react-redux'
import store from './redux/store.js'
import {ToastContainer} from 'react-toastify'
import './assets/main.css'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Signup from './components/Authuser/Signup.js'
import Signin from './components/Authuser/Signin.js'
import Navbar from './components/Navbar.js'
import ForgetPassword from './components/Password/ForgetPassword.js'
import ResetPassword from './components/Password/ResetPassword.js'
import Home from './components/Home.js'
import Cart from './components/Cart.js'
import History from './components/History.js'
function App() {
  return (
    <Provider store={store}>
    <div>
    <Router>
    <Navbar />
    <ToastContainer />
    <Switch>
    <Route exact path='/signup' component={Signup}/>
     <Route exact path='/signin' component={Signin}/>
     <Route exact path='/forgetPassword' component={ForgetPassword}/>
     <Route exact path='/resetPassword/:token' component={ResetPassword}/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/cart' component={Cart}/>
      <Route exact path='/history' component={History}/>
    </Switch>
     </Router>
    </div>
    </Provider>
  );
}

export default App;
