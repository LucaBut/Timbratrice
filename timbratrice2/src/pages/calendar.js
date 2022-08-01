import React, { useEffect, useState } from "react";
import 'moment-timezone';
import 'react-calendar/dist/Calendar.css';
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import './userCalendar.css';
import axios from "axios";
import swal from "sweetalert";

function Calendario() {

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
    }, [date])



    var user_HTMLTABLE = "";
    user_HTMLTABLE = login.map((item) => {
            return (
            <h3 key={item.id}>Started at: {item.date_two} <br></br> Ended at: {item.date_end}</h3>
        )      
    })


    let footer;
    if(user_HTMLTABLE < 1){
        footer = <p>You picked: {date} <br></br><h3>You didnt work this day</h3></p>
    }else{
        footer = <p>You picked: {date} <br></br> {user_HTMLTABLE} </p>
    }
    


    if(loading){
        footer = <h3>Loading...</h3>
    }

    return (

        <div>
            <center>
                <DayPicker className="calendar" mode="single" selected={date} onSelect={(date) => { setDate(date.toDateString()) }} footer={footer} />
            </center>
        </div>

    )

}

export default Calendario;