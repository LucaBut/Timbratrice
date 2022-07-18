import React, { useState, useContext, useEffect } from "react";
import Calendar from "react-calendar";
import Time from "./Time";
import axios from "axios";
import Moment from "react-moment";
import 'moment-timezone';
// import { date } from './calendar';
// import { ora } from "./calendar";
import contex from "./contex";


function Times(props) {

    // const [event, setEvent] = useState(null)
    const [info, setInfo] = useState(false)
    const date = useContext(contex);
    // console.log(date);

    function displayInfo(e) {
        setInfo(true);
        //     setEvent(e.target.innerText);
    }

    // const [start, setStart] = useState({
    //     login: [],
    //     email: '',
    //     date_two: '',
    // })
    const [start, setStart] = useState({
        email: '',
        orari_inizio: '',
    })

    const [state, setState] = useState({
        login: [],
    })


    // const [start, setStart] = useState({
    //     email: '',
    //     ora: '',
    // })


    function init_data() {
        start.orari_inizio = { date };
        start.email = localStorage.getItem('auth_nome');
        const data = {
            email: start.email,
            orari_inizio: start.orari_inizio,
        }

        axios.post('http://127.0.0.1:8000/api/calendario', data).then(res => {
            console.log(res.data)
        });
    }

    useEffect(() => {
        init_data()
        const email = start.email;
        axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}`).then(res => {
            setStart.email = res.data.email;
            setStart.orari_inizio = res.data.orari_inizio;
            setState.login = res.data.login;
            console.log(res.data.orari_inizio);
        })
    })


    // const startSubmit = (e) => {
    //     e.preventDefault();
    //     // console.log({ora});
    //     // start.orari_inizio = { ora };
    //     // <Time orari_inizio = {props.date} />

    //     // <Calendario orari_inizio = {date} />
    //     // console.log({date})
    //     // console.log(<Calendario orari_inizio = {props.date}/>)
    //     // start.orari_inizio = <Calendario orari_inizio = {props.date}/>
    //     // console.log(<Moment format="YYYY-DD-MM"><Calendario orari_inizio = {props.date}/></Moment>)
    //     console.log({date});
    //     start.orari_inizio = {date};
    //     start.email = localStorage.getItem('auth_nome');
    //     const data = {
    //         email: start.email,
    //         orari_inizio: start.orari_inizio,
    //     }

    //     // axios.post('http://127.0.0.1:8000/api/ora');

    //     axios.post('http://127.0.0.1:8000/api/calendario', data);

    //     axios.get('http://127.0.0.1:8000/api/calendar-start', data).then(res => {
    //         if (res.data.status === 200) {
    //             setStart({
    //                 login: res.data.login,
    //                 email: start.email,
    //                 orari_inizio: start.orari_inizio,
    //             })
    //         }
    //     })
    // }

    // console.log(<Moment format="YYYY-DD-MM"><Calendario orari_inizio = {props.date}/></Moment>)

    var utente_HTMLTABLE =
        state.login.map((item) => {
            return (
                <tr key={item.id} className="tr-item">
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.date_one}</Moment></td>
                    {/* <td><Moment format="DD-MM-YYYY, HH:mm:ss">{item.orari_fine}</Moment></td> */}
                </tr>
            )
        })

    return (

        <>

            <table>
                <thead className="thead">
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Start Shift</th>
                    </tr>
                </thead>
                <tbody>
                    {utente_HTMLTABLE}
                </tbody>
            </table>
            {/* <div> */}
            {/* {props.showTime ? <Time orari_inizio={props.showTime}/> : null} */}
            {/* <div>
                    {info ? `Your appointment is set to ${start} ${props.date.toDateString()}` : null}
                </div> */}
            {/* <button onClick={startSubmit}>Entrata</button> */}
            {/* <div>
            <h3>The day {props.date.toDateString()} you start work at: {utente_HTMLTABLE} and you finished at: </h3>
            </div> */}
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