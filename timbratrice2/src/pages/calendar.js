import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import './userCalendar.css';
import Moment from "react-moment";
import 'moment-timezone';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Time from "./Time";
import './userCalendar.css';
import Times from "./Times";
import context from "./contex";

export function Calendario() {

    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);

    // const [login, setLogin] = useState({
    //     login: [],
    // })

    // const dateSubmit = (e) => {
    //     e.preventDafault();
    //     orario = { date };
    //     const data = {
    //         orario: orario.orario,
    //     }  
    // }
    // console.clear();
    // const ora = { date }
    // console.log(ora)
    // sessionStorage.setItem('calendar_hour', ora);
    // const email = sessionStorage.getItem('auth_nome')
    // useEffect(() => {
    //     const data = {
    //         ora,
    //         email,
    //     }
    //     axios.post('http://127.0.0.1:8000/api/calendario', data);
    // })



    return (
        <center>
            <div>
                <div>
                    <Calendar className="calendario" onChange={setDate} value={date} onClickDay={() => setShowTime(true)} />
                </div>

                {date.length > 0 ? (
                    <p>
                        <span>Start: </span>
                        {date[0]}
                        &nbsp;
                        &nbsp;
                        <span>End: </span>{date[1]}
                    </p>
                ) : (
                    <p>
                        <span>Default selected date: </span><Moment format="YYYY-MM-DD">{date}</Moment>
                    </p>
                )
                }

                <context.Provider value={date}>
                   <Time showTime={showTime} date={date} />
                </context.Provider>

            </div>
        </center>
    )


}

export default Calendario;
