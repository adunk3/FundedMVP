import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';






const Receipt = () => {

    const currentUser = useSelector(state => state.currentUser);

    const [fview, setFView] = useState(0);
    const [pview, setPView] = useState(0);
    const [purchases, setPurchases] = useState(['Books ', 'Lab Fee', 'Laptop'])
    const [funders] = useState(['Jay Jones', 'John Joseph', 'Lindsey Davis'])
    const [view, setView] = useState(0);
    const [funderz, setFunders] = useState([]);
    const [len, setLen] = useState(null);
    const [ready, setReady] = useState(0);


    useEffect(() => {

        let id = currentUser._id;
        let fArr = [];
        // console.log(id);
        axios.get(`http://localhost:5000/api/users/${id}/funders`)
            .then(res => {
                console.log(res.data);
                fArr.push(res.data);
                setReady(1);

            })
            .catch(err => {
                console.log(err);
                setReady(1);
            })

        setFunders(fArr);
        setLen(fArr.length);

        // setReady(1);

    }, [currentUser]);



    const toggle = () => {
        if (fview === 0) {
            setFView(1)
        } else {
            setFView(0);
        }
    }

    const toggle1 = () => {
        if (pview === 0) {
            setPView(1);
        } else {
            setPView(0);
        }
    }

    const toggle2 = () => {
        if (view === 0) {
            setView(1);
        } else {
            setView(0);
        }
    }


    return (

        <div className="text-center" >
            <div className="spacer"></div>
            <h1 className="white">Hello, {currentUser.name}</h1>
            <div class="box">
                <div class="container">
                    <div class="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="box-part text-center">
                                <i className="fa fa-usd fa-3x" aria-hidden="true"></i>
                                <div className="spacer"></div>
                                <div class="title">
                                    <h4>Balance</h4>
                                </div>
                                <div class="text">
                                    <div className="spacer"></div>
                                    <span className="span1"><h1>$72.00</h1></span>
                                    {fview !== 0 &&
                                        <div>
                                            <h5>Id: {currentUser._id}</h5>
                                            <input placeholder="Enter amt"></input>
                                            <button onClick={() => toggle()}>Request</button>
                                        </div>
                                    }
                                </div>
                                <div className="spacer"></div>
                                <button className="a1" onClick={() => toggle()} >Request Funds/ Show Id</button>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="box-part text-center">
                                <i className="fa fa-money fa-3x" aria-hidden="true"></i>
                                <div className="spacer"></div>
                                <div class="title">
                                    <h4>Total funded</h4>
                                </div>
                                <div class="text">
                                    <div className="spacer"></div>
                                    <span className="span1"><h1>$210.00</h1></span>
                                    {pview !== 0 &&
                                        <div>
                                            <ul>
                                                {purchases.map(x =>
                                                    <p>{x}</p>
                                                )}

                                            </ul>
                                        </div>
                                    }
                                </div>
                                <div className="spacer"></div>
                                <button className="a1" onClick={() => toggle1()} >View Purchases</button>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="box-part text-center">
                                <i className="fa fa-plug fa-3x" aria-hidden="true"></i>
                                <div className="spacer"></div>
                                <div class="title">
                                    <h4>Funder connections</h4>
                                </div>
                                <div class="text">
                                    <div className="spacer"></div>

                                    { ready === 1 && funderz.length !== 0 ? <span className="span1"><h1>{funderz[0].length}</h1></span> : <span className="span1"><h1>0</h1></span>}
                                    {view !== 0 && funderz.length !== 0 &&
                                        <ul>
                                            {funderz[0].map(x =>
                                                <p>{x.name}</p>
                                            )}
                                        </ul>
                                    }
                                </div>
                                <div className="spacer"></div>
                                <button className="a1" onClick={() => toggle2()}  >View Funders</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <Link className="button2" to="/upload">Upload receipts</Link>
            </div>
        </div>




    );
}


export default Receipt;


