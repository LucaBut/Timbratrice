import React, { Component, useState } from 'react';
import "./login.css"
import axios from 'axios';
import swal from 'sweetalert';

function SignUp(){
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.post('http://127.0.0.1:8000/api/login', data).then(res => {

        })
    }

    return (
        <center>
            <div>
                    <h1><center>Login Page</center></h1>
                    <form onSubmit={loginSubmit}>
                        <label className='l1' for="Nome">
                            Email:
                            <input className='i1' type="email" name='email' onChange={this.handleInput} value={this.state.email} required/>
                        </label>
                        <label className='l2' for="password">
                            Password:
                            <input className='i2' type="password" name='password' onChange={this.handleInput} value={this.state.password} required />
                        </label>
                        <button className='bsub' type='submit'>Submit</button>
                        <h5>If you haven't registred yet, you can register <a href='/register'>here</a></h5>
                    </form>
            </div>
        </center>
    );
}

        






















// const SignUp = () => {

    // const {setAuth} = useContext(AuthContext);

    // const userRef = useRef();
    // const errRef = useRef();

    // const [email, setEmail] = useState('');
    // const [pwd, setPwd] = useState('');
    // const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState('');

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [email, pwd])

    // const handelSubmit = async (e) => {
    //     e.preventDefault();

    //     try{
    //         const response = await axios.post('http://127.0.0.1:8000/api/login', 
    //         JSON.stringify({email, pwd}),
    //         {
    //             headers: {'Content-Type': 'application/json'},
    //             withCredentials: true
    //         }
    //         );
    //         console.log(JSON.stringify(response?.data));
    //         const accessToken = response?.data?.accessToken;
    //         const roles = response?.data?.roles;
    //         setAuth({email, pwd, roles, accessToken});
    //         setEmail('');
    //         setPwd('');
    //         setSuccess(true);
    //     }catch(err){
    //         if(!err?.response) {
    //             setErrMsg('No server response');
    //         }else if(err.response?.status === 400){
    //             setErrMsg('Missing Username or password');
    //         }else{
    //             setErrMsg('Login failed');
    //         }
    //         errRef.current.focus();
    //     }
        
    // }


    // return (
    //     <center>
    //         <div>
    //             <section>
    //                 <p ref={errRef}></p>
    //                 <h1><center>Login Page</center></h1>
    //                 <form onSubmit={handelSubmit}>
    //                     <label className='l1' for="Nome">
    //                         Nome:
    //                         <input className='i1' type="text" required/>
    //                     </label>
    //                     <label className='l2' for="password">
    //                         Password:
    //                         <input className='i2' type="password" required />
    //                     </label>
    //                     <button className='bsub' type='submit'>Submit</button>
    //                     <h5>If you haven't registred yet, you can register <a href='/register'>here</a></h5>
    //                 </form>
    //             </section>
    //         </div>
    //     </center>
    // );

export default SignUp;
