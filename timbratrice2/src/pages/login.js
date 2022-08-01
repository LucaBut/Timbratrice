import React, { useState } from 'react';
import "./login.css"
import axios from 'axios';
import swal from 'sweetalert';

function SignUp() {

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        token: '',
        error_list: [],
    });

    const handleInput = (e) => {
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
                if (res.data.status === 200) {       //If the api have success state then show a pop-up message with success operation
                    sessionStorage.setItem('auth_token', res.data.token);
                    sessionStorage.setItem('auth_nome', res.data.username);
                    swal("Success", res.data.message, "success").then(function () {
                        if(sessionStorage.getItem('auth_nome') === 'admin@gmail.com'){
                            window.location='/view';
                        }else{
                            window.location = '/home';
                        }
                    });
         
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            })
        })
    }

    return (        //Create the login form
        <center>
            <div>
                <form onSubmit={loginSubmit} className="form-login">
                    <label className='Login-write'><center>Login Page</center></label>
                    <label className='l'>
                        Email:
                        <input className='i1' type="email" name='email' onChange={handleInput} value={loginInput.email} required />
                        <span>{loginInput.error_list.email}</span>
                    </label>
                    <label className='l'>
                        Password:
                        <input className='i2' type="password" name='password' onChange={handleInput} value={loginInput.password} required />
                        <span>{loginInput.error_list.password}</span>
                    </label>
                    <button className='bsub' type='submit'>Submit</button>
                    <h5>If you haven't registred yet, you can register <a href='/register' className='reg-link'>here</a></h5>
                </form>
            </div>
        </center>
    );
}

export default SignUp;