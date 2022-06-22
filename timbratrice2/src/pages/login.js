import React, { Component, useState } from 'react';
import "./login.css"
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const history = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://127.0.0.1:8000/api/login', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_nome', res.data.username);
                    swal("Success", res.data.message, "success").then(function () {
                        window.location = '/home';
                    });
                    history.push('/home');
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            })
        })
    }

    return (
        <center>
            <div>
                <h1><center>Login Page</center></h1>
                <form onSubmit={loginSubmit}>
                    <label className='l1'>
                        Email:
                        <input className='i1' type="email" name='email' onChange={handleInput} value={loginInput.email} required />
                        <span>{loginInput.error_list.email}</span>
                    </label>
                    <label className='l2'>
                        Password:
                        <input className='i2' type="password" name='password' onChange={handleInput} value={loginInput.password} required />
                        <span>{loginInput.error_list.password}</span>
                    </label>
                    <button className='bsub' type='submit'>Submit</button>
                    <h5>If you haven't registred yet, you can register <a href='/register'>here</a></h5>
                </form>
            </div>
        </center>
    );
}

export default SignUp;