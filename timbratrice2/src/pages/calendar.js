import React, { Component, useState } from "react";
import axios from "axios";
import './userCalendar.css';
import Moment from "react-moment";
import 'moment-timezone';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function calendar() {

    // state = {
    //     login: [],
    //     email: localStorage.getItem('auth_nome'),
    //     loading: true,
    // }

    // async componentDidMount() {
    //     const tk = await axios.post('http://127.0.0.1:8000/api/tk', {email: this.state.email});
    //     if (tk.data.status === 200) {
    //         this.setState({
    //             email: tk.data.email,
    //         })
    //     }

    //     const res = await axios.get('http://127.0.0.1:8000/api/calendar');
    //     if (res.data.status === 200) {
    //         this.setState({
    //             login: res.data.login,
    //             loading: false,
    //         })
    //     }
    // }

    // render() {
    //     var user_HTMLTABLE = "";
    //     if (this.state.loading) {
    //         user_HTMLTABLE = <tr><td colSpan="6"><h2>Loading...</h2></td></tr>
    //     } else {
    //         user_HTMLTABLE =
    //             this.state.login.map((item) => {
    //                 return (
    //                     <tr key={item.id} className="tr-item">
    //                         <td>{item.email}</td>
    //                         <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_inizio}</Moment></td>
    //                         <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_fine}</Moment></td>
    //                     </tr>
    //                 )
    //             });
    //     }

    const [user, setUser] = useState({
        email: '',
        orario_inizio: '',
        orario_fine: '',
        error_list: [],
    });

    const handleShift = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const userSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: localStorage.getItem('auth_nome'),
            orario_inizio: user.orario_inizio,
            orario_fine: user.orario_fine,
        }

        axios.get('http://127.0.0.1:8000/api/calendario', data).then(res => {
            if(res.data.status !== 200){
                setUser({...user, error_list: res.data.validation_errors});
            }
        })
    }

    return (
        <>
            <div>
                <div>
                    <Calendar onChange={handleShift} value={user}></Calendar>
                </div>
            </div>

            {/* <table>
                    <thead className="thead">
                        <tr>
                            <th>Email</th>
                            <th>Start Shift</th>
                            <th>End Shift</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user_HTMLTABLE}
                </tbody>
                </table> */}
        </>
    );
}

export default calendar;