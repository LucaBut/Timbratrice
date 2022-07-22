import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import Moment from "react-moment";
import contex from "./contex";
import swal from "sweetalert";


function Times() {

    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState([]);

    const email = sessionStorage.getItem('auth_nome');
    const date = useContext(contex).toDateString();
    // const hour = { date }

    const data = {
        email,
        date,
    }

    useEffect(() => {
        let isMounted = true;
        axios.post('http://127.0.0.1:8000/api/calendario', data);
        axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}/`+ data.date).then(res => {
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
            isMounted = false;
        }
    }, [])


    if (loading) {
        return <h2>Loading...</h2>
    }

    var user_HTMLTABLE = "";

    user_HTMLTABLE = login.map((item) => {
        return (
            // <tr key={item.id} className='tr-item'>
            //     <td>{item.id}</td>
            //     <td>{item.email}</td>
            //     <td>{item.date_two}</td>
            //     <td>{item.date_end}</td>
            // </tr>
            <h2 key={item.id}>Your shift started on: {item.date_one} at: {item.date_two} and ended on: {item.date_day_end} at: {item.date_end}</h2>
        )
    })


    return (
        <div>
            {/* <div>
                <table>
                    <thead className="thead">
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Start Shift</th>
                            <th>End Shift</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user_HTMLTABLE}
                    </tbody>
                </table>
            </div> */}
            {user_HTMLTABLE}
        </div>
    )
}


export default Times;































// function Times() {
//     const date = useContext(contex);
//     const [login, setLogin] = useState({
//         login: [],
//     })

//     // const ora = { date }
//     // console.log(ora)
//     // console.log(date)
//     const email = sessionStorage.getItem('auth_nome');
//     sessionStorage.setItem('calendar_hour', date)
//     const ora = sessionStorage.getItem('calendar_hour')
//     console.log(ora)

//     const data = {
//         date,
//         email,
//     }

//     // function init_data() {
//     //     axios.post('http://127.0.0.1:8000/api/calendario', data);
//     // }

//     useEffect(() => {
//         axios.post('http://127.0.0.1:8000/api/calendario', data);
//         function fetchLogin() {
//             axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}`).then((res) =>
//                 res.json()).then((data) => {
//                     setLogin(data)
//                 })
//         } fetchLogin()
//     }, [])

//     // useEffect(function effectFunction() {
//     //     axios.post('http://127.0.0.1:8000/api/calendario', data);
//     //     async function fetchLogin() {
//     //         const res = await axios.get(`http://127.0.0.1:8000/api/calendar-start/${email}`);
//     //         const json = await res.json();
//     //         setLogin(json.data)
//     //     } fetchLogin();
//     // }, []);




//     // var user_HTMLTABLE =
//     //     login.login.map((item) => {
//     //         return (
//     //             <tr key={item.id} className="tr-item">
//     //                 <td>{item.email}</td>
//     //                 <td><Moment format="YYYY-MM-DD">{item.date_two}</Moment></td>
//     //                 <td><Moment format="YYYY-MM-DD">{item.date_end}</Moment></td>
//     //             </tr>
//     //         )
//     //     })

//     var user_HTMLTABLE =
//         login.map(item => {
//             return (
//                 <tr key={item.id} className="tr-item">
//                     <td>{item.email}</td>
//                     <td><Moment format="YYYY-MM-DD">{item.date_two}</Moment></td>
//                     <td><Moment format="YYYY-MM-DD">{item.date_end}</Moment></td>
//                 </tr>
//             )
//         })



//     return (


//         <table>
//             <thead className="thead">
//                 <tr>
//                     <th>Email</th>
//                     <th>Start Shift</th>
//                     <th>End Shift</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {user_HTMLTABLE}
//             </tbody>
//         </table>
//     )


// }