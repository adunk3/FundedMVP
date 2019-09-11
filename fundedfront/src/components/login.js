import React, { useState } from 'react';
import axios from 'axios';
import {  Redirect, Link } from 'react-router-dom';
import { setCurrentUser } from '../actions';
import { useDispatch, useSelector } from 'react-redux'
import Logo1 from './logo1.png';
import setAuthToken from"../utils/setAuthToken";
import jwt_decode from"jwt-decode";



const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    let post = {
        email: email,
        password: password
    }

    const submitLogin =  () => {

        axios.post('http://localhost:5000/api/users/login', post)
            .then(res => {
                console.log(res);
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));

            })
            .catch(err => {
                console.log(err);
            })

    }

    return (

        isAuthenticated
            ? <Redirect to="/dashboard"/>
            :
                <div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>


                <div class="container h-100">
                    <div class="d-flex justify-content-center h-100">
                        <div class="user_card">
                            <div class="d-flex justify-content-center">
                                <div class="brand_logo_container">
                                    <img src={Logo1} class="brand_logo" alt="Logo"></img>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center form_container">
                                <form>
                                    <div class="input-group mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" value={email} onChange={e => { setEmail(e.target.value) }} class="form-control input_user" placeholder="email"></input>
                                    </div>
                                    <div class="input-group mb-2">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} class="form-control input_pass" placeholder="password"></input>
                                    </div>
                                </form>
                            </div>
                            <div class="d-flex justify-content-center mt-3 login_container">
                                <button type="button" onClick={() => submitLogin()} name="button" class="btn login_btn">Login</button>
                            </div>
                            <div class="mt-4">
                                <div class="d-flex justify-content-center links">
                                    Don't have an account? <Link to="/register" class="ml-2 a1">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            
    );
}



export default Login;



