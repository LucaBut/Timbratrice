import React, { useState } from "react";
import './admin.css';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
import { numbers, uppercase, lowercase, symbols } from "./character";

function Admin() {

    if(sessionStorage.getItem('auth_nome') !== 'admin@gmail.com'){
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
            password: passwordG,
        }

        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://127.0.0.1:8000/api/reg-admin', data).then(res => {
            <h4>Loading...</h4>   
            swal("Loading, 'info"); 
            if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors })
                }
            });
        });
    }

    const [passwordG, setPassword] = useState('')
    const [passwordLenght, setPasswordLenght] = useState(12)

    const handleGeneratePassword = (e) => {
        let characterList = ''
        characterList = characterList + lowercase + uppercase + numbers + symbols 

        setPassword(createPassword(characterList))
        console.log(setPassword);
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
                    Name:
                    <input className='iU' type="text" name="nome" onChange={handleInput} value={registerInput.nome} />
                    <span>{registerInput.error_list.nome}</span>
                </label>
                <label className='lU'>
                    Surname:
                    <input className='iU' type="text" name="cognome" onChange={handleInput} value={registerInput.cognome} />
                    <span>{registerInput.error_list.cognome}</span>
                </label>
                <label className='lU'>
                    Email:
                    <input className='iU' type="email" name="email" onChange={handleInput} value={registerInput.email} />
                    <span>{registerInput.error_list.email}</span>
                </label>
            <center><button className='bsub' onClick={handleGeneratePassword} type='submit'>Submit</button></center>
            </form>
        </div>
    );

}

export default Admin;