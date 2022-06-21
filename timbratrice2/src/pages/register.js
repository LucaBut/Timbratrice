import React, { Component, useState } from 'react';
import "./register.css";
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';

function Register() {

    const history = useNavigate();

    const [registerInput, setRegister] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            nome: registerInput.nome,
            cognome: registerInput.cognome,
            email: registerInput.email,
            password: registerInput.password,
        }


        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://127.0.0.1:8000/api/reg', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_nome', res.data.username);
                    swal("Success", res.data.message, "success");
                    history.pushState('/')
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors })
                }
            });
        });
    }


    return (
        <center>
            <div>
                <h1><center>Register Page</center></h1>
                <form onSubmit={registerSubmit}>
                    <label className='l1'>
                        Nome:
                        <input className='i1' type="text" name="nome" onChange={handleInput} value={registerInput.nome} />
                        <span>{registerInput.error_list.nome}</span>
                    </label>
                    <label className='l2'>
                        Cognome:
                        <input className='i2' type="text" name="cognome" onChange={handleInput} value={registerInput.cognome} />
                        <span>{registerInput.error_list.cognome}</span>
                    </label>
                    <label className='l3'>
                        Email:
                        <input className='i3' type="email" name="email" onChange={handleInput} value={registerInput.email} />
                        <span>{registerInput.error_list.email}</span>
                    </label>
                    <label className='l4'>
                        Password:
                        <input className='i4' type="password" name="password" onChange={handleInput} value={registerInput.password} />
                        <span>{registerInput.error_list.password}</span>
                    </label>
                    <button className='bsub' type='submit'>Submit</button>
                    <h5>If you have registred yet, you can login <a href='/'>here</a></h5>
                </form>
            </div>
        </center>
    );
}

export default Register;
