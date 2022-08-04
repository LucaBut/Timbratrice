import axios from "axios";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import swal from "sweetalert";
import TimePicker from "react-time-picker";


//Same of the fullCalendar.js but only have the input for email
function AddEvent() {
    const today = new Date().toDateString();
    const [date, setDate] = useState(today);
    const [hour, setHour] = useState();

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
            email: input.email,
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


    let footer;
    if (date) {
        footer =
            <label>
                <h4>You picked: {date}</h4>
                Email:
                <input type="email" name="email" onChange={handleInput} value={input.email} placeholder="Write user email"></input>
                Event:
                <input type="text" name="event" onChange={handleInput} value={input.event} placeholder="Write your event" />
                <center>
                    <TimePicker format="HH:mm" onChange={setHour} value={hour} />
                    <button className="bsub" type="submit" onClick={eventSubmit}>Save Event</button>
                </center>
            </label>
    }


    return (
        <DayPicker footer={footer} className="calendar" mode="single" selected={date} onSelect={(date) => { setDate(date.toDateString()) }} />
    );
}

export default AddEvent;
