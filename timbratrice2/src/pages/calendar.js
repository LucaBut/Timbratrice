import React, { useState } from "react";
import axios from "axios";
import './userCalendar.css';
import Moment from "react-moment";
import 'moment-timezone';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Time from "./Time";
import './userCalendar.css';

// const date = new Date();

function Calendario() {

    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);

    const [orario, setOrario] = useState({
        orario: '',
    })

    const dateSubmit = (e) => {
        e.preventDafault();
        const data = {
            orario: orario.orario,
        } 

        axios.post('http://127.0.0.1:8000/api/orario', data);
    }

    return (
        <div>
            <div>
                <Calendar className="calendario" onChange={setDate} value={date} onClickDay={() => setShowTime(true)} />
            </div>

            {date.length > 0 ? (
                <p>
                    <span>Start: </span>
                    {date[0].toDateString()}
                    &nbsp;
                    &nbsp;
                    <span>End: </span>{date[1].toDateString()}
                </p>
            ) : (
                <p>
                    <span>Default selected date: </span><Moment format="YYYY-MM-DD">{date}</Moment>
                    {dateSubmit}
                </p>
            )
            }
            <Time showTime={showTime} date={date} />
        </div>
    )
}

// {date.toDateString()}

// export const date = date.toDateString();
export const ora = (date) => {
    return(
        <Moment format="YYYY-MM-DD">{date}</Moment>
    );
};
export default Calendario;



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

    // const [user, setUser] = useState({
    //     email: '',
    //     orario_inizio: '',
    //     orario_fine: '',
    //     error_list: [],
    // });

    // const handleShift = (e) => {
    //     e.persist();
    //     setUser({ ...user, [e.target.name]: e.target.value });
    // }

    // const userSubmit = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         email: localStorage.getItem('auth_nome'),
    //         orario_inizio: user.orario_inizio,
    //         orario_fine: user.orario_fine,
    //     }

    //     axios.get('http://127.0.0.1:8000/api/calendario', data).then(res => {
    //         if(res.data.status !== 200){
    //             setUser({...user, error_list: res.data.validation_errors});
    //         }
    //     })
    // }

    // return (
    //     <>
    //         <div>
    //             <div>
    //                 <Calendar></Calendar>
    //             </div>
    //         </div>

    //         {/* <table>
    //                 <thead className="thead">
    //                     <tr>
    //                         <th>Email</th>
    //                         <th>Start Shift</th>
    //                         <th>End Shift</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                 {user_HTMLTABLE}
    //             </tbody>
    //             </table> */}
    //     </>
    // );