import React, { useState } from 'react';
import axios from 'axios';
import Logo1 from './logo1.png';
import {  Redirect, Link } from 'react-router-dom';




const Register = () => {

    const initialState = {
        name: "",
        email: "",
        password: "",
        password2: "",
        userType: ""
    }


    const [user, setUser] = useState(initialState);
    const [type, setType] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);


    const handleInputChange = event => {
        const { name, value } = event.target;

        setUser({ ...user, [name]: value })
    }


    const submitRegister = async () => {

        if (type === 0) {
            user.userType = 'Student'
        } else {
            user.userType = 'Funder'
        }

        axios.post('http://localhost:5000/api/users/register', user)
            .then(res => {
                console.log(res);
                setIsRegistered(true);
            })
            .catch(err => {
                console.log(err);
            })

    }



    return (

        isRegistered
            ? <Redirect to="/login" />
            :
            <div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div class="container h-100">
                    <div class="d-flex justify-content-center h-100">
                        <div class="user_card1">
                            <div class="d-flex justify-content-center">
                                <div class="brand_logo_container">
                                    <img src={Logo1} class="brand_logo" alt="Logo"></img>
                                </div>
                                <div className="row">
                                    <div className="col-2"></div>
                                    <div className="col-4">
                                        <span onClick={() => setType(0)} className={`App-nav-item ${type === 0 && 'selected'}`}>
                                            Student
                                    </span>
                                    </div>
                                    <div className="col-4">
                                        <span onClick={() => setType(1)} className={`App-nav-item  ${type === 1 && 'selected'}`}>
                                            Funder
                                        </span>
                                    </div>
                                    <div className="col-2"></div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center form_container1">
                                <form>
                                    <div class="input-group mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" name="name" value={user.name} onChange={handleInputChange} class="form-control input_user" placeholder="name"/>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" name="email" value={user.email} onChange={handleInputChange} class="form-control input_user" placeholder="email"/>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" name="password" value={user.password} onChange={handleInputChange} class="form-control input_pass" placeholder="password"/>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" name="password2" value={user.password2} onChange={handleInputChange} class="form-control input_pass" placeholder="re-enter password"/>
                                    </div>
                                </form>
                            </div>
                            <div class="d-flex justify-content-center mt-3 login_container">
                                <button type="button" name="button" class="btn login_btn" onClick={() => submitRegister()}>Register</button>
                            </div>
                            <div class="mt-4">
                                <div class="d-flex justify-content-center links">
                                    Do you have questions? <Link to="/home" class="ml-2 a1">Learn more</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Register;



