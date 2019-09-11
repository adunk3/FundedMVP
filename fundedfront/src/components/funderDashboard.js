import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../actions';
import axios from 'axios';




const FunderDash = () => {

    const currentUser = useSelector(state => state.currentUser);
    const [connection, setConnection] = useState('');
    const [students, setStudents] = useState([]);
    const [err, setErr] = useState(0);
    const [pview, setPView] = useState(0);
    const [view, setView] = useState(0);
    const [fview, setFView] = useState(0);
    const [funds, setFunds] = useState(500.25);
    const [added, setAdded] = useState(0);
    const [purch, setPurch] = useState('');
    const [purchases, setPurchases] = useState(['Books ', 'Lab Fee', 'Laptop'])
    const dispatch = useDispatch();


    useEffect(() => {

        let sArr = [];

        for (var x of currentUser.associations) {
            axios.get(`http://localhost:5000/api/users/${x}`)
                .then(res => {
                    console.log(res.data.name);
                    sArr.push(res.data.name);
                })
        }

        setStudents(sArr);



    }, [currentUser.associations]);


    let q = {
        associations: [...currentUser.associations, connection]
    }


    const addFunds = () => {


        setFunds(funds + parseFloat(added));
        setFView(0);
        setAdded(0);
    }

    const addPurchase = () => {
        setPurchases([...purchases, purch]);
        setPView(0);
        setPurch('');
    }

    const toggle = () => {
        if (fview === 0) {
            setFView(1)
        } else {
            setFView(0);
        }
    }

    const toggle1 = () => {
        if (pview === 0) {
            setPView(1)
        } else {
            setPView(0);
        }
    }

    const viewStudents = () => {
        if (view === 0) {
            setView(1);
        } else if (view === 1) {
            setView(0);
        }
    }

    const addConnection = async () => {
        axios.put(`http://localhost:5000/api/users/addconnection/${currentUser._id}`, q)
            .then(res => {
                console.log(res);
                dispatch(setCurrentUser(res.data));
                setErr(0);
                setConnection('');
            })
            .catch(err => {
                console.log(err);
                setErr(1);
            })
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
                                    <span className="span1"><h1>${funds}</h1></span>
                                    {fview !== 0 &&
                                        <div>
                                            <input value={added} onChange={e => { setAdded(e.target.value) }} placeholder="Enter amt"></input>
                                            <button onClick={() => addFunds()}>Add</button>
                                        </div>
                                    }
                                </div>
                                <div className="spacer"></div>
                                <button className="a1" onClick={() => toggle()} >Add Funds</button>
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
                                    <span className="span1"><h1>$710.00</h1></span>
                                    {pview !== 0 &&
                                        <div>
                                            <ul>
                                                {purchases.map(x =>
                                                    <p>{x}</p>
                                                )}

                                            </ul>
                                            <div>
                                                <div className="spacer"></div>
                                                <input value={purch} onChange={e => { setPurch(e.target.value) }} placeholder="Enter purchase"></input>
                                                <button onClick={() => addPurchase()}>Add</button>
                                            </div>
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
                                    <h4>Student connections</h4>
                                </div>
                                <div class="text">
                                    <div className="spacer"></div>
                                    <span className="span1"><h1>{currentUser.associations.length}</h1></span>
                                    {view !== 0 &&
                                        <ul>
                                            {students.length === currentUser.associations.length && students.map(x =>
                                                <p>{x}</p>
                                            )}
                                        </ul>
                                    }
                                </div>
                                <div className="spacer"></div>
                                <button className="a1" onClick={() => viewStudents()}>View Students</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dash">
                {err !== 0
                    ? <h5 className="white"> Invalid </h5>
                    : <h1></h1>
                }
                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input class="form-control input_user" value={connection} onChange={e => { setConnection(e.target.value) }}></input>
                </div>
                <button className="button3" onClick={() => addConnection()}>Add Connection</button>
            </div>
        </div>



    );
}

export default FunderDash;