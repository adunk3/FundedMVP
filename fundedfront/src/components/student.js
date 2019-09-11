import React from 'react';
import { Link } from 'react-router-dom';



const Student = () => {



    return (
        <div>
            <div className="text-center justify-content-center">
                <div className="spacer1"></div>
                <div className="spacer"></div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 landing">
                        <h1 className="abc"><strong>STUDENTS</strong></h1>
                    </div>
                </div>
                <div className="spacer"></div>
                <div className="spacer"></div>

                <div className="row">
                    <div className="col-5"></div>
                    <div className="col-2">
                        <Link className="button1" to="/register">Get Started</Link>
                    </div>
                    <div className="col-5"></div>
                </div>
            </div>

            <div class="box">
                <div class="container">
                    <div class="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="box-part text-center">
                                <i className="fa fa-usd fa-3x" aria-hidden="true"></i>
                                <div className="spacer"></div>
                                <div class="title">
                                    <h4>Check Balance</h4>
                                </div>
                                <div class="text">
                                    <span className="span1">Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                                </div>
                                <div className="spacer"></div>
                                {/* <Link to="/home" className="a1" >Learn More</Link> */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="box-part text-center">
                                <i className="fa fa-share fa-3x" aria-hidden="true"></i>
                                <div className="spacer"></div>
                                <div class="title">
                                    <h4>Share</h4>
                                </div>
                                <div class="text">
                                    <span className="span1">Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                                </div>
                                <div className="spacer"></div>
                                {/* <Link to="/home" className="a1" >Learn More</Link> */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="box-part text-center">
                                <i className="fa fa-shopping-cart fa-3x" aria-hidden="true"></i>
                                <div className="spacer"></div>
                                <div class="title">
                                    <h4>How to spend</h4>
                                </div>
                                <div class="text">
                                    <span className="span1">Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                                </div>
                                <div className="spacer"></div>
                                {/* <Link to="/home" className="a1" >Learn More</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;