import React, { useState, useEffect, Component } from 'react';
import "./index.css";
import axios from 'axios';
import swal from 'sweetalert';
import Moment from 'react-moment';
import 'moment-timezone';


function Home() {

    const [start, setStart] = useState({
        email: '',
        error_list: [],
    });


    const handleDate = (e) => {
        e.persist();
        setStart({ ...start, [e.target.name]: e.target.value });
    }

    const startSubmit = (e) => {
        e.preventDefault();
        start.email = localStorage.getItem('auth_nome');
        const data = {
            email: start.email,
        }

        
        axios.post('http://127.0.0.1:8000/api/start', data).then(res => {
            if (res.data.status === 200) {
                localStorage.clear();
                swal("Good Work", res.data.message, "success").then(function () {
                    window.location = '/';
                })
            } else {
                setStart({ ...start, error_list: res.data.validation_error });
            }
        })
    }


    const [end, setEnd] = useState({
        email: '',
        error_list_: [],
    })

    const handleEnd = (e) => {
        e.persist();
        setEnd({ ...end, [e.target.name]: e.target.value });
    }

    const endSubmit = (e) => {
        e.preventDefault();
        end.email = localStorage.getItem('auth_nome');
        const data = {
            email: end.email,
        }

        axios.post('http://127.0.0.1:8000/api/fine', data).then(res => {
            if (res.data.status === 200) {
                console.log(end.email);
                localStorage.clear();
                swal("Goodbye", res.data.message, "success").then(function () {
                    window.location = '/';
                })
            } else {
                setEnd({ ...end, error_list_: res.data.validation_error });
            }
        })
    }


    return (
        
            <div className='App'>
        <form onSubmit={startSubmit} className="form-home">
            <div>
                <h1 className='title'>Welcome to the company</h1>
                <button className="b1" onChange={handleDate} value={start.email}>Start shift</button>
            </div>
        </form>
                <Moment interval={1000} format='MMMM Do YYYY, HH:mm:ss' className='clock'></Moment>
        <form onSubmit={endSubmit}>
            <div>
                <button className="b2" onChange={handleEnd} value={start.email}>End shift</button>
            </div>
        </form>
        </div>
    );

}


export default Home;