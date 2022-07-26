import React, { useState } from "react";
import './userCalendar.css';
import 'moment-timezone';
import 'react-calendar/dist/Calendar.css';
import './userCalendar.css';
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import axios from "axios";
import swal from "sweetalert";

export function Calendario() {

    // const [date, setDate] = useState("");
    // const [showTime, setShowTime] = useState(false);

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


    // return (
    //     <center>
    //         <div>
    //             <div>
    //                 <Calendar className="calendario" defaultValue={null} onChange={setDate} value={date} onClickDay={() => setShowTime(true)} />
    //             </div>

    //             {/* {date.length > 0 ? (
    //                 <p>
    //                     <span>Start: </span>
    //                     {date[0]}
    //                     &nbsp;
    //                     &nbsp;
    //                     <span>End: </span>{date[1]}
    //                 </p>
    //             ) : (
    //                 <p>
    //                     <span>Default selected date: </span><Moment format="YYYY-MM-DD">{date}</Moment>
    //                 </p>
    //             )
    //             } */}
    //             <p>
    //                 <span>Default selected date: </span><Moment format="YYYY-MM-DD">{date}</Moment>
    //             </p>

    //             <context.Provider value={date}>
    //                 <Time showTime={showTime} date={date} />
    //             </context.Provider>

    //         </div>
    //     </center>
    // )


    const [date, setDate] = useState();
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState([]);

    const email = sessionStorage.getItem('auth_nome');
    // if (date) {
    //     console.log("initial" + date.toDateString())
    // }


    const dateSubmit = (e) => {
        // e.preventDefault();

        let timer = setTimeout(() => {

            const data = {
                email,
                date,
            }


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

            return () => {
                clearTimeout(timer)
            }

        }, 2000)


        if (loading) {
            return <h2>Loading...</h2>
        }
    }



    var user_HTMLTABLE = "";

    user_HTMLTABLE = login.map((item) => {
        return (
            <h2 key={item.id}>Your shift started on: {item.date_one} at: {item.date_two} and ended on: {item.date_day_end} at: {item.date_end}</h2>
        )
    })

    let footer = <p>Please pick a day.</p>
    if (date) {
        console.log(date)
        footer = <p>You picked: {date}</p>
    }

    return (
        <center>
        <div>               
                <DayPicker mode="single" selected={date} onSelect={(date) => {setDate(date.toDateString())}} footer={footer} onDayClick={dateSubmit} />
            <div>
            {user_HTMLTABLE}
            </div>
            
        </div>
        </center>
    )

}

export default Calendario;