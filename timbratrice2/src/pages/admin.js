import React, { useState } from "react";
import './admin.css';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
import { numbers, uppercase, lowercase, symbols } from "./character";

function Admin() {

    if(localStorage.getItem('auth_nome') !== 'admin@gmail.com'){
        swal({
            text: 'Unauthorized',
            icon: 'warning'
        }).then (function(){
            window.location = '/home'
        })
    }

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
            axios.post('http://127.0.0.1:8000/api/reg-admin', data).then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors })
                }
            });
        });
    }

    const [passwordG, setPassword] = useState('')
    const [passwordLenght, setPasswordLenght] = useState(20)
    const [includeUppercase, setIncludeUppercase] = useState(false)
    const [includeLowercase, setIncludeLowercase] = useState(false)
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeSymbols, setIncludeSymbols] = useState(false)

    const handleGeneratePassword = (e) => {
        let characterList = ''
        
        if(includeLowercase){
            characterList = characterList + lowercase
        }

        if(includeUppercase){
            characterList = characterList + uppercase
        }

        if(includeNumbers){
            characterList = characterList + numbers
        }

        if(includeSymbols){
            characterList = characterList + symbols
        }

        setPassword(createPassword(characterList))
    }

    const createPassword = (characterList) => {
        var passwordG = ''
        const characterListLenght = characterList.length

        for(var i = 0; i < passwordLenght; i++){
            const characterIndex = Math.round(Math.random() * characterListLenght)
            passwordG = passwordG + characterList.charAt(characterIndex)
        }
        return passwordG
    }

    const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea')
        newTextArea.innerText = passwordG
        document.body.appendChild(newTextArea)
        newTextArea.select()
        document.execCommand('copy')
        newTextArea.remove()
        swal({
            icon: 'success',
            text: 'Copy success'
        })
    }

    const handleCopyPassword = (e) => {
        copyToClipboard()
    }


    return (
        <div className="div-reg-user">
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
            <center><button className='bsub' type='submit'>Submit</button></center>
            </form>
            <form className="generator-form">
                <center>
                    <div>
                        <div className="generator">
                            <h4 className="generator-header">Password Generator</h4>
                            <div className="generator_password">
                                <h3>{passwordG}</h3>
                                <button type="button" onClick={handleCopyPassword} className="copy_btn">
                                    <i className="far fa-clipboard"></i>
                                </button>
                            </div>

                            <div className="form-group">
                            <label htmlFor="password-strenght">Password lenght</label>
                            <input defaultValue={passwordLenght} onChange={(e) => setPasswordLenght(e.target.value)} type="number" id="password-strenght" name="password-strenght" max="20" min="8" />
                            </div>

                            <div className="form-group">
                            <label htmlFor="uppercase-letters">Include Uppercase letters</label>
                            <input checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.value)} type="checkbox" id="uppercase-letters" name="uppercase-letters" max="20" min="8" />
                            </div>

                            <div className="form-group">
                            <label htmlFor="lowercase-letters">Include Lowercase letters</label>
                            <input checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.value)} type="checkbox" id="lowercase-letters" name="lowercase-letters" max="20" min="8" />
                            </div>

                            <div className="form-group">
                            <label htmlFor="include-numbers">Include Numbers</label>
                            <input checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.value)} type="checkbox" id="include-numbers" name="include-numbers" max="20" min="8" />
                            </div>

                            <div className="form-group">
                            <label htmlFor="include-symbols">Include Symbols</label>
                            <input checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.value)} type="checkbox" id="include-symbols" name="include-symbols" max="20" min="8" />
                            </div>

                            <button type="button" onClick={handleGeneratePassword} className="generator-btn">Generate password</button>
                        </div>
                    </div>
                </center>
            </form>
        </div>
    );

}

export default Admin;