import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import Nav from './components/navbar';
import Landing from './components/landing';
import Student from './components/student';
import Funder from './components/funder';
import Dashboard from './components/dashboard';
import Upload from './components/upload';
import {  useSelector, useDispatch } from 'react-redux'
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions';
import jwt_decode from "jwt-decode";
import Chat from './components/Chat';


function App() {

  const dispatch = useDispatch();


  if(localStorage.jwtToken){
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;

    if(decoded.exp < currentTime) {
      dispatch(logoutUser);
      
    }
    
  }

  const isAuthenticated = useSelector(state => state.isAuthenticated);

  console.log(isAuthenticated);

  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route path='/chat' render={() => <div><div className="spacer1"></div><Chat /></div> } />
        <Route path='/register' render={() => <Register />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/dashboard' render={() => isAuthenticated ? <Dashboard /> : <Redirect to="/unauthorized" />  } />
        <Route path='/upload' render={() => isAuthenticated ? <Upload /> : <Redirect to='/unauthorized' />} />
        <Route path='/student' render={() => <Student />} />
        <Route path='/funder' render={() => <Funder />} />
        <Route path='/unauthorized' render={() => <h1>Not Authorized. You must login.</h1>} />
        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>

    </div>
  );
}

export default App;
