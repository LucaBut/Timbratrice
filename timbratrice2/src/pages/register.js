import React from 'react';
import "./register.css"


const Register = () => {
    return (
        <center>
            <div>
                <h1><center>Register Page</center></h1>
                <form method='POST' action="{{route('{posts.to.data, $post->id)}}">
                    <label className='l1'>
                        Nome:
                        <input className='i1' type="text" name='nome' />
                    </label>
                    <label className='l2'>
                        Password:
                        <input className='i2' type="password" name='password' />
                    </label>
                    <label>
                        Email:
                        <input className='i3' type="email" name="email" />
                    </label>
                    <button className='bsub' type='submit'>Submit</button>
                    <h5>If you have registred yet, you can login <a href='/'>here</a></h5>
                </form>
            </div>
        </center>
    );
};

export default Register;
