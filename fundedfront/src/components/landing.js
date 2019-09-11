import React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {



    return (

        <div className="text-center justify-content-center">
            <div className="spacer1"></div>
            <div className="spacer1"></div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 landing">
                    <h1><strong>WE CONNECT STUDENTS AND FUNDERS</strong></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10 landing">
                    <p>We are committed to helping students get access to funds for school. Want to help fund a student? Sign up as a funder! Are you a student that needs money for school expenses? Sign up as a student! </p>
                </div>
            </div>
            <div className="spacer"></div>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-2">
                    <Link className="button" to="/student">Student</Link>
                </div>
                <div className="col-2">
                    <Link className="button" to="/funder">Funder</Link>
                </div>
                <div className="col-4"></div>
            </div>
        </div>

    )

}

export default Landing;