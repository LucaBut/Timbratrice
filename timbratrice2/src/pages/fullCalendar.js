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
        const data = {
            email: sessionStorage.getItem('auth_nome'),
            event: input.event,
            date: date + hour,
        }

        axios.post('http://127.0.0.1:8000/api/event/upload', data).then(res => {
            if (res.data.status === 200) {
                swal("Event successfully saved", "success");
            } else {
                setInput({ ...input, error_list: res.data.validation_errors })
            }
        })
    }



    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/event/${email}/${date}`).then(res => {
            if (res.data.status === 200) {
                setUserEvent(res.data.event);
            }
        });
    }, [date])

    var userEvenetLabel = "";
    userEvenetLabel = userEvent.map((item) => {
        return (
            <h3 key={item.id}>{item.event} at: {item.hour_event}</h3>
        )
    })


    let footer;
    if (date) {
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


    return (
        <DayPicker footer={footer} className="calendar" mode="single" selected={date} onSelect={(date) => { setDate(date.toDateString()) }} />
    );
}

export default Fullcalendar;
