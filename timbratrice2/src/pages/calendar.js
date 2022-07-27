import React, { useEffect, useState } from "react";
import './userCalendar.css';
import 'moment-timezone';
import 'react-calendar/dist/Calendar.css';
import './userCalendar.css';
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import './userCalendar.css';
import axios from "axios";
import swal from "sweetalert";

export function Calendario() {

    const today = new Date().toDateString();
    const [date, setDate] = useState(today);
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState([]);

    const email = sessionStorage.getItem('auth_nome');

    const data = {
        email,
        date,
    }

    useEffect(() => {
        let isMounted = true;
            axios.post('http://127.0.0.1:8000/api/calendario', data);

            axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}/${date}`).then(res => {
                console.log("Dentro useEffetct " + date)
                if (isMounted) {
                    if (res.data.status === 200) {
                        setLogin(res.data.user);
                        setLoading(false);

                    } else {
                        swal({
                            icon: 'warning',
                            text: 'Error loading shifts'
                        })
                    }
                }
            })
    }, [])

    const dateSubmit = (e) => {
        // e.preventDefault();

        // let timer = setTimeout(() => {

            let isMounted = true;
            axios.post('http://127.0.0.1:8000/api/calendario', data);

            axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}/${date}`).then(res => {
                console.log("Dentro useEffetct " + date)
                if (isMounted) {
                    if (res.data.status === 200) {
                        setLogin(res.data.user);
                        setLoading(false);

                    } else {
                        swal({
                            icon: 'warning',
                            text: 'Error loading shifts'
                        })
                    }
                }
            })

            // return () => {
            //     clearTimeout(timer)
            // }

        // }, 2000)


        if (loading) {
            return <h2>Loading...</h2>
        }
    }


    var user_HTMLTABLE = "";


    user_HTMLTABLE = login.map((item) => {
        return (
            <h2 key={item.id}>Started at: {item.date_two} <br></br> Ended at: {item.date_end}</h2>
        )
    })


    let footer = <p>Please pick a day.</p>
    if (date) {
        console.log(date)
        footer = <p>You picked: {date} <br></br> <h4>{user_HTMLTABLE}</h4> </p> 
    }

    return (
        
            <div>
                <center>
                <DayPicker className="calendar" mode="single" selected={date} onSelect={(date) => { setDate(date.toDateString()) }} footer={footer} onDayClick={dateSubmit} />
                </center>
            </div>
        
    )

}

export default Calendario;