import React from 'react';
import "./register.css"


const Register = () => {
    return (
        <center>
            <div>
                <h1><center>Register Page</center></h1>
                <form method='POST' action="/web.php">
                    <label className='l1'>
                        Nome:
                        <input className='i1' type="text" name='nome' />
                    </label>
                    <label className='l2'>
                        Cognome:
                        <input className='i2' type="text" name="congome" />
                    </label>
                    <label className='l3'>
                        Email:
                        <input className='i3' type="email" name="email" />
                    </label>
                    <label className='l4'>
                        Password:
                        <input className='i4' type="password" name='password' />
                    </label>
                    <button className='bsub' type='submit'>Submit</button>
                    <h5>If you have registred yet, you can login <a href='/'>here</a></h5>
                </form>
            </div>
        </center>
    );
};

export default Register;
