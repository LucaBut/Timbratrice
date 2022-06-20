import React, { Component } from 'react';
import "./register.css";
import axios from 'axios';
import swal from 'sweetalert';
import { render } from '@testing-library/react';

class Register extends Component {
    state = {
        nome: '',
        cognome: '',
        email: '',
        password: '',
    }
 
    handleInput = (e) => {
        this.setState({
            [e.target.nome]: e.target.value
        })
    }

    savereg = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/reg', this.state);

        if (res.data.status === 200) {
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
            });
        } else {
            console.log('something wrong');
        }
    }

    render() {
        return (
            <center>
                <div>
                    <h1><center>Register Page</center></h1>
                    <form onSubmit={this.savereg}>
                        <label className='l1'>
                            Nome:
                            <input className='i1' type="text" name='nome' onChange={this.handleInput} value={this.setState.nome} />
                        </label>
                        <label className='l2'>
                            Cognome:
                            <input className='i2' type="text" name="cognome" onChange={this.handleInput} value={this.setState.cognome} />
                        </label>
                        <label className='l3'>
                            Email:
                            <input className='i3' type="email" name="email" onChange={this.handleInput} value={this.setState.email} />
                        </label>
                        <label className='l4'>
                            Password:
                            <input className='i4' type="password" name='password' onChange={this.handleInput} value={this.setState.password} />
                        </label>
                        <button className='bsub' type='submit'>Submit</button>
                        <h5>If you have registred yet, you can login <a href='/'>here</a></h5>
                    </form>
                </div>
            </center>
        );
    }
}

export default Register;
