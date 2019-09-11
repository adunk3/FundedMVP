import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser} from '../actions';




const Nav = () => {


    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);





    return (

        isAuthenticated
            ? <ul>
                <li><Link className="li" to="/home" onClick={() => dispatch(logoutUser())} >Logout</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                {/* <li><Link to="/chat">Chat</Link></li> */}
                <li className="right"><a>Logged in as {currentUser.name} </a></li>
            </ul>
            
            : <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>


    );
}

export default Nav;




