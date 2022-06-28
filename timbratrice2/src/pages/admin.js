import React, { useState } from "react";
import './admin.css';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';

function Admin() {

    const [password, setPassword] = useState('')
    const [passwordLenght, setPasswordLenght] = useState(20)
    const [includeUppercase, setIncludeUppercase] = useState(false)
    const [includeLowercase, setIncludeLowercase] = useState(false)
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeSymbols, setIncludeSymbols] = useState(false)

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
                    swal("Success", res.data.message, "success");
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors })
                }
            });
        });
    }

    return (
        <div>
            <form onSubmit={registerSubmit} className="form-user">
                <label className='user-write'>
                    <center>Add Users</center>
                </label>
                <label className='lU'>
                    Nome:
                    <input className='iU' type="text" name="nome" onChange={handleInput} value={registerInput.nome} />
                    <span>{registerInput.error_list.nome}</span>
                </label>
                <label className='lU'>
                    Cognome:
                    <input className='iU' type="text" name="cognome" onChange={handleInput} value={registerInput.cognome} />
                    <span>{registerInput.error_list.cognome}</span>
                </label>
                <label className='lU'>
                    Email:
                    <input className='iU' type="email" name="email" onChange={handleInput} value={registerInput.email} />
                    <span>{registerInput.error_list.email}</span>
                </label>
                <label className='lU'>
                Password:
                <input className='iU' type="password" name="password" onChange={handleInput} value={registerInput.password} />
                <span>{registerInput.error_list.password}</span>
            </label>
                <center>
                    <div>
                        <div className="generator">
                            <h4 className="generator-header">Password Generator</h4>
                            <div className="generator_password">
                                <h3>{password}</h3>
                                <button className="copy_btn">
                                    <i className="far fa-clipboard"></i>
                                </button>
                            </div>

                            <div className="form-group">
                            <label htmlFor="password-strenght">Password lenght</label>
                            <input type="number" id="password-strenght" name="password-strenght" max="20" min="8" />
                            </div>

                            <div className="form-group">
                            <label htmlFor="uppercase-letters">Include Uppercase letters</label>
                            <input type="checkbox" id="uppercase-letters" name="uppercase-letters" max="20" min="8" />
                            </div>

                            <div className="form-group">
                            <label htmlFor="lowercase-letters">Include Lowercase letters</label>
                            <input type="checkbox" id="lowercase-letters" name="lowercase-letters" max="20" min="8" />
                            </div>

                            <div className="form-group">
                            <label htmlFor="include-numbers">Include Numbers</label>
                            <input type="checkbox" id="include-numbers" name="include-numbers" max="20" min="8" />
                            </div>

                            <div className="form-group">
                            <label htmlFor="include-symbols">Include Symbols</label>
                            <input type="checkbox" id="include-symbols" name="include-symbols" max="20" min="8" />
                            </div>

                            <button className="generator-btn">Generate password</button>
                        </div>
                    </div>
                </center>
                    <center><button className='bsub' type='submit'>Submit</button></center>
            </form>
        </div>
    );

}

export default Admin;