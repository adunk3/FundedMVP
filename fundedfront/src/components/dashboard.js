import React from 'react';
import {  useSelector } from 'react-redux'
import FunderDash from './funderDashboard';
import Receipt from './receipt';



const Dashboard = () => {
    
    const currentUser = useSelector(state => state.currentUser);

    console.log(currentUser);
    
    
    
    return (  

        currentUser.userType === "Student"

        ? <Receipt /> 
        : <FunderDash />
        





    );
}
 
export default Dashboard;