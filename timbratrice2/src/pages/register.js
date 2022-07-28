import React, { useState } from 'react';
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
        setRegister({...registerInput, [e.target.name]: e.target.value });
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
                if (res.data.status === 200) {          //If the api have success state then show a pop-up message with success operation
                    swal("Success", res.data.message, "success").then(function(){
                        window.location = '/';
                    });
                    history.push('/');
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors })
                }
            });
        });
    }


    return (                //Create the register form
        <center>
            <div>
                <form onSubmit={registerSubmit} className="form-reg">
                    <label className='register-write'>
                    Register Page
                    </label>
                    <label className='l'>
                        Name:
                        <input className='i' type="text" name="nome" onChange={handleInput} value={registerInput.nome} />
                        <span>{registerInput.error_list.nome}</span>
                    </label>
                    <label className='l'>
                        Surname:
                        <input className='i' type="text" name="cognome" onChange={handleInput} value={registerInput.cognome} />
                        <span>{registerInput.error_list.cognome}</span>
                    </label>
                    <label className='l'>
                        Email:
                        <input className='i' type="email" name="email" onChange={handleInput} value={registerInput.email} />
                        <span>{registerInput.error_list.email}</span>
                    </label>
                    <label className='l'>
                        Password:
                        <input className='i' type="password" name="password" onChange={handleInput} value={registerInput.password} />
                        <span>{registerInput.error_list.password}</span>
                    </label>
                    <center><button className='bsub' type='submit'>Submit</button></center>
                    <h5>If you have registred yet, you can login <a href='/' className='login-link'>here</a></h5>
                </form>
            </div>
        </center>
    );
}

export default Register;