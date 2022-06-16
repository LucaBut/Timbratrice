import React from 'react';
import "./login.css"


const SignUp = () => {
    return (
        <center>
            <div>
                <h1>Login Page</h1>
                <form method='POST' action="{{route('{posts.to.data, $post->id)}}">
                    <label className='l1' for="Nome">
                        Nome:
                        <input className='i1' type="text" name='nome' />
                    </label>
                    <label className='l2' for="password">
                        Password:
                        <input className='i2' type="password" name='password' />
                    </label>
                    <button className='bsub' type='submit'>Submit</button>
                    <h5>If you haven't registred yet, you can register <a href='/register'>here</a></h5>
                </form>
            </div>
        </center>
    );
};

export default SignUp;
