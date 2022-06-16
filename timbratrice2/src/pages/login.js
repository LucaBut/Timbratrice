import React, { useState } from 'react';
import "./login.css"

// function App() {
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
// }

// let res = await fetch("localhost:3306", {
//     method: "POST",
//     body: JSON.stringify({
//         name: name,
//         passowrd: password,
//     }),
// });

// let handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//         let res = await fetch("localhost:3036", {
//             method: "POST",
//             body: JSON.stringify({
//                 name: name,
//                 passowrd: password,
//         }),
//     });
//     let resJson = await res.json();
//     if(res.status === 200) {
//         setName("");
//         setPassword("");
//         setMessage("User login successfully");
//     }else{
//         setMessage("Retry");
//     }
//     } catch(err){
//         console.log(err);
//     }
// };



const SignUp = () => {
    return (
        <center>
            <div>
                <h1>Login Page</h1>
                <form method='POST'>
                    <label className='l1' for="Nome">
                        Nome:
                        <input className='i1' type="text" /*value={name} onChange={(e) => setName(e.target.value)} */ />
                    </label>
                    <label className='l2' for="password">
                        Password:
                        <input className='i2' type="password" /*value={passowrd} onChange={(e) => setPassword(e.target.value)} */ />
                    </label>
                    <button className='bsub' type='submit'>Submit</button>
                    <h5>If you haven't registred yet, you can register <a href='/register'>here</a></h5>
                </form>
            </div>
        </center>
    );
};

export default SignUp;
