import axios from "axios";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import swal from "sweetalert";

function Fullcalendar() {
    const today = new Date().toDateString();
    const [date, setDate] = useState(today);
    const [userEvent, setUserEvent] = useState();

    const [input, setInput] = useState({
        email: '',
        event: '',
        date: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist()
        setInput({...input, [e.target.name]: e.target.value});
    }

    const eventSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: sessionStorage.getItem('auth_nome'),
            event: input.event,
            date: date,
        }

        axios.post('http://127.0.0.1:8000/api/event/upload', data).then(res => {
            if(res.data.status === 200){
                swal("Event successfully saved", res.data.message, "success");
            }else{
                setInput({...input, error_list: res.data.validation_errors})
            }
        })
    }

   

    useEffect(() => {
        const data = {
            email,
            date,
        }
        axios.get(`http://127.0.0.1:8000/api/event/${email}/${date}`).then(res => {
            if(res.data.status === 200){
                setUserEvent(res.data.event);
            }
        });
    }, [date])

    var userEvenetLabel = "";
    userEvenetLabel = userEvent.map((item) => {
        return(
            <h3 key={item.id}>{item.event}</h3>
        )
    })


    let footer;
    if(date){
       footer = <label>
            Event:
            <input type="text" name="event" onChange={handleInput} value={input.event} placeholder="Write your event"/>
            <center><button type="submit" onClick={eventSubmit}>Save Event</button></center>
        </label>
    }

    if(userEvenetLabel){
        footer = <h3>{userEvenetLabel}</h3>
    }

    return (
        <DayPicker footer={footer} className="calendar" mode="single" selected={date} onSelect={(date) => {setDate(date.toDateString())}} />
        

    );
}

export default Fullcalendar;