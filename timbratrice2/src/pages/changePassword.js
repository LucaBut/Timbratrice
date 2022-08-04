import React, { useState } from "react";
import axios from "axios";
import './changePassword.css';
import swal from "sweetalert";

function Change() {

    const [changePassword, setChangePassword] = useState({
        email: '',
        password: '',
        error_list: [],
    });


    const handleChange = (e) => {
        e.persist();
        setChangePassword({ ...changePassword, [e.target.name]: e.target.value });
    }

    const changeSubmit = (e) => {
        e.preventDefault();
        const data = {                  //Declaring data for post
            email: sessionStorage.getItem('auth_nome'),
            password: changePassword.password,
        }

        axios.post('http://127.0.0.1:8000/api/change', data).then(res => {
            if (res.data.status === 200) {          //If status return 200 show success message
                swal({
                    text: "Password successfully changed",
                    icon: "success",
                }).then(function () {
                    window.location = '/';
                })
            } else {
                setChangePassword({ ...changePassword, error_list: res.data.validation_errors })
            }
        })
    }

    return (            //Create the input for change password
        <div className="change">
            <div>
                <form onSubmit={changeSubmit} className="change-form">
                    <center><label className="change-write">
                        Change Password
                    </label></center>
                    <span>{changePassword.error_list.email}</span>
                    <label className="l-change">
                        New password:
                        <input className="i-change" type='password' name="password" onChange={handleChange} value={changePassword.password}></input>
                    </label>
                    <span>{changePassword.error_list.passowrd}</span>
                    <center><button className="sub-btn-change" type="submit">Submit</button></center>
                </form>
            </div>
        </div>
    )
}

export default Change;