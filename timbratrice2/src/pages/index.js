// import React from 'react';
import React, { useState, useEffect, Component } from 'react';
import "./index.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Home() {

    const history = useNavigate();

    const [start, setStart] = useState({
        timestamp: Date.now(),
        email: '',
        error: [],
    });

    const handleDate = (e) => {
        e.persist();
        setStart({ ...start, [e.target.name]: e.target.value });
    }

    const startSubmit = (e) => {
        e.preventDefault();
        const data = {
            timestamp: start.timestamp,
            email: start.email,
        }

        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://127.0.0.1:8000/api/start', data).then(res => {
                if (res.data.status === 200) {
                    start.email = localStorage.getItem('auth_nome', res.data.username);
                    swal("Inizio", res.data.message, "success").then(function () {
                        window.location = '/';
                    })
                    localStorage.clear();
                    history.push('/');
                } else {
                    setStart({ ...start, error_list: res.data.validation_error });
                }
            })
        });
    }


    var data = new Date();
    var Hh, Mm, Ss, m, a, dd, b;

    Hh = data.getHours();
    Mm = data.getMinutes();
    Ss = data.getSeconds();
    m = data.getMonth();
    a = data.getFullYear();
    dd = data.getDate();

    return (
        <form onSubmit={startSubmit}>
            <div className='App'>
                <center><h1 className='title'>Benvenuto nell'azienda</h1></center>
                <button className="b1" onChange={handleDate} value={start.timestamp}>Timbro inizio turno</button>
                <h4 className='clock'>{("Sono le ore: " + Hh + ":" + Mm + ":" + Ss + " del giorno: " + dd + "-" + m + "-" + a).toString()}</h4>
                <button className="b2">Timbro fine turno</button>
            </div>
        </form>

    );

}


export default Home;
