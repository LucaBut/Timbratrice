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

    const data = {          //Declaring data for post
        email,
        date,
    }

    useEffect(() => {
        let isMounted = true;
        axios.post('http://127.0.0.1:8000/api/calendario', data);       //Post data

        axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}/${date}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {      //If get call return status 200
                    setLogin(res.data.user);        //Assign to setLogin the response data
                    setLoading(false);

                } else {
                    swal({
                        icon: 'warning',
                        text: 'Error loading shifts'
                    })
                }
            }
        })
    }, [date])              //Execute every time data value change 



    var user_shift = "";
    user_shift = login.map((item) => {          //Map login to print the values
        return (
            <h3 key={item.id}>Started at: {item.date_two} <br></br> Ended at: {item.date_end}</h3>
        )
    })

    //Add to the footer of the calendar component the print of user shifts
    let footer;
    if (user_shift < 1) {
        footer = <p>You picked: {date} <br></br><h3>You didn't work this day</h3></p>
    } else {
        footer = <p>You picked: {date} <br></br> {user_shift} </p>
    }



    if (loading) {
        footer = <h3>Loading...</h3>
    }

    return (        //Create the Calendar component
        <div>
            <center>
                <DayPicker className="calendar" mode="single" selected={date} onSelect={(date) => { setDate(date.toDateString()) }} footer={footer} />
            </center>
        </div>

    )

}

export default Calendario;