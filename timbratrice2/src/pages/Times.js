import React, { useState } from "react";
import Calendar from "react-calendar";
import Calendario from "./calendar";
import Time from "./Time";
import axios from "axios";
import Moment from "react-moment";
import 'moment-timezone';
// import { date } from './calendar';
import { ora } from "./calendar";

const shift = ['Entrata', 'Uscita']

function Times(props) {

    // const [event, setEvent] = useState(null)
    const [info, setInfo] = useState(false)

    function displayInfo(e) {
        setInfo(true);
        //     setEvent(e.target.innerText);
    }

    const [start, setStart] = useState({
        login: [],
        email: '',
        orari_inizio: '',
    })

    const startSubmit = (e) => {
        e.preventDefault();
        console.log({ora});
        start.orari_inizio = { ora };
        // <Time orari_inizio = {props.date} />
        start.email = localStorage.getItem('auth_nome');
        const data = {
            email: start.email,
            orari_inizio: start.orari_inizio,
        }

        axios.post('http://127.0.0.1:8000/api/calendario', data);

        axios.get('http://127.0.0.1:8000/api/calendar-start', data).then(res => {
            if (res.data.status === 200) {
                setStart({
                    login: res.data.login,
                    // email: start.email,
                    // orari_inizio: start.orari_inizio,
                })
            }
        })
    }


    var utente_HTMLTABLE =
        start.login.map((item) => {
            return (
                <tr key={item.id} className="tr-item">
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_inizio}</Moment></td>
                    <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_fine}</Moment></td>
                </tr>
            )
        })



    return (

        <>
            <div>
                <button onClick={startSubmit}>Entrata</button>
                <div className="div-table">
                    <table className="table-user">
                        <thead className="thead">
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Start Shift</th>
                                <th>End Shift</th>
                            </tr>
                        </thead>
                        <tbody>
                            {utente_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
                <div>
                    {info ? `Your appointment is set to ${start} ${props.date.toDateString()}` : null}
                </div>
            </div>
        </>
        // <div className="times">
        //     {shift.map(shift => {
        //         return (
        //             <div>
        //                 <button onClick={startSubmit}> {shift} </button>
        //             </div>
        //         )
        //     })}
        // <div>
        //     {info ? `Your appointment is set to ${start} ${props.date.toDateString()}` : null}
        // </div>
        // </div>

    )
}

export default Times;