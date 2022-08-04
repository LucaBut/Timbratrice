import axios from "axios";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import swal from "sweetalert";
import TimePicker from "react-time-picker";

function Fullcalendar() {
    const today = new Date().toDateString();
    const [date, setDate] = useState(today);
    const [hour, setHour] = useState();
    const [userEvent, setUserEvent] = useState([]);
    const email = sessionStorage.getItem('auth_nome');

    const [input, setInput] = useState({
        event: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist()
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const eventSubmit = (e) => {
        e.preventDefault();
        const data = {                          //Declaring data for post
            email: sessionStorage.getItem('auth_nome'),
            event: input.event,
            date: date + hour,                  //To date value assing date + hour value
        }

        axios.post('http://127.0.0.1:8000/api/event/upload', data).then(res => {
            if (res.data.status === 200) {              //If post return status 200
                swal("Event successfully saved", "success");        //Show success message
            } else {
                setInput({ ...input, error_list: res.data.validation_errors })
            }
        })
    }



    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/event/${email}/${date}`).then(res => {     //Get method with email and date value
            if (res.data.status === 200) {
                setUserEvent(res.data.event);       //If get return status 200 assing to setUserEvent the response values
            }
        });
    }, [date])                  //Execute every time data change

    var userEvenetLabel = "";
    userEvenetLabel = userEvent.map((item) => {             //Map userEvent value
        return (
            <h3 key={item.id}>{item.event} at: {item.hour_event}</h3>
        )
    })


    let footer;
    if (date) {             //If date exist assign to the footer of the calendar the input text, the component the TimePicker component and the button to save the event
        footer =
            <label>
                <h4>You picked: {date}</h4>
                Event:
                <input type="text" name="event" onChange={handleInput} value={input.event} placeholder="Write your event" />
                <center>
                    <TimePicker format="HH:mm" onChange={setHour} value={hour} />
                    <button className="bsub" type="submit" onClick={eventSubmit}>Save Event</button>
                </center>
                <br></br>
                <h3>{userEvenetLabel}</h3>
            </label>
    }


    return (        //Create the calendar component
        <DayPicker footer={footer} className="calendar" mode="single" selected={date} onSelect={(date) => { setDate(date.toDateString()) }} />
    );
}

export default Fullcalendar;
